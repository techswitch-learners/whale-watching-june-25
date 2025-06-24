using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models.DatabaseModels;

public class SightingReport
{
    public int Id { get; set; }
    //[Column("ExampleColumn")]
    public string? Description { get; set; }

    public required DateOnly DateOfSighting { get; set; }
    public required string? Location { get; set; }
    public int SpeciesId { get; set; }

    public String? Status { get; set; }

    public String? RejectedReason { get; set; }
}