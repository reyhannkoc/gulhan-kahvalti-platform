using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.Models;

public class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

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

    public decimal TotalPrice { get; set; }

    [Required]
    [StringLength(30)]
    public string Status { get; set; } = "Pending";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
