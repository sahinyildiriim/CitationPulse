namespace CitationPulse.Application.Matching;

public static class PhoneMatcher
{
    public static bool IsMatch(string? phone1, string? phone2)
    {
        var normalized1 = Normalize(phone1);
        var normalized2 = Normalize(phone2);

        if (normalized1.Length == 0 || normalized2.Length == 0)
        {
            return false;
        }

        return normalized1 == normalized2;
    }

    private static string Normalize(string? phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
        {
            return string.Empty;
        }

        var digitsOnly = new string(phone.Where(char.IsDigit).ToArray());

        if (digitsOnly.StartsWith("90") && digitsOnly.Length > 10)
        {
            digitsOnly = digitsOnly.Substring(2);
        }

        if (digitsOnly.StartsWith("0") && digitsOnly.Length > 10)
        {
            digitsOnly = digitsOnly.Substring(1);
        }

        return digitsOnly;
    }
}