using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.DTOs.Categories;

public class CategoryUpdateDto
{
    [Required]
    [StringLength(120)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }
}
