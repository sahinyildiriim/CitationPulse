using CitationPulse.Domain.Entities;

namespace CitationPulse.Application.Interfaces
{
    public interface ICitationProvider
    {
        string Name { get; }

        Task<CitationResult> CheckAsync(Business business, CancellationToken cancellationToken);
    }
}
