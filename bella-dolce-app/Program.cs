using System.Text;
using BellaDolce.WebApi.Constants;
using BellaDolce.WebApi.Core.Interfaces;
using BellaDolce.WebApi.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MinimalApi.Endpoint.Extensions;

// BUILDER
var builder = WebApplication.CreateBuilder(args);

// Authentication mechanism
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddEntityFrameworkStores<AppIdentityDbContext>()
        .AddDefaultTokenProviders();
builder.Services.AddAuthorization();

// Configure DI Token
builder.Services.AddScoped<ITokenClaimsService, IdentityTokenClaimsService>();

builder.Services.AddMemoryCache();

// configure Authentication
var key = Encoding.ASCII.GetBytes(AuthorizationConstants.JWT_SECRET_KEY);
builder.Services.AddAuthentication(config =>
{
    config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false;
    config.SaveToken = true;
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Regiser Endpoints
builder.Services.AddEndpoints();

// Register modules
builder.Services.RegisterModules();

// Configure Dbs
BellaDolce.WebApi.Infrastructure.Dependencies.ConfigureServices(builder.Configuration, builder.Services);

builder.Services.AddControllers();

// Configure AutoMapper profiles
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// EnableAnnotations to Swagger

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BellaDolce API", Version = "v1" });
    c.EnableAnnotations();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header,

                },
                new List<string>()
            }
        });
});


// APP
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var scopedProvider = scope.ServiceProvider;

    // we can seed here
    // var catalogContext = scopedProvider.GetRequiredService<CatalogContext>();
    // not needed

    var userManager = scopedProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scopedProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var identityContext = scopedProvider.GetRequiredService<AppIdentityDbContext>();
    // await AppIdentityDbContextSeed.SeedAsync(identityContext, userManager, roleManager);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseRouting();

app.UseAuthorization();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BellaDolce API V1");
});

// Declare endpoints
app.UseEndpoints(endpoints => 
{
    endpoints.MapControllers();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Register modules' endpoints
app.MapEndpoints();

app.MapFallbackToFile("index.html");;

app.Run();
