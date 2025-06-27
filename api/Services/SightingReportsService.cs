using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport);
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
            Description = newReport.description,
            DateOfSighting = newReport.date,
            Longitude = newReport.longitude,
            Latitude = newReport.latitude,
            SpeciesId = Convert.ToInt32(newReport.speciesId),
            UserId = newReport.userId,
            ImageUrl = newReport.imageUrl,
            Status = "Pending",
            RejectedReason = null
        };
        _sightingReports.CreateReport(report);
    }

}