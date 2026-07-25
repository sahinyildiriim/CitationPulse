using System.Text.Json;
using System.Text.Json.Serialization;
using CitationPulse.Application.Interfaces;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class OpenStreetMapProvider : ICitationProvider
{
    private readonly HttpClient _httpClient;

    public string Name => "OpenStreetMap";

    public OpenStreetMapProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<CitationResult> CheckAsync(Business business, CancellationToken cancellationToken)
    {
        try
        {
            var query = Uri.EscapeDataString($"{business.Name} {business.Address}");
            var requestUrl = $"search?q={query}&format=json&addressdetails=1&namedetails=1&limit=1";

            var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
            response.EnsureSuccessStatusCode();

            var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            var results = await JsonSerializer.DeserializeAsync<List<NominatimResult>>(stream, cancellationToken: cancellationToken);

            if (results is null || results.Count == 0)
            {
                return new CitationResult { ProviderName = Name, Status = CitationStatus.NotFound };
            }

            var match = results[0];

            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Found,
                FoundName = match.NameDetails?.Name ?? match.DisplayName,
                FoundAddress = match.DisplayName,
                FoundLatitude = double.TryParse(match.Lat, out var lat) ? lat : null,
                FoundLongitude = double.TryParse(match.Lon, out var lon) ? lon : null
            };
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Unavailable,
                Notes = $"OpenStreetMap request failed: {ex.Message}"
            };
        }
    }

    private class NominatimResult
    {
        [JsonPropertyName("display_name")] public string? DisplayName { get; set; }
        [JsonPropertyName("lat")] public string? Lat { get; set; }
        [JsonPropertyName("lon")] public string? Lon { get; set; }
        [JsonPropertyName("namedetails")] public NameDetails? NameDetails { get; set; }
    }

    private class NameDetails
    {
        [JsonPropertyName("name")] public string? Name { get; set; }
    }
}