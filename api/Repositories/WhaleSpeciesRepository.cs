using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Repositories
{
    public interface IWhaleSpeciesRepository
    {
        Task<IEnumerable<WhaleSpecies>> GetWhaleSpecies();
        WhaleSpecies GetWhaleSpeciesById(int newSpeciesId);
        Task<WhaleSpecies> GetWhaleSpeciesByName(string speciesName);

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

        public WhaleSpecies GetWhaleSpeciesById(int newSpeciesId)
        {
            var whale = _context.WhaleSpecies
                                    .FirstOrDefault(whale => whale.Id == newSpeciesId);
            if (whale == null)
            {
                throw new Exceptions.NotFoundException($"Whale with {newSpeciesId} id not found");
            }
            return whale;
        }

        public async Task<WhaleSpecies> GetWhaleSpeciesByName(string speciesName)
        {
            var whale = await _context.WhaleSpecies
                                    .FirstOrDefaultAsync(whale => whale.Species == speciesName);
            if (whale == null)
            {
                throw new Exceptions.NotFoundException($"Whale with {speciesName} speciesName not found");
            }
            return whale;
        }
    };
}
