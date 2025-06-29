using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models;
using WhaleSpottingBackend.Repositories;

namespace WhaleSpottingBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class SpeciesController : ControllerBase
{
    private readonly IWhaleSpeciesRepository _whaleSpeciesRepository;

    public SpeciesController(IWhaleSpeciesRepository whaleSpeciesRepository)
    {
        _whaleSpeciesRepository = whaleSpeciesRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WhaleSpecies>>> GetWhales()
    {
        var result = await _whaleSpeciesRepository.GetWhaleSpecies();

        return Ok(result);
    }
}
