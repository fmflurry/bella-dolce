using MinimalApi.Endpoint.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpoints();

// Register modules
builder.Services.RegisterModules();
BellaDolce.WebApi.Infrastructure.Dependencies.ConfigureServices(builder.Configuration, builder.Services);

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Register modules' endpoints
app.MapEndpoints();

app.MapFallbackToFile("index.html");;

app.Run();
