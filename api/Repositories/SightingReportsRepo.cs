
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;

namespace WhaleSpottingBackend.Repositories
{
    public interface ISightingReportsRepo
    {
        void CreateReport(SightingReport newReport);

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
    }
}