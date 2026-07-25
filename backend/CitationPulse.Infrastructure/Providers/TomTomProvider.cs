using System.Net.Http.Json;
using System.Text.Json.Serialization;
using CitationPulse.Application.Interfaces;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class TomTomProvider : ICitationProvider
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public string Name => "TomTom";

    public TomTomProvider(HttpClient httpClient, string apiKey)
    {
        _httpClient = httpClient;
        _apiKey = apiKey;
    }

    public async Task<CitationResult> CheckAsync(Business business, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.NotConfigured,
                Notes = "TomTom API key not provided."
            };
        }

        try
        {
            var query = Uri.EscapeDataString($"{business.Name} {business.Address}");
            var requestUrl = $"search/2/search/{query}.json?key={_apiKey}&limit=1";

            var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
            response.EnsureSuccessStatusCode();

            var payload = await response.Content.ReadFromJsonAsync<TomTomResponse>(cancellationToken: cancellationToken);
            var match = payload?.Results?.FirstOrDefault();

            if (match is null)
            {
                return new CitationResult { ProviderName = Name, Status = CitationStatus.NotFound };
            }

            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Found,
                FoundName = match.Poi?.Name,
                FoundAddress = match.Address?.FreeformAddress,
                FoundPhoneNumber = match.Poi?.Phone,
                FoundWebsite = match.Poi?.Url,
                FoundLatitude = match.Position?.Lat,
                FoundLongitude = match.Position?.Lon
            };
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Unavailable,
                Notes = $"TomTom request failed: {ex.Message}"
            };
        }
    }

    private class TomTomResponse
    {
        [JsonPropertyName("results")] public List<TomTomResult>? Results { get; set; }
    }

    private class TomTomResult
    {
        [JsonPropertyName("poi")] public TomTomPoi? Poi { get; set; }
        [JsonPropertyName("address")] public TomTomAddress? Address { get; set; }
        [JsonPropertyName("position")] public TomTomPosition? Position { get; set; }
    }

    private class TomTomPoi
    {
        [JsonPropertyName("name")] public string? Name { get; set; }
        [JsonPropertyName("phone")] public string? Phone { get; set; }
        [JsonPropertyName("url")] public string? Url { get; set; }
    }

    private class TomTomAddress
    {
        [JsonPropertyName("freeformAddress")] public string? FreeformAddress { get; set; }
    }

    private class TomTomPosition
    {
        [JsonPropertyName("lat")] public double? Lat { get; set; }
        [JsonPropertyName("lon")] public double? Lon { get; set; }
    }
}