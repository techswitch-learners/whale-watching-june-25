using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models;
using WhaleSpottingBackend.Repositories;

namespace WhaleSpottingBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class SpeciesController : ControllerBase
{
    private readonly IWhaleSpeciesRepository _whalespeciesrepository;

    public SpeciesController(IWhaleSpeciesRepository whalespeciesrepository)
    {
        _whalespeciesrepository = whalespeciesrepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WhaleSpecies>>> GetWhales()
    {
        var result = await _whalespeciesrepository.GetWhaleSpecies();

        return Ok(result);
    }
}
