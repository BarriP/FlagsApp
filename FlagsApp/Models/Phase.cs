using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FlagsApp.Models
{
    public partial class Phase
    {
        public long PhaseId { get; set; }
        public long RoundId { get; set; }
        public string Item { get; set; }
        public long IsCorrect { get; set; }
        public long StartTime { get; set; }
        public long AnswerTime { get; set; }
        public long EndTime { get; set; }

        [JsonIgnore]
        public Round Round { get; set; }
    }
}
