using GulhanKahvalti.API.DTOs.Orders;

namespace GulhanKahvalti.API.Services.Interfaces;

public interface IOrderService
{
    Task<OrderResponseDto> CreateAsync(int userId, CreateOrderDto request);

    Task<OrderResponseDto?> GetByIdForUserAsync(int userId, int orderId);

    Task<IReadOnlyList<OrderResponseDto>> GetUserOrdersAsync(int userId);

    Task<IReadOnlyList<OrderResponseDto>> GetAllAsync();

    Task<OrderResponseDto?> UpdateStatusAsync(int orderId, string status);
}
