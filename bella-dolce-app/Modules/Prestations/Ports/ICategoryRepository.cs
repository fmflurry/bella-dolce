namespace BellaDolce.WebApi.Prestations.Ports;

public interface ICategoryRepository
{
    Task<IEnumerable<string>> GetActiveCategoriesAsync();
}