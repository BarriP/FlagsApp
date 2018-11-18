using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FlagsApp.Models
{
    public partial class Session
    {
        public Session()
        {
            Round = new HashSet<Round>();
        }

        public long Id { get; set; }
        public string User { get; set; }
        public long UserId { get; set; }
        public long Age { get; set; }
        public long Knowledge { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public long Completed { get; set; }

        [JsonIgnore]
        public ICollection<Round> Round { get; set; }
    }
}
