using AngleSharp;
using AngleSharp.Dom;
using CitationPulse.Application.Interfaces;
using CitationPulse.Application.Matching;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class BulurumScrapingProvider : ICitationProvider
{
    private const double MinimumMatchThreshold = 50;

    private readonly IBrowsingContext _browsingContext;

    public string Name => "Bulurum.com (Firma Rehberi)";

    public BulurumScrapingProvider()
    {
        var config = Configuration.Default.WithDefaultLoader();
        _browsingContext = BrowsingContext.New(config);
    }

    public async Task<CitationResult> CheckAsync(Business business, CancellationToken cancellationToken)
    {
        try
        {
            var requestUrl = BuildSearchUrl(business);
            var document = await _browsingContext.OpenAsync(requestUrl, cancellationToken);
            var listings = document.QuerySelectorAll(".FreeListingAreaLeft");

            IElement? bestMatch = null;
            var bestScore = 0.0;

            foreach (var listing in listings)
            {
                var candidateName = listing.QuerySelector(".CompanyName span")?.TextContent.Trim();
                if (string.IsNullOrWhiteSpace(candidateName))
                {
                    continue;
                }

                var similarity = NameMatcher.CalculateSimilarity(business.Name, candidateName);
                if (similarity > bestScore)
                {
                    bestScore = similarity;
                    bestMatch = listing;
                }
            }

            if (bestMatch is null || bestScore < MinimumMatchThreshold)
            {
                return new CitationResult { ProviderName = Name, Status = CitationStatus.NotFound };
            }

            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Found,
                FoundName = bestMatch.QuerySelector(".CompanyName span")?.TextContent.Trim(),
                FoundAddress = bestMatch.QuerySelector(".FreeListingAddress")?.TextContent.Trim(),
                FoundPhoneNumber = bestMatch.QuerySelector("[itemprop='telephone']")?.TextContent.Trim(),
                FoundWebsite = bestMatch.QuerySelector("a[itemprop='url']")?.GetAttribute("href")
            };
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = Name,
                Status = CitationStatus.Unavailable,
                Notes = $"Bulurum scraping failed: {ex.Message}"
            };
        }
    }

    private static string BuildSearchUrl(Business business)
    {
        var addressParts = (business.Address ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var district = addressParts.Length > 0 ? addressParts[0] : string.Empty;
        var city = addressParts.Length > 1 ? addressParts[^1] : district;

        var querySlug = Uri.EscapeDataString($"{business.Name}-{district}".Trim('-'));
        var citySlug = Uri.EscapeDataString(city);

        return $"https://www.bulurum.com/search/{querySlug}/{citySlug}/";
    }
}