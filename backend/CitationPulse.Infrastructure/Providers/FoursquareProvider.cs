using System.Text.Json;
using System.Text.Json.Serialization;
using CitationPulse.Application.Interfaces;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class FoursquareProvider : ICitationProvider
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public string Name => "Foursquare";

    public FoursquareProvider(HttpClient httpClient, string apiKey)
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
                Notes = "Foursquare API key not provided."
            };
        }

        try
        {
            var query = Uri.EscapeDataString(business.Name);
            var near = Uri.EscapeDataString(business.Address ?? string.Empty);
            var requestUrl = $"places/search?query={query}&near={near}&fields=name,location,latitude,longitude,tel,website&limit=1";

            using var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");
            request.Headers.Add("X-Places-Api-Version", "2025-06-17");
            request.Headers.Add("Accept", "application/json");

            var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();

            var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            var payload = await JsonSerializer.DeserializeAsync<FoursquareResponse>(stream, cancellationToken: cancellationToken);
            var match = payload?.Results?.FirstOrDefault();

            if (match is null)
            {
                return new CitationResult { ProviderName = Name, Status = CitationStatus.NotFound };
            }

            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Found,
                FoundName = match.Name,
                FoundAddress = match.Location?.Address,
                FoundPhoneNumber = match.Tel,
                FoundWebsite = match.Website,
                FoundLatitude = match.Latitude,
                FoundLongitude = match.Longitude
            };
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Unavailable,
                Notes = $"Foursquare request failed: {ex.Message}"
            };
        }
    }

    private class FoursquareResponse
    {
        [JsonPropertyName("results")] public List<FoursquarePlace>? Results { get; set; }
    }

    private class FoursquarePlace
    {
        [JsonPropertyName("name")] public string? Name { get; set; }
        [JsonPropertyName("tel")] public string? Tel { get; set; }
        [JsonPropertyName("website")] public string? Website { get; set; }
        [JsonPropertyName("latitude")] public double? Latitude { get; set; }
        [JsonPropertyName("longitude")] public double? Longitude { get; set; }
        [JsonPropertyName("location")] public FoursquareLocation? Location { get; set; }
    }

    private class FoursquareLocation
    {
        [JsonPropertyName("address")] public string? Address { get; set; }
    }
}