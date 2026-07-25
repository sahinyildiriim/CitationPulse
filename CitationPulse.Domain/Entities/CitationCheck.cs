namespace CitationPulse.Domain.Entities;

public class CitationCheck
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public Guid BusinessId { get; set; }
    public Business Business { get; set; } = null!;
    public int CoverageScore { get; set; }
    public int ConsistencyScore { get; set; }
    public List<CitationResult> Results { get; set; } = new();
}