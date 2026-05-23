using GulhanKahvalti.API.DTOs.Categories;

namespace GulhanKahvalti.API.Services.Interfaces;

public interface ICategoryService
{
    Task<IReadOnlyList<CategoryResponseDto>> GetAllAsync();

    Task<CategoryResponseDto?> GetByIdAsync(int id);

    Task<CategoryResponseDto> CreateAsync(CategoryCreateDto request);

    Task<CategoryResponseDto?> UpdateAsync(int id, CategoryUpdateDto request);

    Task<bool> DeleteAsync(int id);
}
