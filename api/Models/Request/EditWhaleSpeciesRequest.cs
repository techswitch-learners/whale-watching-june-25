using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpottingBackend.Models.Request;
public class EditWhaleSpeciesRequest
{
    public int WhaleSpeciesId { get; set; }
}
