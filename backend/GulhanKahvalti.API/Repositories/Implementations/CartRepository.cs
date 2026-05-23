using GulhanKahvalti.API.Data;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Repositories.Implementations;

public class CartRepository(AppDbContext context) : ICartRepository
{
    public async Task<IReadOnlyList<CartItem>> GetUserCartAsync(int userId)
    {
        return await context.CartItems
            .Include(cartItem => cartItem.Product)
            .Where(cartItem => cartItem.UserId == userId)
            .ToListAsync();
    }

    public Task<CartItem?> GetByIdForUserAsync(int cartItemId, int userId)
    {
        return context.CartItems
            .Include(cartItem => cartItem.Product)
            .FirstOrDefaultAsync(cartItem => cartItem.Id == cartItemId && cartItem.UserId == userId);
    }

    public Task<CartItem?> GetUserProductAsync(int userId, int productId)
    {
        return context.CartItems
            .Include(cartItem => cartItem.Product)
            .FirstOrDefaultAsync(cartItem => cartItem.UserId == userId && cartItem.ProductId == productId);
    }

    public async Task<CartItem> AddItemAsync(CartItem cartItem)
    {
        context.CartItems.Add(cartItem);
        await context.SaveChangesAsync();
        return cartItem;
    }

    public async Task<CartItem> UpdateItemAsync(CartItem cartItem)
    {
        context.CartItems.Update(cartItem);
        await context.SaveChangesAsync();
        return cartItem;
    }

    public async Task RemoveItemAsync(CartItem cartItem)
    {
        context.CartItems.Remove(cartItem);
        await context.SaveChangesAsync();
    }

    public async Task ClearCartAsync(int userId)
    {
        var cartItems = await context.CartItems
            .Where(cartItem => cartItem.UserId == userId)
            .ToListAsync();

        context.CartItems.RemoveRange(cartItems);
        await context.SaveChangesAsync();
    }
}
