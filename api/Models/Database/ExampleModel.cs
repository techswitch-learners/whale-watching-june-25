using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpottingBackend.Models.DatabaseModels;

public class ExampleModel
{
    public int Id { get; set; }
    [Column("ExampleColumn")]
    public string? ExampleField { get; set; }
}