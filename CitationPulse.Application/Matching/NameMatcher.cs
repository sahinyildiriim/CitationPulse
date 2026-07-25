namespace CitationPulse.Application.Matching;

public static class NameMatcher
{
    public static double CalculateSimilarity(string? name1, string? name2)
    {
        var normalized1 = TextNormalizer.Normalize(name1);
        var normalized2 = TextNormalizer.Normalize(name2);

        if (normalized1.Length == 0 || normalized2.Length == 0)
        {
            return 0;
        }

        if (normalized1 == normalized2)
        {
            return 100;
        }

        var distance = LevenshteinDistance(normalized1, normalized2);
        var maxLength = Math.Max(normalized1.Length, normalized2.Length);
        var similarity = (1.0 - (double)distance / maxLength) * 100;

        return Math.Max(0, similarity);
    }

    private static int LevenshteinDistance(string source, string target)
    {
        var sourceLength = source.Length;
        var targetLength = target.Length;
        var distance = new int[sourceLength + 1, targetLength + 1];

        for (var i = 0; i <= sourceLength; i++) distance[i, 0] = i;
        for (var j = 0; j <= targetLength; j++) distance[0, j] = j;

        for (var i = 1; i <= sourceLength; i++)
        {
            for (var j = 1; j <= targetLength; j++)
            {
                var cost = source[i - 1] == target[j - 1] ? 0 : 1;
                distance[i, j] = Math.Min(
                    Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1),
                    distance[i - 1, j - 1] + cost);
            }
        }

        return distance[sourceLength, targetLength];
    }
}