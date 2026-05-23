namespace GulhanKahvalti.API.DTOs.Orders;

public class OrderResponseDto
{
    public int Id { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string CustomerPhone { get; set; } = string.Empty;

    public string CustomerAddress { get; set; } = string.Empty;

    public string? Note { get; set; }

    public decimal TotalPrice { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public IReadOnlyList<OrderItemResponseDto> Items { get; set; } = [];
}
