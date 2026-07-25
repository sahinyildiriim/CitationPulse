using CitationPulse.Application.Dtos;
using CitationPulse.Application.Interfaces;
using CitationPulse.Application.Matching;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Application.Services;

public class CitationCheckService
{
    private readonly IEnumerable<ICitationProvider> _providers;

    public CitationCheckService(IEnumerable<ICitationProvider> providers)
    {
        _providers = providers;
    }

    public async Task<CitationCheckResponse> CheckAsync(BusinessSearchRequest request, CancellationToken cancellationToken)
    {
        var business = MapToBusiness(request);

        var tasks = _providers.Select(provider => ExecuteProviderSafelyAsync(provider, business, cancellationToken));
        var results = await Task.WhenAll(tasks);

        foreach (var result in results)
        {
            if (result.Status == CitationStatus.Found)
            {
                MatchScoreCalculator.ApplyMatchScore(business, result);
            }
        }

        return new CitationCheckResponse
        {
            CoverageScore = CalculateCoverageScore(results),
            ConsistencyScore = CalculateConsistencyScore(results),
            Results = results.Select(MapToDto).ToList()
        };
    }

    private static async Task<CitationResult> ExecuteProviderSafelyAsync(
        ICitationProvider provider, Business business, CancellationToken cancellationToken)
    {
        try
        {
            return await provider.CheckAsync(business, cancellationToken);
        }
        catch (Exception ex)
        {
            return new CitationResult
            {
                ProviderName = provider.Name,
                Status = CitationStatus.Unavailable,
                Notes = $"Provider threw an exception: {ex.Message}"
            };
        }
    }

    private static Business MapToBusiness(BusinessSearchRequest request) => new()
    {
        Name = request.BusinessName,
        Address = request.Address,
        PhoneNumber = request.PhoneNumber,
        Website = request.Website,
        Latitude = request.Latitude,
        Longitude = request.Longitude
    };

    private static int CalculateCoverageScore(IReadOnlyCollection<CitationResult> results)
    {
        if (results.Count == 0)
        {
            return 0;
        }

        var foundCount = results.Count(r => r.Status == CitationStatus.Found);
        return (int)Math.Round((double)foundCount / results.Count * 100);
    }

    private static int CalculateConsistencyScore(IReadOnlyCollection<CitationResult> results)
    {
        var foundResults = results.Where(r => r.Status == CitationStatus.Found).ToList();
        if (foundResults.Count == 0)
        {
            return 0;
        }

        var matchFlags = new List<bool>();
        foreach (var result in foundResults)
        {
            if (result.NameMatches.HasValue) matchFlags.Add(result.NameMatches.Value);
            if (result.AddressMatches.HasValue) matchFlags.Add(result.AddressMatches.Value);
            if (result.PhoneMatches.HasValue) matchFlags.Add(result.PhoneMatches.Value);
            if (result.WebsiteMatches.HasValue) matchFlags.Add(result.WebsiteMatches.Value);
        }

        if (matchFlags.Count == 0)
        {
            return 0;
        }

        var matchingCount = matchFlags.Count(f => f);
        return (int)Math.Round((double)matchingCount / matchFlags.Count * 100);
    }

    private static CitationResultDto MapToDto(CitationResult result) => new()
    {
        Provider = result.ProviderName,
        Status = result.Status.ToString(),
        MatchScore = result.MatchScore,
        NameMatches = result.NameMatches,
        AddressMatches = result.AddressMatches,
        PhoneMatches = result.PhoneMatches,
        WebsiteMatches = result.WebsiteMatches,
        Notes = result.Notes
    };
}