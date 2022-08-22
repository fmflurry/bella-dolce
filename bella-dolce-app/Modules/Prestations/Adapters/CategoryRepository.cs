using BellaDolce.WebApi.Core.Entities;
using BellaDolce.WebApi.Infrastructure.Data;
using BellaDolce.WebApi.Prestations.Ports;

namespace BellaDolce.WebApi.Prestations.Adapters;

public class CategoryRepository : ICategoryRepository
{

    private readonly CatalogContext _catalogContext;

    public CategoryRepository(CatalogContext catalogContext)
    {
        _catalogContext = catalogContext;
    }

    public async Task<IEnumerable<string>> GetActiveCategoriesAsync()
    {
        return await Task.FromResult(_catalogContext.Categories
            .Where(category => category.IsActive)
            .Select(category => category.Name).AsEnumerable());
    }
}