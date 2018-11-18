using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlagsApp.Models.Form
{
    public class TestForm
    {
        public long SessionId { get; set; }
        public string RoundName { get; set; }
        public long RoundNumber { get; set; }
        public string RoundType { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public long AnswerTime { get; set; }

        public string TestType { get; set; }
        public string TestItems { get; set; }
        public string TestCorrectItems { get; set; }
        public string TestFailedItems { get; set; }
        public long TestCorrectNumber { get; set; }
        public long TestFailedNumber { get; set; }
    }
}
