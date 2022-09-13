using BellaDolce.WebApi.Core.Entities;

namespace BellaDolce.WebApi.Modules.Prestations.Ports;

public interface IPrestationsRepository
{
    Task<IEnumerable<PrestationEntity>> GetPrestationsAsync();
}