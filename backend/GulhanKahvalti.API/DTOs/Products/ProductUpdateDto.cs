using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.DTOs.Products;

public class ProductUpdateDto
{
    [Required]
    [StringLength(160)]
    public string Name { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    [StringLength(500)]
    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; } = true;

    public int CategoryId { get; set; }
}
