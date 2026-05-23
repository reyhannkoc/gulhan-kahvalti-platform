using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.DTOs.Orders;

public class UpdateOrderStatusDto
{
    [Required]
    public string Status { get; set; } = string.Empty;
}
