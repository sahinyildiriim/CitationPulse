using CitationPulse.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitationPulse.Infrastructure.Persistence;

public class CitationPulseDbContext : DbContext
{
    public CitationPulseDbContext(DbContextOptions<CitationPulseDbContext> options) : base(options)
    {
    }

    public DbSet<CitationCheck> CitationChecks => Set<CitationCheck>();
    public DbSet<Business> Businesses => Set<Business>();
    public DbSet<CitationResult> CitationResults => Set<CitationResult>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CitationCheck>()
            .HasOne(check => check.Business)
            .WithMany()
            .HasForeignKey(check => check.BusinessId);

        modelBuilder.Entity<CitationCheck>()
            .HasMany(check => check.Results)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }
}