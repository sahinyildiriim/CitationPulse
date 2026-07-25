namespace CitationPulse.Domain.Entities;

using CitationPulse.Domain.Enums;

public class CitationResult
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ProviderName { get; set; } = string.Empty;
    public CitationStatus Status { get; set; }
    public int? MatchScore { get; set; }
    public bool? NameMatches { get; set; }
    public bool? AddressMatches { get; set; }
    public bool? PhoneMatches { get; set; }
    public bool? WebsiteMatches { get; set; }
    public double? DistanceInMeters { get; set; }
    public string? Notes { get; set; }
    public string? FoundName { get; set; }
    public string? FoundAddress { get; set; }
    public string? FoundPhoneNumber { get; set; }
    public string? FoundWebsite { get; set; }
    public double? FoundLatitude { get; set; }
    public double? FoundLongitude { get; set; }
}