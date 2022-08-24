using BellaDolce.WebApi;

namespace BellaDolce.WebApi.Modules.Users.AuthEndpoints;

public class AuthenticateRequest : BaseRequest
{
    public string Username { get; set; } = default!;
    public string Password { get; set; } = default!;
}