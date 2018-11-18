using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlagsApp.Models;
using FlagsApp.Models.Form;
using FlagsApp.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FlagsApp.Controllers
{
    [Route("api/[controller]")]
    public class FlagsController : Controller
    {
        private readonly LogRepository _logRepo;
        public FlagsController(LogRepository repo) => _logRepo = repo;

        #region Session

        [HttpPost("session/new")]
        public IActionResult NewSession([FromBody]SessionForm value)
        {
            var user = _logRepo.NewSession(new Session
            {
                Age = value.Age,
                User = value.User,
                StartTime = value.StartTime,
                Knowledge = value.Knowledge,
                UserId = value.UserId
            });
            _logRepo.Save();

            return Ok(user);
        }

        [HttpPost("session/end/{id}")]
        public IActionResult EndSession(int id)
        {
            return Ok();
        }

        #endregion

        #region Test

        [HttpPost("test/new")]
        public IActionResult NewTest([FromBody]TestForm value)
        {
            var session = _logRepo.GetSession(value.SessionId);
            var round = _logRepo.NewTest(value, session);
            _logRepo.Save();
            return Ok(round);
        }

        #endregion

        #region Round

        [HttpPost("round/new")]
        public IActionResult NewRound([FromBody]RoundForm value)
        {
            var session = _logRepo.GetSession(value.SessionId);
            var round = _logRepo.NewRound(value, session);
            _logRepo.Save();
            return Ok(round);
        }

        #endregion

        #region Stats

        [HttpGet("/stats")]
        public IEnumerable<string> Stats()
        {
            return new string[] { "value1", "value2" };
        }

        #endregion
    }
}
