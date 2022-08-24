using Ardalis.ApiEndpoints;
using BellaDolce.WebApi.Core.Interfaces;
using BellaDolce.WebApi.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BellaDolce.WebApi.Modules.Users.AuthEndpoints;

public class AuthenticateEndpoint : EndpointBaseAsync
    .WithRequest<AuthenticateRequest>
    .WithActionResult<AuthenticateResponse>
{

  private readonly SignInManager<ApplicationUser> _signInManager;
  private readonly ITokenClaimsService _tokenClaimsService;

  public AuthenticateEndpoint(SignInManager<ApplicationUser> signInManager,
      ITokenClaimsService tokenClaimsService)
  {
      _signInManager = signInManager;
      _tokenClaimsService = tokenClaimsService;
  }

    [HttpPost("api/authenticate")]
    [SwaggerOperation(
        Summary = "Authenticates a user",
        Description = "Authenticates a user",
        OperationId = "auth.authenticate",
        Tags = new[] { "AuthEndpoints" })
    ]
    public override async Task<ActionResult<AuthenticateResponse>> HandleAsync(AuthenticateRequest request, CancellationToken cancellationToken = default)
    {
        var response = new AuthenticateResponse(request.CorrelationId());

        // Does not count login failures towards account lockout
        // to enable password failures to trigger account lockout, set lockoutOnFailure : true
        var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, true);

        response.Result = result.Succeeded;
        response.IsNotAllowed = result.IsNotAllowed;
        response.Username = request.Username;

        if (result.Succeeded)
        {
            response.Token = await _tokenClaimsService.GetTokenAsync(request.Username);
        }

        return response;
    }

}