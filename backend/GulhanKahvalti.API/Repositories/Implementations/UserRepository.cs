using GulhanKahvalti.API.Data;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Repositories.Implementations;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public Task<User?> GetByEmailAsync(string email)
    {
        return context.Users.FirstOrDefaultAsync(user => user.Email == email);
    }

    public Task<User?> GetByIdAsync(int id)
    {
        return context.Users.FindAsync(id).AsTask();
    }

    public async Task<User> CreateAsync(User user)
    {
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public Task<bool> ExistsByEmailAsync(string email)
    {
        return context.Users.AnyAsync(user => user.Email == email);
    }
}
