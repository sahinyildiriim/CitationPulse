namespace CitationPulse.Application.Matching;

public static class AddressMatcher
{
    private static readonly Dictionary<string, string> Abbreviations = new()
    {
        { "cad", "caddesi" },
        { "sok", "sokak" },
        { "mah", "mahallesi" },
        { "blv", "bulvari" },
        { "apt", "apartmani" }
    };

    public static double CalculateSimilarity(string? address1, string? address2)
    {
        var expanded1 = ExpandAbbreviations(address1);
        var expanded2 = ExpandAbbreviations(address2);

        return NameMatcher.CalculateSimilarity(expanded1, expanded2);
    }

    private static string ExpandAbbreviations(string? address)
    {
        var normalized = TextNormalizer.Normalize(address);

        if (normalized.Length == 0)
        {
            return string.Empty;
        }

        var words = normalized.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var expandedWords = words.Select(word =>
            Abbreviations.TryGetValue(word, out var fullForm) ? fullForm : word);

        return string.Join(' ', expandedWords);
    }
}