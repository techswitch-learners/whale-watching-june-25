using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Services;

public interface ISightingReportsService
{
    void CreateReport(CreateSightingReportRequest newReport);
    void DeleteReport(int id);
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
            DateOfSighting = newReport.Date,
            Longitude = newReport.Longitude,
            Latitude = newReport.Latitude,
            SpeciesId = Convert.ToInt32(newReport.SpeciesId),
            UserId = newReport.UserId,
            ImageUrl = newReport.ImageUrl,
            Status = "Pending",
            RejectedReason = null
        };
        _sightingReports.CreateReport(report);
    }

    public void DeleteReport(int id)
    {
        var postToDelete = _sightingReports.GetSightingById(id);
        if (postToDelete.Status != null && postToDelete.Status.Equals("Pending", StringComparison.OrdinalIgnoreCase)) { 
        _sightingReports.DeleteReport(postToDelete);
        }
        else {
            throw new ArgumentException($"Sighting report with id {id} is already approved");
        }
    }


}