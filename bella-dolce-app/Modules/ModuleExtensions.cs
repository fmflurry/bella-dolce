public static class ModuleExtensions
{
    private static readonly IList<IModule> registeredModules = new List<IModule>();

    public static IServiceCollection RegisterModules(this IServiceCollection services)
    {
        var modules = DiscoverModules();
        foreach(var module in modules)
        {
            module.RegisterModule(services);
            registeredModules.Add(module);
        }
        return services;
    }

    private static IEnumerable<IModule> DiscoverModules()
    {
        return typeof(IModule).Assembly
            .GetTypes()
            .Where(p => p.IsClass && p.IsAssignableTo(typeof(IModule)))
            .Select(Activator.CreateInstance)
            .Cast<IModule>();
    }

}