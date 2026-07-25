using CitationPulse.Application.Interfaces;
using CitationPulse.Domain.Entities;
using CitationPulse.Domain.Enums;

namespace CitationPulse.Infrastructure.Providers;

public class MockCitationProvider : ICitationProvider
{
    public string Name { get; }

    public MockCitationProvider(string name)
    {
        Name = name;
    }

    public Task<CitationResult> CheckAsync(Business business, CancellationToken cancellationToken)
    {
        var result = new CitationResult
        {
            ProviderName = Name,
            Status = CitationStatus.NotConfigured,
            Notes = $"{Name} does not expose a public API for this case study; would require partner access or manual verification."
        };

        return Task.FromResult(result);
    }
}