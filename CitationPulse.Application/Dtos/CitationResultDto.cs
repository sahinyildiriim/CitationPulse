namespace CitationPulse.Application.Dtos;

public class CitationResultDto
{
    public string Provider { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int? MatchScore { get; set; }
    public bool? NameMatches { get; set; }
    public bool? AddressMatches { get; set; }
    public bool? PhoneMatches { get; set; }
    public bool? WebsiteMatches { get; set; }
}