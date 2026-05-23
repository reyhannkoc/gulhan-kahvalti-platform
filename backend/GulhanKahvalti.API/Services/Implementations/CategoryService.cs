using GulhanKahvalti.API.DTOs.Categories;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Services.Implementations;

public class CategoryService(ICategoryRepository categoryRepository) : ICategoryService
{
    public async Task<IReadOnlyList<CategoryResponseDto>> GetAllAsync()
    {
        var categories = await categoryRepository.GetAllAsync();
        return categories.Select(MapToResponse).ToList();
    }

    public async Task<CategoryResponseDto?> GetByIdAsync(int id)
    {
        var category = await categoryRepository.GetByIdAsync(id);
        return category is null ? null : MapToResponse(category);
    }

    public async Task<CategoryResponseDto> CreateAsync(CategoryCreateDto request)
    {
        var category = new Category
        {
            Name = request.Name.Trim(),
            Description = request.Description,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await categoryRepository.CreateAsync(category);
        return MapToResponse(category);
    }

    public async Task<CategoryResponseDto?> UpdateAsync(int id, CategoryUpdateDto request)
    {
        var category = await categoryRepository.GetByIdAsync(id);

        if (category is null)
        {
            return null;
        }

        category.Name = request.Name.Trim();
        category.Description = request.Description;
        category.UpdatedAt = DateTime.UtcNow;

        await categoryRepository.UpdateAsync(category);
        return MapToResponse(category);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var category = await categoryRepository.GetByIdAsync(id);

        if (category is null)
        {
            return false;
        }

        if (await categoryRepository.HasProductsAsync(id))
        {
            throw new InvalidOperationException("Category has products and cannot be deleted.");
        }

        await categoryRepository.DeleteAsync(category);
        return true;
    }

    private static CategoryResponseDto MapToResponse(Category category)
    {
        return new CategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description
        };
    }
}
