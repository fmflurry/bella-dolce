using BellaDolce.WebApi.Prestations.Models;

namespace BellaDolce.WebApi.Prestations.Endpoint;

public class ListPrestationsResponse : BaseResponse
{
    public ListPrestationsResponse(Guid correlationId) : base(correlationId)
    {
    }

    public ListPrestationsResponse()
    {
    }

    public IList<Prestation> Prestations { get; set; } = new List<Prestation>();
}