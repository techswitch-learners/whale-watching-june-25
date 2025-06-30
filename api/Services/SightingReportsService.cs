using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport);
    void EditSightingReportStatus(int sightingId);
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

    public void EditSightingReportStatus(int sightingId)
    {
        SightingReport sightingData = _sightingReports.GetSightingById(sightingId);
        if (sightingData.Status != null && sightingData.Status.Equals("Approved", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException($"Sighting report with id {sightingId} is already approved");
        }
        sightingData.Status = "Approved";
        _sightingReports.UpdateSighting(sightingData);
    }

}