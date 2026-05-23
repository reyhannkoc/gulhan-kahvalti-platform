using GulhanKahvalti.API.DTOs.Products;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Services.Implementations;

public class ProductService(
    IProductRepository productRepository,
    ICategoryRepository categoryRepository) : IProductService
{
    public async Task<IReadOnlyList<ProductResponseDto>> GetAllAsync()
    {
        var products = await productRepository.GetAllAsync();
        return products.Select(MapToResponse).ToList();
    }

    public async Task<ProductResponseDto?> GetByIdAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id);
        return product is null ? null : MapToResponse(product);
    }

    public async Task<ProductResponseDto> CreateAsync(ProductCreateDto request)
    {
        if (!await categoryRepository.ExistsAsync(request.CategoryId))
        {
            throw new KeyNotFoundException("Category not found.");
        }

        var product = new Product
        {
            Name = request.Name.Trim(),
            Description = request.Description,
            Price = request.Price,
            Stock = request.Stock,
            ImageUrl = request.ImageUrl,
            IsActive = request.IsActive,
            CategoryId = request.CategoryId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var createdProduct = await productRepository.CreateAsync(product);
        var productWithCategory = await productRepository.GetByIdAsync(createdProduct.Id);
        return MapToResponse(productWithCategory ?? createdProduct);
    }

    public async Task<ProductResponseDto?> UpdateAsync(int id, ProductUpdateDto request)
    {
        var product = await productRepository.GetByIdAsync(id);

        if (product is null)
        {
            return null;
        }

        if (!await categoryRepository.ExistsAsync(request.CategoryId))
        {
            throw new KeyNotFoundException("Category not found.");
        }

        product.Name = request.Name.Trim();
        product.Description = request.Description;
        product.Price = request.Price;
        product.Stock = request.Stock;
        product.ImageUrl = request.ImageUrl;
        product.IsActive = request.IsActive;
        product.CategoryId = request.CategoryId;
        product.UpdatedAt = DateTime.UtcNow;

        await productRepository.UpdateAsync(product);
        var updatedProduct = await productRepository.GetByIdAsync(product.Id);
        return MapToResponse(updatedProduct ?? product);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id);

        if (product is null)
        {
            return false;
        }

        await productRepository.DeleteAsync(product);
        return true;
    }

    private static ProductResponseDto MapToResponse(Product product)
    {
        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImageUrl = product.ImageUrl,
            IsActive = product.IsActive,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name ?? string.Empty
        };
    }
}
