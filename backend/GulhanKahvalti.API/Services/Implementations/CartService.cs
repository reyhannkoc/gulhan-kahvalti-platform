using GulhanKahvalti.API.DTOs.Cart;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Services.Implementations;

public class CartService(
    ICartRepository cartRepository,
    IProductRepository productRepository) : ICartService
{
    public async Task<IReadOnlyList<CartItemDto>> GetUserCartAsync(int userId)
    {
        var cartItems = await cartRepository.GetUserCartAsync(userId);

        return cartItems.Select(MapToDto).ToList();
    }

    public async Task<CartItemDto> AddItemAsync(int userId, AddCartItemDto request)
    {
        var product = await productRepository.GetByIdAsync(request.ProductId);

        if (product is null || !product.IsActive)
        {
            throw new KeyNotFoundException("Product not found.");
        }

        if (request.Quantity > product.Stock)
        {
            throw new InvalidOperationException("Requested quantity exceeds product stock.");
        }

        var existingCartItem = await cartRepository.GetUserProductAsync(userId, request.ProductId);

        if (existingCartItem is not null)
        {
            var nextQuantity = existingCartItem.Quantity + request.Quantity;

            if (nextQuantity > product.Stock)
            {
                throw new InvalidOperationException("Requested quantity exceeds product stock.");
            }

            existingCartItem.Quantity = nextQuantity;
            existingCartItem.UpdatedAt = DateTime.UtcNow;
            await cartRepository.UpdateItemAsync(existingCartItem);
            return MapToDto(existingCartItem);
        }

        var cartItem = new CartItem
        {
            UserId = userId,
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await cartRepository.AddItemAsync(cartItem);
        cartItem.Product = product;

        return MapToDto(cartItem);
    }

    public async Task<CartItemDto?> UpdateItemAsync(int userId, int cartItemId, UpdateCartItemDto request)
    {
        var cartItem = await cartRepository.GetByIdForUserAsync(cartItemId, userId);

        if (cartItem is null)
        {
            return null;
        }

        if (request.Quantity > cartItem.Product.Stock)
        {
            throw new InvalidOperationException("Requested quantity exceeds product stock.");
        }

        cartItem.Quantity = request.Quantity;
        cartItem.UpdatedAt = DateTime.UtcNow;

        await cartRepository.UpdateItemAsync(cartItem);
        return MapToDto(cartItem);
    }

    public async Task<bool> RemoveItemAsync(int userId, int cartItemId)
    {
        var cartItem = await cartRepository.GetByIdForUserAsync(cartItemId, userId);

        if (cartItem is null)
        {
            return false;
        }

        await cartRepository.RemoveItemAsync(cartItem);
        return true;
    }

    public Task ClearCartAsync(int userId)
    {
        return cartRepository.ClearCartAsync(userId);
    }

    private static CartItemDto MapToDto(CartItem cartItem)
    {
        return new CartItemDto
        {
            Id = cartItem.Id,
            ProductId = cartItem.ProductId,
            ProductName = cartItem.Product.Name,
            ProductImageUrl = cartItem.Product.ImageUrl,
            Quantity = cartItem.Quantity,
            UnitPrice = cartItem.Product.Price,
            LineTotal = cartItem.Quantity * cartItem.Product.Price
        };
    }
}
