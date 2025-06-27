using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport);
    void EditSightingReport(int sightingId);
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

    public void EditSightingReport(int sightingId)
    {
        SightingReport sightingData = _sightingReports.GetSightingById(sightingId);
        if (sightingData.Status != null && sightingData.Status.Equals("Approved", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException($"No pending sighting report with id {sightingId}");
        }
        sightingData.Status = "Approved";
        _sightingReports.UpdateSighting(sightingData);
    }

}