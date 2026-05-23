using GulhanKahvalti.API.Data;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Repositories.Implementations;

public class CategoryRepository(AppDbContext context) : ICategoryRepository
{
    public async Task<IReadOnlyList<Category>> GetAllAsync()
    {
        return await context.Categories
            .AsNoTracking()
            .ToListAsync();
    }

    public Task<Category?> GetByIdAsync(int id)
    {
        return context.Categories.FirstOrDefaultAsync(category => category.Id == id);
    }

    public Task<bool> ExistsAsync(int id)
    {
        return context.Categories.AnyAsync(category => category.Id == id);
    }

    public Task<bool> HasProductsAsync(int id)
    {
        return context.Products.AnyAsync(product => product.CategoryId == id);
    }

    public async Task<Category> CreateAsync(Category category)
    {
        context.Categories.Add(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task<Category> UpdateAsync(Category category)
    {
        context.Categories.Update(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task DeleteAsync(Category category)
    {
        context.Categories.Remove(category);
        await context.SaveChangesAsync();
    }
}
