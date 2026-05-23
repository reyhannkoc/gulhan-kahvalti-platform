using System.Security.Claims;
using GulhanKahvalti.API.DTOs.Cart;
using GulhanKahvalti.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GulhanKahvalti.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController(ICartService cartService) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        var cartItems = await cartService.GetUserCartAsync(userId);
        return Ok(cartItems);
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] AddCartItemDto request)
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        try
        {
            var cartItem = await cartService.AddItemAsync(userId.Value, request);
            return Ok(cartItem);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemDto request)
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        try
        {
            var cartItem = await cartService.UpdateItemAsync(userId.Value, id, request);
            return cartItem is null ? NotFound(new { message = "Cart item not found." }) : Ok(cartItem);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpDelete("remove/{id:int}")]
    public async Task<IActionResult> RemoveCartItem(int id)
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        var removed = await cartService.RemoveItemAsync(userId.Value, id);
        return removed ? NoContent() : NotFound(new { message = "Cart item not found." });
    }

    [Authorize]
    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        await cartService.ClearCartAsync(userId.Value);
        return NoContent();
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(userIdClaim, out var userId) ? userId : null;
    }
}
