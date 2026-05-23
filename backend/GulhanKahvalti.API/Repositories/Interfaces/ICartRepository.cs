using GulhanKahvalti.API.Models;

namespace GulhanKahvalti.API.Repositories.Interfaces;

public interface ICartRepository
{
    Task<IReadOnlyList<CartItem>> GetUserCartAsync(int userId);

    Task<CartItem?> GetByIdForUserAsync(int cartItemId, int userId);

    Task<CartItem?> GetUserProductAsync(int userId, int productId);

    Task<CartItem> AddItemAsync(CartItem cartItem);

    Task<CartItem> UpdateItemAsync(CartItem cartItem);

    Task RemoveItemAsync(CartItem cartItem);

    Task ClearCartAsync(int userId);
}
