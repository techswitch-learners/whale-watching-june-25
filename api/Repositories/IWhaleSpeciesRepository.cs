using Microsoft.AspNetCore.DataProtection.Repositories;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Repositories
{
    public interface IWhaleSpeciesRepository
    {
        IEnumerable<WhaleSpecies> GetWhaleSpecies();
    }

    public class WhaleSpeciesRepository(WhaleSpottingDbContext context) : IWhaleSpeciesRepository
    {
        public WhaleSpottingDbContext context = context;

        public IEnumerable<WhaleSpecies> GetWhaleSpecies()
        {
            return context.WhaleSpecies.ToList();
        }
    };
}
