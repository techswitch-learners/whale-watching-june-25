namespace WhaleSpottingBackend.Models.Database;

public class SightingReport
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public required DateOnly DateOfSighting { get; set; }
    public required float Longitude { get; set; }
    public required float Latitude { get; set; }
    public int WhaleSpeciesId { get; set; }
    public WhaleSpecies? WhaleSpecies { get; set; }
    public required string UserId { get; set; }
    public User? User { get; set; }
    public string? ImageUrl { get; set; }
    public String? Status { get; set; }
    public String? RejectedReason { get; set; }
}