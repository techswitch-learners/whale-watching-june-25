using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models
{
    [Table("whalespecies")]
    public class WhaleSpecies
    {
        [Column("id")]
        public int Id { get; set; }
        public required string? Species_Group { get; set; }

        public required string? Species { get; set; }

        public string? Latin_Name { get; set; }

        public string? Habitat { get; set; }

        public double Max_Length_Meters { get; set; }

        public double Max_Weight_Tons { get; set; }

        public string? Conservation_Status { get; set; }

        public int Max_Age { get; set; }

        public string? Food { get; set; }
    }
}
