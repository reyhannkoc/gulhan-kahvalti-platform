namespace GulhanKahvalti.API.Helpers;

public static class PasswordHasher
{
    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public static bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }

    public static bool IsValidBCryptHashFormat(string? passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
        {
            return false;
        }

        return passwordHash.Length == 60
            && (passwordHash.StartsWith("$2a$", StringComparison.Ordinal)
                || passwordHash.StartsWith("$2b$", StringComparison.Ordinal)
                || passwordHash.StartsWith("$2y$", StringComparison.Ordinal));
    }
}
