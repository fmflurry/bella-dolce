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
    public DbSet<CategoryEntity> Categories { get; set; } = default!;
    public DbSet<AvailabilityEntity> Availabilities { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PrestationEntity>()
            .HasOne<CategoryEntity>(p => p.Category)
            .WithMany(c => c.Prestations)
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

}