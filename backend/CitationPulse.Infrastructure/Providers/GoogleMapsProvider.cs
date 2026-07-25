using System.Net.Http.Json;
using System.Text.Json.Serialization;
using CitationPulse.Application.Interfaces;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class GoogleMapsProvider : ICitationProvider
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public string Name => "Google Maps";

    public GoogleMapsProvider(HttpClient httpClient, string apiKey)
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
                Notes = "Google Maps API key not provided."
            };
        }

        try
        {
            var requestBody = new { textQuery = $"{business.Name} {business.Address}" };
            using var request = new HttpRequestMessage(HttpMethod.Post, "v1/places:searchText");
            request.Headers.Add("X-Goog-Api-Key", _apiKey);
            request.Headers.Add("X-Goog-FieldMask",
                "places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.websiteUri");
            request.Content = JsonContent.Create(requestBody);

            var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();

            var payload = await response.Content.ReadFromJsonAsync<GoogleSearchResponse>(cancellationToken: cancellationToken);

            if (payload?.Places is null || payload.Places.Count == 0)
            {
                return new CitationResult { ProviderName = Name, Status = CitationStatus.NotFound };
            }

            var place = payload.Places[0];

            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Found,
                FoundName = place.DisplayName?.Text,
                FoundAddress = place.FormattedAddress,
                FoundPhoneNumber = place.NationalPhoneNumber,
                FoundWebsite = place.WebsiteUri,
                FoundLatitude = place.Location?.Latitude,
                FoundLongitude = place.Location?.Longitude
            };
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Unavailable,
                Notes = $"Google Maps request failed: {ex.Message}"
            };
        }
    }

    private class GoogleSearchResponse
    {
        [JsonPropertyName("places")] public List<GooglePlace>? Places { get; set; }
    }

    private class GooglePlace
    {
        [JsonPropertyName("displayName")] public DisplayNameInfo? DisplayName { get; set; }
        [JsonPropertyName("formattedAddress")] public string? FormattedAddress { get; set; }
        [JsonPropertyName("nationalPhoneNumber")] public string? NationalPhoneNumber { get; set; }
        [JsonPropertyName("websiteUri")] public string? WebsiteUri { get; set; }
        [JsonPropertyName("location")] public LocationInfo? Location { get; set; }
    }

    private class DisplayNameInfo
    {
        [JsonPropertyName("text")] public string? Text { get; set; }
    }

    private class LocationInfo
    {
        [JsonPropertyName("latitude")] public double? Latitude { get; set; }
        [JsonPropertyName("longitude")] public double? Longitude { get; set; }
    }
}