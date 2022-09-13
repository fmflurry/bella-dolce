using AutoMapper;
using BellaDolce.WebApi.Modules.Prestations.Ports;
using MinimalApi.Endpoint;

namespace BellaDolce.WebApi.Prestations.Endpoint;

// <summary>
/// get all prestations
/// </summary>
public class CategoriesEndpoints : IEndpoint<IResult>
{

  private ICategoryRepository _categoryRepository = default!;
  private readonly IMapper _mapper = default!;

  public CategoriesEndpoints(IMapper mapper)
  {
    _mapper = mapper;
  }

  public void AddRoute(IEndpointRouteBuilder app)
  {
    app.MapGet("api/prestations/categories",
      async (ICategoryRepository categoryRepository) =>
      {
        _categoryRepository = categoryRepository;
        return await HandleAsync();
      })
      .Produces<ListCategoryResponse>()
      .WithTags("CategoryEndpoints");
  }

  public async Task<IResult> HandleAsync()
  {
    var response = new ListCategoryResponse();
    var categories = await _categoryRepository.GetActiveCategoriesAsync();
    response.Categories = _mapper.Map<IList<string>>(categories);

    return Results.Ok(response);
  }
}