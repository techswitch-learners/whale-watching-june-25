using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models
{
    [Table("WhaleSpecies")]
    public class WhaleSpecies
    {
        [Column("Id")]
        public int Id { get; set; }
        public required string? SpeciesGroup { get; set; }

        public required string? Species { get; set; }

        public string? LatinName { get; set; }

        public string? Habitat { get; set; }

        public double MaxLengthMeters { get; set; }

        public double MaxWeightTons { get; set; }

        public string? ConservationStatus { get; set; }

        public int MaxAge { get; set; }

        public string? Food { get; set; }
    }
}
