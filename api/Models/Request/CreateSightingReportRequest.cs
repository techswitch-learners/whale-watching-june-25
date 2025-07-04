namespace WhaleSpottingBackend.Models.Request;

public class CreateSightingReportRequest
{
    public required DateOnly Date { get; set; }
    public required float Latitude { get; set; }
    public required float Longitude { get; set; }
    public string? Description { get; set; }
    public int WhaleSpeciesId { get; set; }
    public string? ImageUrl { get; set; }
    public string? UserId { get; set; }
}


