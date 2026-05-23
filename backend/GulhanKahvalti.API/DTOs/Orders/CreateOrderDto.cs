using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.DTOs.Orders;

public class CreateOrderDto
{
    [Required]
    [StringLength(120)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string CustomerPhone { get; set; } = string.Empty;

    [Required]
    [StringLength(1000)]
    public string CustomerAddress { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Note { get; set; }
}
