using GulhanKahvalti.API.DTOs.Cart;

namespace GulhanKahvalti.API.Services.Interfaces;

public interface ICartService
{
    Task<IReadOnlyList<CartItemDto>> GetUserCartAsync(int userId);

    Task<CartItemDto> AddItemAsync(int userId, AddCartItemDto request);

    Task<CartItemDto?> UpdateItemAsync(int userId, int cartItemId, UpdateCartItemDto request);

    Task<bool> RemoveItemAsync(int userId, int cartItemId);

    Task ClearCartAsync(int userId);
}
