namespace CitationPulse.Application.Matching;

public static class DistanceCalculator
{
    private const double EarthRadiusMeters = 6371000;

    public static double? CalculateDistanceInMeters(double? lat1, double? lon1, double? lat2, double? lon2)
    {
        if (lat1 is null || lon1 is null || lat2 is null || lon2 is null)
        {
            return null;
        }

        var deltaLatitude = ToRadians(lat2.Value - lat1.Value);
        var deltaLongitude = ToRadians(lon2.Value - lon1.Value);

        var a = Math.Sin(deltaLatitude / 2) * Math.Sin(deltaLatitude / 2) +
                Math.Cos(ToRadians(lat1.Value)) * Math.Cos(ToRadians(lat2.Value)) *
                Math.Sin(deltaLongitude / 2) * Math.Sin(deltaLongitude / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return EarthRadiusMeters * c;
    }

    private static double ToRadians(double degrees) => degrees * Math.PI / 180;
}