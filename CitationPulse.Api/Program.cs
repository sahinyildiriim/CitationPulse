using CitationPulse.Application.Interfaces;
using CitationPulse.Application.Services;
using CitationPulse.Infrastructure.Persistence;
using CitationPulse.Infrastructure.Providers;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) =>
    configuration.WriteTo.Console());

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CitationPulseDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpClient("OpenStreetMap", client =>
{
    client.BaseAddress = new Uri("https://nominatim.openstreetmap.org/");
    client.DefaultRequestHeaders.Add("User-Agent", "CitationPulse/1.0 (case study project)");
});

builder.Services.AddHttpClient("GoogleMaps", client =>
{
    client.BaseAddress = new Uri("https://places.googleapis.com/");
});
builder.Services.AddHttpClient("TomTom", client =>
{
    client.BaseAddress = new Uri("https://api.tomtom.com/");
});
builder.Services.AddHttpClient("Foursquare", client =>
{
    client.BaseAddress = new Uri("https://places-api.foursquare.com/");
});

builder.Services.AddScoped<ICitationProvider>(sp =>
{
    var factory = sp.GetRequiredService<IHttpClientFactory>();
    return new OpenStreetMapProvider(factory.CreateClient("OpenStreetMap"));
});
builder.Services.AddScoped<ICitationProvider>(sp =>
{
    var factory = sp.GetRequiredService<IHttpClientFactory>();
    var apiKey = builder.Configuration["ProviderApiKeys:TomTom"] ?? string.Empty;
    return new TomTomProvider(factory.CreateClient("TomTom"), apiKey);
});
builder.Services.AddScoped<ICitationProvider>(sp =>
{
    var factory = sp.GetRequiredService<IHttpClientFactory>();
    var apiKey = builder.Configuration["ProviderApiKeys:Foursquare"] ?? string.Empty;
    return new FoursquareProvider(factory.CreateClient("Foursquare"), apiKey);
});

builder.Services.AddScoped<ICitationProvider>(sp =>
{
    var factory = sp.GetRequiredService<IHttpClientFactory>();
    var apiKey = builder.Configuration["ProviderApiKeys:GoogleMaps"] ?? string.Empty;
    return new GoogleMapsProvider(factory.CreateClient("GoogleMaps"), apiKey);
});

builder.Services.AddScoped<ICitationProvider, BulurumScrapingProvider>();

var mockProviderNames = new[]
{
    
    "HERE",
    "Azure Maps",
    "Apple Maps",
    "Yellow Pages Türkiye",
    "TripAdvisor Türkiye"
};

foreach (var providerName in mockProviderNames)
{
    builder.Services.AddScoped<ICitationProvider>(_ => new MockCitationProvider(providerName));
}

builder.Services.AddScoped<CitationCheckService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<CitationPulseDbContext>();
    dbContext.Database.Migrate();
}

app.Run();