using System.ComponentModel.DataAnnotations;

namespace GulhanKahvalti.API.DTOs.Cart;

public class AddCartItemDto
{
    public int ProductId { get; set; }

    [Range(1, 100)]
    public int Quantity { get; set; } = 1;
}
