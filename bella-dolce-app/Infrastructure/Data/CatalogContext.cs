using System.Reflection;
using BellaDolce.WebApi.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BellaDolce.WebApi.Infrastructure.Data;

public class CatalogContext : DbContext
{
    public CatalogContext(DbContextOptions<CatalogContext> options) : base(options)
    {
    }

    public DbSet<PrestationEntity> Prestations { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

}