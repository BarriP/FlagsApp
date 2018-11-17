using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlagsApp.Models.Form
{
    public class SessionForm
    {
        public string User { get; set; }
        public long UserId { get; set; }
        public long Age { get; set; }
        public long Knowledge { get; set; }
        public long StartTime { get; set; }
    }
}
