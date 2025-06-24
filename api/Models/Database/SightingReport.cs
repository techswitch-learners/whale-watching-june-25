using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models.Database;

public class SightingReport
{
    public int Id { get; set; }
    //[Column("ExampleColumn")]
    public string? Description { get; set; }

    public required DateOnly DateOfSighting { get; set; }
    public required float Longitude {get; set; }
    public required float Latitude  {get; set; }
    public int SpeciesId { get; set; }

    public String? Status { get; set; }

    public String? RejectedReason { get; set; }
}