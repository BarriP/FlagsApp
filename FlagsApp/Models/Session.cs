using System;
using System.Collections.Generic;

namespace FlagsApp.Models
{
    public partial class Session
    {
        public Session()
        {
            Answers = new HashSet<Answers>();
        }

        public long Id { get; set; }
        public string User { get; set; }
        public long Userid { get; set; }
        public long Age { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }

        public ICollection<Answers> Answers { get; set; }
    }
}
