namespace BellaDolce.WebApi.Core.Entities;

public class CategoryEntity : BaseEntity
{
    public string Name { get; set; } = default!;
    public bool IsActive { get; set; }

    public virtual IList<PrestationEntity> Prestations { get; set; } = default!;
}