namespace CitationPulse.Domain.Entities
{

    public class Business
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string? Adress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Website { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }



    }
}
