using GulhanKahvalti.API.DTOs.Auth;
using GulhanKahvalti.API.Helpers;
using GulhanKahvalti.API.Models;
using GulhanKahvalti.API.Repositories.Interfaces;
using GulhanKahvalti.API.Services.Interfaces;

namespace GulhanKahvalti.API.Services.Implementations;

public class AuthService(
    IUserRepository userRepository,
    JwtTokenGenerator jwtTokenGenerator,
    ILogger<AuthService> logger) : IAuthService
{
    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        if (await userRepository.ExistsByEmailAsync(normalizedEmail))
        {
            throw new InvalidOperationException("Email is already registered.");
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = normalizedEmail,
            PasswordHash = PasswordHasher.HashPassword(request.Password),
            Role = "User",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await userRepository.CreateAsync(user);

        return CreateAuthResponse(user);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var maskedEmail = MaskEmail(normalizedEmail);

        logger.LogInformation("Login attempt started for {Email}.", maskedEmail);

        var user = await userRepository.GetByEmailAsync(normalizedEmail);

        if (user is null)
        {
            logger.LogInformation("Login failed for {Email}: user not found.", maskedEmail);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var hasValidHashFormat = PasswordHasher.IsValidBCryptHashFormat(user.PasswordHash);
        logger.LogInformation("Login user found for {Email}. Password hash format valid: {HashFormatValid}.", maskedEmail, hasValidHashFormat);

        if (!hasValidHashFormat)
        {
            logger.LogWarning("Login failed for {Email}: stored password hash is not a valid BCrypt hash.", maskedEmail);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        bool passwordMatches;

        try
        {
            passwordMatches = PasswordHasher.VerifyPassword(request.Password, user.PasswordHash);
        }
        catch (Exception ex) when (ex is ArgumentException || ex is FormatException || ex is InvalidOperationException || ex.GetType().Name.Contains("Salt", StringComparison.OrdinalIgnoreCase))
        {
            logger.LogWarning(ex, "Login failed for {Email}: BCrypt verification threw for stored password hash.", maskedEmail);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        if (!passwordMatches)
        {
            logger.LogInformation("Login failed for {Email}: password verification failed.", maskedEmail);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        logger.LogInformation("Token generation started for {Email}.", maskedEmail);
        var response = CreateAuthResponse(user);
        logger.LogInformation("Token generation completed for {Email}.", maskedEmail);

        return response;
    }

    private AuthResponseDto CreateAuthResponse(User user)
    {
        return new AuthResponseDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Token = jwtTokenGenerator.GenerateToken(user)
        };
    }

    private static string MaskEmail(string email)
    {
        var atIndex = email.IndexOf('@');

        if (atIndex <= 1)
        {
            return "***";
        }

        var firstCharacter = email[0];
        var domain = email[atIndex..];
        return $"{firstCharacter}***{domain}";
    }
}
