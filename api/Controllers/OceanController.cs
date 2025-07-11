using Microsoft.AspNetCore.Mvc;

namespace WhaleSpottingBackend.Controllers;

[ApiController]
[Route("/ocean")]
public class OceanController : ControllerBase
{ 
    private readonly HttpClient _httpClient;
    private IConfiguration _configuration;

    public OceanController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClient = httpClientFactory.CreateClient();
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetOcean(double lat, double lng)
    {
        var username = _configuration["GeonamesUsername"];
        var url = $"http://api.geonames.org/oceanJSON?lat={lat}&lng={lng}&username={username}";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "GeoNames API error");
        }

        var content = await response.Content.ReadAsStringAsync();
        return Content(content, "application/json");
    }
}