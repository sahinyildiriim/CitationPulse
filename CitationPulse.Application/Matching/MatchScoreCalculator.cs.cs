using CitationPulse.Domain.Entities;

namespace CitationPulse.Application.Matching;

public static class MatchScoreCalculator
{
    private const double NameWeight = 0.40;
    private const double AddressWeight = 0.25;
    private const double PhoneWeight = 0.20;
    private const double LocationWeight = 0.10;
    private const double WebsiteWeight = 0.05;
    private const double SimilarityMatchThreshold = 80;
    private const double MaxAcceptableDistanceInMeters = 500;

    public static void ApplyMatchScore(Business business, CitationResult result)
    {
        var nameSimilarity = NameMatcher.CalculateSimilarity(business.Name, result.FoundName);
        var addressSimilarity = AddressMatcher.CalculateSimilarity(business.Address, result.FoundAddress);
        var phoneMatch = PhoneMatcher.IsMatch(business.PhoneNumber, result.FoundPhoneNumber);
        var websiteSimilarity = NameMatcher.CalculateSimilarity(business.Website, result.FoundWebsite);

        var distance = DistanceCalculator.CalculateDistanceInMeters(
            business.Latitude, business.Longitude, result.FoundLatitude, result.FoundLongitude);

        var locationScore = CalculateLocationScore(distance);
        var phoneScore = phoneMatch ? 100 : 0;

        var weightedScore =
            nameSimilarity * NameWeight +
            addressSimilarity * AddressWeight +
            phoneScore * PhoneWeight +
            locationScore * LocationWeight +
            websiteSimilarity * WebsiteWeight;

        result.MatchScore = (int)Math.Round(weightedScore);
        result.NameMatches = nameSimilarity >= SimilarityMatchThreshold;
        result.AddressMatches = addressSimilarity >= SimilarityMatchThreshold;
        result.PhoneMatches = phoneMatch;
        result.WebsiteMatches = websiteSimilarity >= SimilarityMatchThreshold;
        result.DistanceInMeters = distance;
    }

    private static double CalculateLocationScore(double? distanceInMeters)
    {
        if (distanceInMeters is null)
        {
            return 0;
        }

        var score = 100 - (distanceInMeters.Value / MaxAcceptableDistanceInMeters * 100);
        return Math.Clamp(score, 0, 100);
    }
}