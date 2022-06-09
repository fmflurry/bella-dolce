using BellaDolce.WebApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BellaDolce.WebApi.Infrastructure;

public static class Dependencies
{
    public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
    {
        services.AddDbContext<CatalogContext>(options =>
            options.UseMySql(configuration.GetConnectionString("CatalogConnection"),
                ServerVersion.AutoDetect(configuration.GetConnectionString("CatalogConnection")))
        );
    }
}