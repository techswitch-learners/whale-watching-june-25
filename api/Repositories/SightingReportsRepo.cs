
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Exceptions;
using WhaleSpottingBackend.Models.Database;


namespace WhaleSpottingBackend.Repositories
{
    public interface ISightingReportsRepo
    {
        void CreateReport(SightingReport newReport);
        Task<List<SightingReport>> GetAllSightings();
        SightingReport GetSightingById(int sightingId);
        void UpdateSighting(SightingReport sightingData);
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

        public async Task<List<SightingReport>> GetAllSightings()
        {
            return await _context.SightingReports
                        .Include(s => s.User)
                        .Include(s => s.WhaleSpecies)
                        .ToListAsync();
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

        public void UpdateSighting(SightingReport sightingData)
        {
            _context.Update(sightingData);
            _context.SaveChanges();
        }

        public void DeleteReport(SightingReport report)
        {
            _context.SightingReports.Remove(report);
            _context.SaveChanges();
        }
    }
}