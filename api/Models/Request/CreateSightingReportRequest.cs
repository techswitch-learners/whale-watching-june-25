
namespace WhaleSpottingBackend.Models.Request;

public class CreateSightingReportRequest
{
    public string? Description { get; set; }
    public required DateOnly DateOfSighting { get; set; }
    public required float Longitude { get; set; }
    public required float Latitude { get; set; }
    public int SpeciesId { get; set; }
    public int UserId { get; set; } // Assuming you want to include the user ID in the request
}

