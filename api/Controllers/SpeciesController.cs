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

    public async Task<ActionResult<IEnumerable<WhaleSpecies>>> GetWhales()
    {
        var result = await _whaleSpeciesRepository.GetWhaleSpecies();

        return Ok(result);
    }

    
    [HttpGet("by-name/{species}")]
    public async Task<ActionResult<WhaleSpecies>> GetWhalesBySpecies(string species)
    {
        var result = await _whaleSpeciesRepository.GetWhaleSpeciesByName(species);

        return Ok(result);
    }
}
