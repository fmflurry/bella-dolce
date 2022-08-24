using AutoMapper;
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
  private readonly IMapper _mapper = default!;

  public PrestationsEndpoints(IMapper mapper)
  {
    _mapper = mapper;
  }

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
    response.Prestations = _mapper.Map<IList<Prestation>>(prestations);

    return Results.Ok(response);
  }
}