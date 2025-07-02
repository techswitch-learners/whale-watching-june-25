using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;
using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using WhaleSpottingBackend.Exceptions;

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

            return Ok(new { message = "Your sighting report has been successfully submitted and is pending review." });
        }

       // [Authorize(Roles = "Admin")]
        [HttpPatch("{id}")]
        public IActionResult ApproveSighting(int id)
        {
            try
            {
                _sightingReportsService.EditSightingReportStatus(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something went wrong!!! Please try again later" });
            }
            return Ok(new { message = "Sighting Report Approved" });

        }

       // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id) {

            try
            {
                _sightingReportsService.DeleteReport(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok(new { message = "Your report has been sucessfully rejected and deleted from the table." });
        }
    }
}