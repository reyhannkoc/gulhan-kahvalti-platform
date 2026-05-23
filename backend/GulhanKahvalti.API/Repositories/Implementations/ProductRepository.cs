using GulhanKahvalti.API.Data;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Repositories.Implementations;

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<IReadOnlyList<Product>> GetAllAsync()
    {
        return await context.Products
            .Include(product => product.Category)
            .AsNoTracking()
            .ToListAsync();
    }

    public Task<Product?> GetByIdAsync(int id)
    {
        return context.Products
            .Include(product => product.Category)
            .FirstOrDefaultAsync(product => product.Id == id);
    }

    public Task<bool> ExistsAsync(int id)
    {
        return context.Products.AnyAsync(product => product.Id == id);
    }

    public async Task<Product> CreateAsync(Product product)
    {
        context.Products.Add(product);
        await context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> UpdateAsync(Product product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
        return product;
    }

    public async Task DeleteAsync(Product product)
    {
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }
}
