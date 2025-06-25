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
            UserId = newReport.UserId, // Assuming you want to include the user ID in the report
            Status = "Pending",
            RejectedReason = null
        };
        _sightingReports.CreateReport(report);
    }

    public async Task<List<SightingReportResponse>> GetAllSightingsResponse()
    {
        var allSightings = await _sightingReports.GetAllSightings();
        var allSightingsResponse = new List<SightingReportResponse>();
        if (allSightings != null)
        {
            foreach (SightingReport sighting in allSightings)
            {
                var sightingResponse = new SightingReportResponse()
                {
                    Description = sighting.Description,
                    DateOfSighting = sighting.DateOfSighting,
                    Longitude = sighting.Longitude,
                    Latitude = sighting.Latitude,
                    SpeciesId = sighting.SpeciesId,
                    UserId = sighting.SpeciesId,
                    Status = sighting.Status
                };
                allSightingsResponse.Add(sightingResponse);

            }
        }
        else
        {
            return new List<SightingReportResponse>();
        }
        return allSightingsResponse;
    }

}