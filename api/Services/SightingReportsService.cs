using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;
using WhaleSpottingBackend.Models.Response;

namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport);
    Task<List<SightingReportResponse>> GetAllSightingsResponse();
}

public class SightingReportsService : ISightingReportsService
{
    private readonly ISightingReportsRepo _sightingReports;

    public SightingReportsService(ISightingReportsRepo sightingReports)
    {
        _sightingReports = sightingReports;
    }

    public void CreateReport(CreateSightingReportRequest newReport)
    {
        SightingReport report = new SightingReport
        {
            Description = newReport.Description,
            DateOfSighting = newReport.DateOfSighting,
            Longitude = newReport.Longitude,
            Latitude = newReport.Latitude,
            SpeciesId = newReport.SpeciesId,
            UserId = newReport.UserId,
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
            SpeciesId = sighting.SpeciesId,
            UserName = sighting.User?.UserName,
            Status = sighting.Status
        }).ToList();
    }

}