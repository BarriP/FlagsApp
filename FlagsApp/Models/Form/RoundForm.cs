using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlagsApp.Models.Form
{
    public class RoundForm
    {
        public long SessionId { get; set; }
        public string RoundName { get; set; }
        public long RoundNumber { get; set; }
        public string RoundType { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public long AnswerTime { get; set; }
    }
}
