using MinimalApi.Endpoint.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Regiser Endpoints
builder.Services.AddEndpoints();

// Register modules
builder.Services.RegisterModules();

// Configure Dbs
BellaDolce.WebApi.Infrastructure.Dependencies.ConfigureServices(builder.Configuration, builder.Services);

// Configure AutoMapper profiles
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

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
