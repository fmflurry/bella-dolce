using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BellaDolce.WebApi.Constants;
using BellaDolce.WebApi.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BellaDolce.WebApi.Infrastructure.Identity;

public class IdentityTokenClaimsService : ITokenClaimsService
{

    private readonly UserManager<ApplicationUser> _userManager;
    
    public IdentityTokenClaimsService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<string> GetTokenAsync(string userName)
    {
        // Create handler 
        var tokenHandler = new JwtSecurityTokenHandler();
        
        // Gather data
        var key = Encoding.ASCII.GetBytes(AuthorizationConstants.JWT_SECRET_KEY);
        var user = await _userManager.FindByNameAsync(userName);
        var roles = await _userManager.GetRolesAsync(user);
        
        // Create claim
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, userName) };
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims.ToArray()),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        // Create token
        var jwtSecurityToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(jwtSecurityToken);
    }

}