using GulhanKahvalti.API.Helpers;
using GulhanKahvalti.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GulhanKahvalti.API.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext context, IConfiguration configuration)
    {
        await SeedAdminUserAsync(context, configuration);
        await SeedCategoriesAndProductsAsync(context);
    }

    private static async Task SeedAdminUserAsync(AppDbContext context, IConfiguration configuration)
    {
        var adminEmail = configuration["DemoSeed:AdminEmail"] ?? "admin@gulhankahvalti.com";

        if (await context.Users.AnyAsync(user => user.Email == adminEmail))
        {
            return;
        }

        var adminPassword = configuration["DemoSeed:AdminPassword"];

        if (string.IsNullOrWhiteSpace(adminPassword))
        {
            throw new InvalidOperationException("Demo seed admin password is missing. Set DemoSeed:AdminPassword in local development configuration.");
        }

        context.Users.Add(new User
        {
            FullName = "Gulhan Admin",
            Email = adminEmail,
            PasswordHash = PasswordHasher.HashPassword(adminPassword),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        await context.SaveChangesAsync();
    }

    private static async Task SeedCategoriesAndProductsAsync(AppDbContext context)
    {
        if (await context.Categories.AnyAsync())
        {
            return;
        }

        var serpme = new Category
        {
            Name = "Serpme Kahvalti",
            Description = "Paylasimlik klasik kahvalti secenekleri.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var sicaklar = new Category
        {
            Name = "Sicaklar",
            Description = "Kahvaltiya eslik eden sicak lezzetler.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var icecekler = new Category
        {
            Name = "Icecekler",
            Description = "Cay, kahve ve soguk icecekler.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Categories.AddRange(serpme, sicaklar, icecekler);

        context.Products.AddRange(
            new Product
            {
                Name = "Gulhan Serpme Kahvalti",
                Description = "Peynir, zeytin, bal, kaymak, recel ve sicaklarla zengin kahvalti.",
                Price = 450,
                Stock = 20,
                IsActive = true,
                Category = serpme,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Menemen",
                Description = "Domates, biber ve yumurta ile hazirlanan klasik sicak kahvalti.",
                Price = 130,
                Stock = 30,
                IsActive = true,
                Category = sicaklar,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Sinirsiz Cay",
                Description = "Kahvalti boyunca taze demlenmis cay servisi.",
                Price = 60,
                Stock = 100,
                IsActive = true,
                Category = icecekler,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });

        await context.SaveChangesAsync();
    }
}
