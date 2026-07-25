namespace CitationPulse.Application.Dtos;

public class CitationCheckResponse
{
    public int CoverageScore { get; set; }
    public int ConsistencyScore { get; set; }
    public List<CitationResultDto> Results { get; set; } = new();
}