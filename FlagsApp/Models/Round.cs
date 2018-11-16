using System;
using System.Collections.Generic;

namespace FlagsApp.Models
{
    public partial class Round
    {
        public Round()
        {
            Phase = new HashSet<Phase>();
            Test = new HashSet<Test>();
        }

        public long RoundId { get; set; }
        public long SessionId { get; set; }
        public string RoundName { get; set; }
        public long RoundNumber { get; set; }
        public string RoundType { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public long AnswerTime { get; set; }

        public Session Session { get; set; }
        public ICollection<Phase> Phase { get; set; }
        public ICollection<Test> Test { get; set; }
    }
}
