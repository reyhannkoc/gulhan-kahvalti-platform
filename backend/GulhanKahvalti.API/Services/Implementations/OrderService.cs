using GulhanKahvalti.API.DTOs.Orders;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Services.Implementations;

public class OrderService(
    IOrderRepository orderRepository,
    ICartRepository cartRepository) : IOrderService
{
    private static readonly HashSet<string> ValidStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        "Pending",
        "Preparing",
        "Completed",
        "Cancelled"
    };

    public async Task<OrderResponseDto> CreateAsync(int userId, CreateOrderDto request)
    {
        var cartItems = await cartRepository.GetUserCartAsync(userId);

        if (cartItems.Count == 0)
        {
            throw new InvalidOperationException("Cart is empty.");
        }

        foreach (var cartItem in cartItems)
        {
            if (cartItem.Quantity <= 0)
            {
                throw new InvalidOperationException("Cart item quantity is invalid.");
            }

            if (!cartItem.Product.IsActive || cartItem.Quantity > cartItem.Product.Stock)
            {
                throw new InvalidOperationException($"Not enough stock for {cartItem.Product.Name}.");
            }
        }

        var order = new Order
        {
            UserId = userId,
            CustomerName = request.CustomerName.Trim(),
            CustomerPhone = request.CustomerPhone.Trim(),
            CustomerAddress = request.CustomerAddress.Trim(),
            Note = request.Note,
            TotalPrice = cartItems.Sum(cartItem => cartItem.Quantity * cartItem.Product.Price),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            OrderItems = cartItems.Select(cartItem => new OrderItem
            {
                ProductId = cartItem.ProductId,
                Product = cartItem.Product,
                Quantity = cartItem.Quantity,
                UnitPrice = cartItem.Product.Price,
                CreatedAt = DateTime.UtcNow
            }).ToList()
        };

        foreach (var cartItem in cartItems)
        {
            cartItem.Product.Stock -= cartItem.Quantity;
            cartItem.Product.UpdatedAt = DateTime.UtcNow;
        }

        await orderRepository.CreateAsync(order);
        await cartRepository.ClearCartAsync(userId);

        return MapToResponse(order);
    }

    public async Task<OrderResponseDto?> GetByIdForUserAsync(int userId, int orderId)
    {
        var order = await orderRepository.GetByIdForUserAsync(orderId, userId);
        return order is null ? null : MapToResponse(order);
    }

    public async Task<IReadOnlyList<OrderResponseDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await orderRepository.GetUserOrdersAsync(userId);
        return orders.Select(MapToResponse).ToList();
    }

    public async Task<IReadOnlyList<OrderResponseDto>> GetAllAsync()
    {
        var orders = await orderRepository.GetAllAsync();
        return orders.Select(MapToResponse).ToList();
    }

    public async Task<OrderResponseDto?> UpdateStatusAsync(int orderId, string status)
    {
        if (!ValidStatuses.Contains(status))
        {
            throw new InvalidOperationException("Invalid order status.");
        }

        var order = await orderRepository.GetByIdAsync(orderId);

        if (order is null)
        {
            return null;
        }

        order.Status = ValidStatuses.First(validStatus =>
            string.Equals(validStatus, status, StringComparison.OrdinalIgnoreCase));
        order.UpdatedAt = DateTime.UtcNow;

        await orderRepository.UpdateAsync(order);
        return MapToResponse(order);
    }

    private static OrderResponseDto MapToResponse(Order order)
    {
        return new OrderResponseDto
        {
            Id = order.Id,
            CustomerName = order.CustomerName,
            CustomerPhone = order.CustomerPhone,
            CustomerAddress = order.CustomerAddress,
            Note = order.Note,
            TotalPrice = order.TotalPrice,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            Items = order.OrderItems.Select(orderItem => new OrderItemResponseDto
            {
                Id = orderItem.Id,
                ProductId = orderItem.ProductId,
                ProductName = orderItem.Product?.Name ?? string.Empty,
                Quantity = orderItem.Quantity,
                UnitPrice = orderItem.UnitPrice,
                LineTotal = orderItem.Quantity * orderItem.UnitPrice
            }).ToList()
        };
    }
}
