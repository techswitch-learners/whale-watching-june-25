using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;


using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Response;

namespace WhaleSpottingBackend.Controllers
{
    [ApiController]
    [Route("/sightingreports")]
    public class SightingReportsController : ControllerBase
    {
        private readonly ISightingReportsService _sightingReports;

        public SightingReportsController(ISightingReportsService sightingReports)
        {
            _sightingReports = sightingReports;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<SightingReportResponse>>> GetAllSightings()
        {
            var allSightings = await _sightingReports.GetAllSightingsResponse();
            if (allSightings.Count == 0) return NotFound(new { message = "No sightings found" });
            return allSightings;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateSightingReportRequest newReport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _sightingReports.CreateReport(newReport);
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }

            return Ok(new { message = "Your sighting report has been sucessfully submitted and is pending review." });
        }
    }
}