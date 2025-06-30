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
        private readonly ISightingReportsService _sightingReportsService;

        public SightingReportsController(ISightingReportsService sightingReports)
        {
            _sightingReportsService = sightingReports;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<SightingReportResponse>>> GetAllSightings()
        {
            var allSightings = await _sightingReportsService.GetAllSightingsResponse();
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
                _sightingReportsService.CreateReport(newReport);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok(new { message = "Your sighting report has been sucessfully submitted and is pending review." });
        }
    }
}