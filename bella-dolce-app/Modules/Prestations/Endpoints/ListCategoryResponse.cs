using BellaDolce.WebApi.Prestations.Models;

namespace BellaDolce.WebApi.Prestations.Endpoint;

public class ListCategoryResponse : BaseResponse
{
    public ListCategoryResponse(Guid correlationId) : base(correlationId)
    {
    }

    public ListCategoryResponse()
    {
    }

    public IList<string> Categories { get; set; } = new List<string>();
}