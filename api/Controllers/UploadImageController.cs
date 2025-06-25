using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.DatabaseModels;

namespace WhaleSpottingBackend.Controllers;

[ApiController]
[Route("[controller]")]

public class UploadImageController(WhaleSpottingDbContext context)  : ControllerBase
    {
    private readonly WhaleSpottingDbContext _context = context;


        [HttpPost("/store-image-url")]
        public async Task<IActionResult> StoreImageUrl([FromBody] UploadedImages image)
        {
            if (string.IsNullOrEmpty(image.Public_Id) || string.IsNullOrEmpty(image.Image_URL))
        {
            return BadRequest(new { error = "Missing public_id or image_url" });
        }
            _context.UploadedImages.Add(image);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Image stored: ", image });
        }
    }

