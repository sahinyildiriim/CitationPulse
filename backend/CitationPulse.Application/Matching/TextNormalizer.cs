using System.Globalization;
using System.Text;


namespace CitationPulse.Application.Matching
{
    public static class TextNormalizer
    {
        public static string Normalize(string? input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }

            var lowered = input.ToLower(new CultureInfo("tr-TR"));

            var replaced = lowered
                .Replace('ı', 'i')
                .Replace('ş', 's')
                .Replace('ğ', 'g')
                .Replace('ç', 'c')
                .Replace('ö', 'o')
                .Replace('ü', 'u');

            var builder = new StringBuilder();
            foreach (var ch in replaced)
            {
                if (char.IsLetterOrDigit(ch) || char.IsWhiteSpace(ch))
                {
                    builder.Append(ch);
                }
            }

            var cleaned = builder.ToString();

            while (cleaned.Contains("  "))
            {
                cleaned = cleaned.Replace("  ", " ");
            }

            return cleaned.Trim();
        }
    }
}
