namespace BellaDolce.WebApi.Prestations.Models;

public class Prestation
{
    public int Id { get; set; }
    public Category Category { get; set; } = default!;
    public string? Description { get; set; }
    public int Duration { get; set; }
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }
}