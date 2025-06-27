using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;


using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Globalization;

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

        [HttpPatch("{id}")]
        public IActionResult ApproveSighting(int id)
        {
            try
            {
                _sightingReports.EditSightingReport(id);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something went wrong!!! Please try again later" });
            }
            return Ok(new { message = "Sighting Report Approved" });

        }

    }
}