using GulhanKahvalti.API.DTOs.Products;

namespace GulhanKahvalti.API.Services.Interfaces;

public interface IProductService
{
    Task<IReadOnlyList<ProductResponseDto>> GetAllAsync();

    Task<ProductResponseDto?> GetByIdAsync(int id);

    Task<ProductResponseDto> CreateAsync(ProductCreateDto request);

    Task<ProductResponseDto?> UpdateAsync(int id, ProductUpdateDto request);

    Task<bool> DeleteAsync(int id);
}
