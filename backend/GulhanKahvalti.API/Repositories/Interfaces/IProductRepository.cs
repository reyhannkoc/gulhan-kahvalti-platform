using GulhanKahvalti.API.Models;

namespace GulhanKahvalti.API.Repositories.Interfaces;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetAllAsync();

    Task<Product?> GetByIdAsync(int id);

    Task<bool> ExistsAsync(int id);

    Task<Product> CreateAsync(Product product);

    Task<Product> UpdateAsync(Product product);

    Task DeleteAsync(Product product);
}
