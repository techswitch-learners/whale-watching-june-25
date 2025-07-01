using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;
using WhaleSpottingBackend.Exceptions;



using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

            return Ok(new { message = "Your sighting report has been successfully submitted and is pending review." });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id) {

            try
            {
                _sightingReports.DeleteReport(id);
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