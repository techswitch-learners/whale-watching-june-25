using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Repositories
{
    public interface IWhaleSpeciesRepository
    {
        Task<IEnumerable<WhaleSpecies>> GetWhaleSpecies();
        // WhaleSpecies GetWhaleSpeciesByName(string newSpecies);
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

        // public WhaleSpecies GetWhaleSpeciesByName(string newSpecies)
        // {
        //     var whaleReport = _context.WhaleSpecies
        //                             .FirstOrDefault(whale => whale.Species == newSpecies);
        //     if (whaleReport == null)
        //     {
        //         throw new Exceptions.NotFoundException($"Sighting report with name {newSpecies} not found");
        //     }
        //     return whaleReport;
        // }
    };
}
