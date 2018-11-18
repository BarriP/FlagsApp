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
            //_logRepo.Save();

            return Ok(user);
        }

        #endregion

        #region Test

        [HttpPost("test/new")]
        public IActionResult NewTest([FromBody]TestForm value)
        {

            return Ok();
        }

        #endregion

        #region Round

        [HttpPost("round/new")]
        public IActionResult NewRound([FromBody]TestForm value)
        {

            return Ok();
        }

        #endregion

        #region Stats

        [HttpGet("/stats")]
        public IEnumerable<string> Stats()
        {
            return new string[] { "value1", "value2" };
        }

        #endregion

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
