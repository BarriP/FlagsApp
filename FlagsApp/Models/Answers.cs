using System;
using System.Collections.Generic;

namespace FlagsApp.Models
{
    public partial class Answers
    {
        public long SessionId { get; set; }
        public long QuestionNumber { get; set; }
        public string QuestionItem { get; set; }
        public string Result { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }

        public Session Session { get; set; }
    }
}
