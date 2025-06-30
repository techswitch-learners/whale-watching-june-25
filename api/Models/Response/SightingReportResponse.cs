
namespace WhaleSpottingBackend.Models.Response;

public class SightingReportResponse
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public required DateOnly DateOfSighting { get; set; }
    public required float Longitude { get; set; }
    public required float Latitude { get; set; }
    public int SpeciesId { get; set; }
    public string? UserName { get; set; }
    public String? Status { get; set; }

}
