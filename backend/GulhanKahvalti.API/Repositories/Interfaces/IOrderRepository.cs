using GulhanKahvalti.API.Models;

namespace GulhanKahvalti.API.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<Order> CreateAsync(Order order);

    Task<Order?> GetByIdAsync(int id);

    Task<Order?> GetByIdForUserAsync(int id, int userId);

    Task<IReadOnlyList<Order>> GetUserOrdersAsync(int userId);

    Task<IReadOnlyList<Order>> GetAllAsync();

    Task<Order> UpdateAsync(Order order);
}
