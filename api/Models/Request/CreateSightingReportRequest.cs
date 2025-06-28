
// namespace WhaleSpottingBackend.Models.Request;

// public class CreateSightingReportRequest
// {
    
//     public required DateOnly DateOfSighting { get; set; }
//     public required float Longitude { get; set; }
//     public required float Latitude { get; set; }
//     public string? Description { get; set; }
//     public int SpeciesId { get; set; }
//     public string? ImageUrl { get; set; }
//     public int UserId { get; set; }
// }

namespace WhaleSpottingBackend.Models.Request;

public class CreateSightingReportRequest
{
    
    
    public required DateOnly date { get; set; }
    public required float latitude { get; set; }
    public required float longitude { get; set; }
     //public required float location { get; set; }

    public string? description { get; set; }
    public string? speciesId { get; set; }
    public string? imageUrl { get; set; }
    public int userId { get; set; }
}


