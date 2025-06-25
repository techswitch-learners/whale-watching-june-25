namespace WhaleSpottingBackend.Models.DatabaseModels;

public class UploadedImages
{
    public int Id { get; set; }
    public required string Public_Id { get; set; }
    public required string Image_URL { get; set; }

    //The idea is that will not be its own table but will ultimately be part of the whole report table.
}