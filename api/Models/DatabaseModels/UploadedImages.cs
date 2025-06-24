using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models.DatabaseModels;

public class UploadedImages
{
    public int Id { get; set; }
    public required string Public_Id { get; set; }
    public required string Image_URL { get; set; }
}