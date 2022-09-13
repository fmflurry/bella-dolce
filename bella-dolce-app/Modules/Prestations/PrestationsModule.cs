using BellaDolce.WebApi.Modules.Prestations.Adapters;
using BellaDolce.WebApi.Modules.Prestations.Ports;

namespace BellaDolce.WebApi.Prestations;

public class PrestationsModule : IModule
{
    // Configure DI Containers
    public IServiceCollection RegisterModule(IServiceCollection services)
    {
        services.AddScoped<IPrestationsRepository, PrestationsRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        return services;
    }

}