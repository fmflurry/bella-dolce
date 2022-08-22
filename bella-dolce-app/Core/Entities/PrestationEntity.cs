namespace BellaDolce.WebApi.Core.Entities;

public class PrestationEntity : BaseEntity
{
    public string? Description { get; set; }
    public int Duration { get; set; }
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    
    // navigation property
    public virtual CategoryEntity Category { get; set; } = default!;
}