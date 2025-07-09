using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;
using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using WhaleSpottingBackend.Exceptions;
using WhaleSpottingBackend.Models.Database;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace WhaleSpottingBackend.Controllers
{
    [ApiController]
    [Route("/sightingreports")]
    public class SightingReportsController : ControllerBase
    {
        private readonly ISightingReportsService _sightingReportsService;
        private readonly UserManager<User> _userManager;

        public SightingReportsController(ISightingReportsService sightingReports, UserManager<User> userManager)
        {
            _sightingReportsService = sightingReports;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<SightingReportResponse>>> GetAllSightings()
        {
            var allSightings = await _sightingReportsService.GetAllSightingsResponse();
            return allSightings;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateSightingReportRequest newReport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return Unauthorized("User Id not found");
                }
                 _sightingReportsService.CreateReport(newReport, userId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok(new { message = "Your sighting report has been successfully submitted and is pending review." });
        }

        [HttpGet("my-sightings")]
        [Authorize]
        public async Task<ActionResult<List<SightingReport>>> GetMySightings()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized();
            }

            var userSightings = await _sightingReportsService.GetSightingsByUserId(userId);
            return Ok(userSightings);

        }

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
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