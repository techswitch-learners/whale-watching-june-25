using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Repositories
{
    public interface IWhaleSpeciesRepository
    {
        Task<IEnumerable<WhaleSpecies>> GetWhaleSpecies();
    }

    public class WhaleSpeciesRepository : IWhaleSpeciesRepository
    {
        private readonly WhaleSpottingDbContext _context;

        public WhaleSpeciesRepository(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WhaleSpecies>> GetWhaleSpecies()
        {
            return await _context.WhaleSpecies.ToListAsync();
        }
    };
}
