using BellaDolce.WebApi.Core.Entities;

namespace BellaDolce.WebApi.Prestations.Ports;

public interface IPrestationsRepository
{
    Task<IEnumerable<PrestationEntity>> GetPrestationsAsync();
}