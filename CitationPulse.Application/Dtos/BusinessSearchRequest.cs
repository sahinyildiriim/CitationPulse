
namespace CitationPulse.Application.Dtos
{
    public class BusinessSearchRequest
    {
        public string BusinessName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Website { get; set; }    
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }



    }
}
