
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Exceptions;

namespace WhaleSpottingBackend.Repositories
{
    public interface ISightingReportsRepo
    {
        void CreateReport(SightingReport newReport);
        SightingReport GetSightingById(int sightingId);
        void DeleteReport(SightingReport report);

    }

    public class SightingReportsRepo : ISightingReportsRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingReportsRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }


        public void CreateReport(SightingReport newReport)
        {
            _context.SightingReports.Add(newReport);
            _context.SaveChanges();
        }

        public SightingReport GetSightingById(int sightingId)
        {
            var sightingReport = _context.SightingReports
                                    .FirstOrDefault(sighting => sighting.Id == sightingId);
            if (sightingReport == null)
            {
                throw new NotFoundException($"Sighting report with id {sightingId} not found");
            }
            return sightingReport;
        }

        public void DeleteReport(SightingReport report)
        {
            _context.SightingReports.Remove(report);
            _context.SaveChanges();
        }
    }
}