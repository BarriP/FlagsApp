using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlagsApp.Models.Stats
{
    public class TrainingData
    {
        public int Id { get; set; }
        public IList<int> Rondas { get; }

        public TrainingData()
        {
            Rondas = new List<int>();
        }

        public void AddRonda(int r)
        {
            Rondas.Add(r);
        }
    }
}