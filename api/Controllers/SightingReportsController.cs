using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WhaleSpottingBackend.Exceptions;

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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok(new { message = "Your sighting report has been sucessfully submitted and is pending review." });
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}")]
        public IActionResult ApproveSighting(int id)
        {
            try
            {
                _sightingReports.EditSightingReportStatus(id);
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

    }
}