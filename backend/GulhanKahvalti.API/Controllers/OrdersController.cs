using System.Security.Claims;
using GulhanKahvalti.API.DTOs.Orders;
using GulhanKahvalti.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GulhanKahvalti.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [Authorize]
    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CreateOrderDto request)
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        try
        {
            var order = await orderService.CreateAsync(userId.Value, request);
            return Ok(order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpGet("my-orders")]
    public async Task<IActionResult> GetMyOrders()
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        var orders = await orderService.GetUserOrdersAsync(userId.Value);
        return Ok(orders);
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var userId = GetCurrentUserId();

        if (userId is null)
        {
            return Unauthorized(new { message = "Invalid authentication token." });
        }

        var order = await orderService.GetByIdForUserAsync(userId.Value, id);
        return order is null ? NotFound(new { message = "Order not found." }) : Ok(order);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin/all")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await orderService.GetAllAsync();
        return Ok(orders);
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(userIdClaim, out var userId) ? userId : null;
    }
}
