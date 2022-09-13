namespace BellaDolce.WebApi.Modules.Prestations.Ports;

public interface ICategoryRepository
{
    Task<IEnumerable<string>> GetActiveCategoriesAsync();
}