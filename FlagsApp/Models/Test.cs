using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FlagsApp.Models
{
    public partial class Test
    {
        public long TestId { get; set; }
        public long RoundId { get; set; }
        public string TestType { get; set; }
        public string TestItems { get; set; }
        public string TestCorrectItems { get; set; }
        public string TestFailedItems { get; set; }
        public long TestCorrectNumber { get; set; }
        public long TestFailedNumber { get; set; }

        [JsonIgnore]
        public Round Round { get; set; }
    }
}
