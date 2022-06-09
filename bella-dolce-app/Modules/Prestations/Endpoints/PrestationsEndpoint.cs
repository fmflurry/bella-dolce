using BellaDolce.WebApi.Prestations.Models;
using BellaDolce.WebApi.Prestations.Ports;
using MinimalApi.Endpoint;

namespace BellaDolce.WebApi.Prestations.Endpoint;

// <summary>
/// get all prestations
/// </summary>
public class PrestationsEndpoints : IEndpoint<IResult>
{

  private IPrestationsRepository _prestationsRepository = default!;

  public void AddRoute(IEndpointRouteBuilder app)
  {
    app.MapGet("api/prestations",
      async (IPrestationsRepository prestationsRepository) =>
      {
        _prestationsRepository = prestationsRepository;
        return await HandleAsync();
      })
      .Produces<ListPrestationsResponse>()
      .WithTags("PrestationsEndpoints");
  }

  public async Task<IResult> HandleAsync()
  {
    var response = new ListPrestationsResponse();
    var prestations = await _prestationsRepository.GetPrestationsAsync();
    // TODO : Mapping
    response.Prestations = prestations.Select(p => new Prestation
    {
      Description = p.Description,
      Duration = p.Duration,
      Id = p.Id,
      Name = p.Name,
      Price = p.Price
    }).ToList();

    return Results.Ok(response);
  }
}