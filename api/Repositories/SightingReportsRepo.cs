
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;

namespace WhaleSpottingBackend.Repositories
{
    public interface ISightingReportsRepo
    {
        void CreateReport(SightingReport newReport);
        SightingReport GetSightingById(int sightingId);
        void UpdateSighting(SightingReport sightingData);
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
                throw new ArgumentException($"No sighting report with id {sightingId}");
            }
            return sightingReport;
        }

        public void UpdateSighting(SightingReport sightingData)
        {
            _context.Update(sightingData);
            _context.SaveChanges();
        }
    }
}