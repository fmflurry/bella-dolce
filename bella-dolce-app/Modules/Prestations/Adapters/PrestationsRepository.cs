using BellaDolce.WebApi.Core.Entities;
using BellaDolce.WebApi.Infrastructure.Data;
using BellaDolce.WebApi.Prestations.Ports;
using Microsoft.EntityFrameworkCore;

namespace BellaDolce.WebApi.Prestations.Adapters;

public class PrestationsRepository : IPrestationsRepository
{

  private readonly CatalogContext _catalogContext;

  public PrestationsRepository(CatalogContext catalogContext)
  {
    _catalogContext = catalogContext;
  }

  public async Task<IEnumerable<PrestationEntity>> GetPrestationsAsync()
  {
    return await Task.FromResult(_catalogContext.Prestations.Include(p => p.Category).AsEnumerable());
  }
}