using GulhanKahvalti.API.Models;

namespace GulhanKahvalti.API.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByIdAsync(int id);

    Task<User> CreateAsync(User user);

    Task<bool> ExistsByEmailAsync(string email);
}
