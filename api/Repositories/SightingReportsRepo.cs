
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;


namespace WhaleSpottingBackend.Repositories
{
    public interface ISightingReportsRepo
    {
        void CreateReport(SightingReport newReport);
        Task<List<SightingReport>>? GetAllSightings();
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

        public async Task<List<SightingReport>>? GetAllSightings()
        {
            return await _context.SightingReports
                        .Include(s => s.User)
                        .ToListAsync();
        }
    }
}