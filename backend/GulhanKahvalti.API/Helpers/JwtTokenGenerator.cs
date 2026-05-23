using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GulhanKahvalti.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace GulhanKahvalti.API.Helpers;

public class JwtTokenGenerator(IConfiguration configuration)
{
    public string GenerateToken(User user)
    {
        var key = configuration["Jwt:Key"];
        var issuer = configuration["Jwt:Issuer"];
        var audience = configuration["Jwt:Audience"];

        if (string.IsNullOrWhiteSpace(key))
        {
            throw new InvalidOperationException("JWT key is missing. Set Jwt:Key or JWT__Key.");
        }

        if (Encoding.UTF8.GetByteCount(key) < 32)
        {
            throw new InvalidOperationException("JWT key is too short. Set a secret with at least 32 bytes.");
        }

        if (string.IsNullOrWhiteSpace(issuer))
        {
            throw new InvalidOperationException("JWT issuer is missing. Set Jwt:Issuer or JWT__Issuer.");
        }

        if (string.IsNullOrWhiteSpace(audience))
        {
            throw new InvalidOperationException("JWT audience is missing. Set Jwt:Audience or JWT__Audience.");
        }

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
