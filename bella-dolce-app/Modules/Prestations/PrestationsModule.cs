using BellaDolce.WebApi.Prestations.Adapters;
using BellaDolce.WebApi.Prestations.Ports;

public class PrestationsModule : IModule
{
    // Configure DI Containers
  public IServiceCollection RegisterModule(IServiceCollection services)
  {
    services.AddScoped<IPrestationsRepository, PrestationsRepository>();
    return services;
  }

}