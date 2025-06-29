using System.Globalization;
using CsvHelper;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Helpers
{
    public class WhaleSpeciesReader
    {
        public static IEnumerable<WhaleSpecies> ReadWhalesFromCsv(string filePath)
        {
            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            csv.Read();
            csv.ReadHeader();

            while (csv.Read())
            {
                var Species_Group = csv.GetField<string>("Species_Group");
                var Species = csv.GetField<string>("Species");
                var Latin_Name = csv.GetField<string>("Latin_Name");
                var Habitat = csv.GetField<string>("Habitat");
                var Max_Length_Meters = csv.GetField<double>("Max_Length_Meters");
                var Max_Weight_Tons = csv.GetField<double>("Max_Weight_Tons");
                var Conservation_Status = csv.GetField<string>("Conservation_Status");
                var Max_Age = csv.GetField<int>("Max_Age");
                var Food = csv.GetField<string>("Food");

                yield return new WhaleSpecies
                {
                    SpeciesGroup = Species_Group,
                    Species = Species,
                    LatinName = Latin_Name,
                    Habitat = Habitat,
                    MaxLengthMeters = Max_Length_Meters,
                    MaxWeightTons = Max_Weight_Tons,
                    ConservationStatus = Conservation_Status,
                    MaxAge = Max_Age,
                    Food = Food,
                };
            }
        }
    }
}
