using GulhanKahvalti.API.Models;

namespace GulhanKahvalti.API.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<IReadOnlyList<Category>> GetAllAsync();

    Task<Category?> GetByIdAsync(int id);

    Task<bool> ExistsAsync(int id);

    Task<bool> HasProductsAsync(int id);

    Task<Category> CreateAsync(Category category);

    Task<Category> UpdateAsync(Category category);

    Task DeleteAsync(Category category);
}
