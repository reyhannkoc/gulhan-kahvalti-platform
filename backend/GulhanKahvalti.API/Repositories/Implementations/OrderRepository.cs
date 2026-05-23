using GulhanKahvalti.API.Data;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Repositories.Implementations;

public class OrderRepository(AppDbContext context) : IOrderRepository
{
    public async Task<Order> CreateAsync(Order order)
    {
        context.Orders.Add(order);
        await context.SaveChangesAsync();
        return order;
    }

    public Task<Order?> GetByIdAsync(int id)
    {
        return context.Orders
            .Include(order => order.OrderItems)
            .ThenInclude(orderItem => orderItem.Product)
            .Include(order => order.User)
            .FirstOrDefaultAsync(order => order.Id == id);
    }

    public Task<Order?> GetByIdForUserAsync(int id, int userId)
    {
        return context.Orders
            .Include(order => order.OrderItems)
            .ThenInclude(orderItem => orderItem.Product)
            .FirstOrDefaultAsync(order => order.Id == id && order.UserId == userId);
    }

    public async Task<IReadOnlyList<Order>> GetUserOrdersAsync(int userId)
    {
        return await context.Orders
            .Include(order => order.OrderItems)
            .ThenInclude(orderItem => orderItem.Product)
            .AsNoTracking()
            .Where(order => order.UserId == userId)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Order>> GetAllAsync()
    {
        return await context.Orders
            .Include(order => order.OrderItems)
            .ThenInclude(orderItem => orderItem.Product)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Order> UpdateAsync(Order order)
    {
        context.Orders.Update(order);
        await context.SaveChangesAsync();
        return order;
    }
}
