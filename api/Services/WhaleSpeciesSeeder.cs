using System.Globalization;
using CsvHelper;
using WhaleSpottingBackend.Models;

namespace WhaleSpottingBackend.Services
{
    public class WhaleSpeciesSeeder
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
                    Species_Group = Species_Group,
                    Species = Species,
                    Latin_Name = Latin_Name,
                    Habitat = Habitat,
                    Max_Length_Meters = Max_Length_Meters,
                    Max_Weight_Tons = Max_Weight_Tons,
                    Conservation_Status = Conservation_Status,
                    Max_Age = Max_Age,
                    Food = Food,
                };
            }
        }
    }
}
