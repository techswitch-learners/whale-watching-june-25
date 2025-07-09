using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;
using WhaleSpottingBackend.Models.Response;
using WhaleSpottingBackend.Models;


namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport, string userId);
    Task<List<SightingReportResponse>> GetAllSightingsResponse();
    void EditSightingReportStatus(int sightingId);
    void DeleteReport(int id);
    void EditSpecies(int id);
}

    public class SightingReportsService : ISightingReportsService
{
    private readonly ISightingReportsRepo _sightingReports;
    // private readonly IWhaleSpeciesRepository _whaleReports;

    public SightingReportsService(ISightingReportsRepo sightingReports)
    {
        _sightingReports = sightingReports;
        // _whaleReports = whaleReports;
    }

    public void CreateReport(CreateSightingReportRequest newReport, string userId)
    {
        SightingReport report = new SightingReport
        {
            Description = newReport.Description,
            DateOfSighting = newReport.Date,
            Longitude = newReport.Longitude,
            Latitude = newReport.Latitude,
            WhaleSpeciesId = Convert.ToInt32(newReport.WhaleSpeciesId),
            UserId = userId,
            ImageUrl = newReport.ImageUrl,
            Status = "Pending",
            RejectedReason = null
        };
        _sightingReports.CreateReport(report);
    }

    public async Task<List<SightingReportResponse>> GetAllSightingsResponse()
    {
        var allSightings = await _sightingReports.GetAllSightings();
        return allSightings.Select(sighting => new SightingReportResponse
        {
            Id = sighting.Id,
            Description = sighting.Description,
            DateOfSighting = sighting.DateOfSighting,
            Longitude = sighting.Longitude,
            Latitude = sighting.Latitude,
            Species = sighting.WhaleSpecies?.Species,
            UserName = sighting.User?.UserName,
            ImageUrl = sighting.ImageUrl,
            Status = sighting.Status
        }).ToList();
    }
    
    public void EditSightingReportStatus(int sightingId)
    {
        SightingReport sightingData = _sightingReports.GetSightingById(sightingId);
        sightingData.Status = "Approved";
        _sightingReports.UpdateSighting(sightingData);
    }

    public void DeleteReport(int id)
    {
        var postToDelete = _sightingReports.GetSightingById(id);
        if (postToDelete.Status != null && postToDelete.Status.Equals("Pending", StringComparison.OrdinalIgnoreCase))
        {
            _sightingReports.DeleteReport(postToDelete);
        }
        else
        {
            throw new ArgumentException($"Sighting {id} has already been approved");
        }
    }

        public void EditSpecies(int id)

        
    {
        SightingReport sightingData = _sightingReports.GetSightingById(id);
       // WhaleSpecies whale = _whaleReports.GetWhaleSpeciesByName(newSpecies);
        sightingData.WhaleSpeciesId = newSpeciesId;
        _sightingReports.UpdateSighting(sightingData);
    }


}