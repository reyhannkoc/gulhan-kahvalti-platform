using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GulhanKahvalti.API.DTOs.Orders;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
public class AdminController(IOrderService orderService) : ControllerBase
{
    [HttpGet("dashboard")]
    public IActionResult Dashboard()
    {
        return Ok("Admin dashboard endpoint ready");
    }

    [HttpGet("orders")]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await orderService.GetAllAsync();
        return Ok(orders);
    }

    [HttpPut("orders/{id:int}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto request)
    {
        try
        {
            var order = await orderService.UpdateStatusAsync(id, request.Status);
            return order is null ? NotFound(new { message = "Order not found." }) : Ok(order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
