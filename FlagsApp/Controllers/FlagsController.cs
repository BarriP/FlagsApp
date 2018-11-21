using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlagsApp.Models;
using FlagsApp.Models.Form;
using FlagsApp.Models.Stats;
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
            var session = _logRepo.GetSession(id);
            var modified = _logRepo.CompleteSession(session);
            _logRepo.Save();
            return Ok(modified);
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

        [HttpGet("stats")]
        public IActionResult SimpleStats()
        {
            return Ok(_logRepo.GetSessions());
        }

        [HttpGet("stats/all")]
        public IActionResult Stats()
        {
            return Ok(_logRepo.GetFullSessions());
        }

        [HttpGet("stats/{id}")]
        public IActionResult Stats(int id)
        {
            return Ok(_logRepo.GetFullSession(id));
        }

        [HttpGet("stats/score")]
        public IActionResult Score()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<ScoreData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new ScoreData();
                data.Id = id;
                foreach (var round in session.Round)
                {
                    if (round.RoundType.Equals("Test"))
                    {
                        var test = round.Test.First();
                        if (test.TestType.Equals("Pretest"))
                            data.Pretest = (int) test.TestCorrectNumber;
                        else
                            data.Posttest = (int)test.TestCorrectNumber;

                    }
                }
                id++;
                result.Add(data);
            }

            return Ok(result);
        }

        [HttpGet("stats/score/csv")]
        [Produces("text/plain")]
        public IActionResult ScoreCsv()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<ScoreData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new ScoreData();
                data.Id = id;
                foreach (var round in session.Round)
                {
                    if (round.RoundType.Equals("Test"))
                    {
                        var test = round.Test.First();
                        if (test.TestType.Equals("Pretest"))
                            data.Pretest = (int)test.TestCorrectNumber;
                        else
                            data.Posttest = (int)test.TestCorrectNumber;

                    }
                }
                id++;
                result.Add(data);
            }

            var file = new StringBuilder();
            file.Append("id,pretest,posttest\n");
            foreach (var scoreData in result)
            {
                file.Append(scoreData.Id + "," + scoreData.Pretest + "," + scoreData.Posttest + "\n");
            }

            return Ok(file.ToString());
        }

        [HttpGet("stats/training")]
        public IActionResult Training()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<TrainingData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new TrainingData {Id = id};
                foreach (var round in session.Round)
                {
                    if(!round.RoundType.Equals("Test"))
                        data.AddRonda((int)(round.EndTime - round.StartTime));
                }
                result.Add(data);
                id++;
            }

            return Ok(result);
        }

        [HttpGet("stats/training/csv")]
        [Produces("text/plain")]
        public IActionResult TrainingCsv()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<TrainingData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new TrainingData {Id = id};
                foreach (var round in session.Round)
                {
                    if(!round.RoundType.Equals("Test"))
                        data.AddRonda((int)(round.EndTime - round.StartTime));
                }
                result.Add(data);
                id++;
            }

            var sb = new StringBuilder();
            sb.Append("id,Ronda1,Ronda2,Ronda3,Ronda4,Ronda5,Ronda6,Ronda7,Ronda8\n");

            foreach (var trainingData in result)
            {
                sb.Append(trainingData.Id + "," + string.Join(",", trainingData.Rondas) + "\n");
            }

            return Ok(sb.ToString());
        }

        [HttpGet("stats/review")]
        public IActionResult Review()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<TimeScoreData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new TimeScoreData { Id = id };
                var time = 0;
                var score = 0;
                foreach (var round in session.Round)
                {
                    if (round.RoundType.Equals("Test"))
                    {
                        var test = round.Test.First();
                        score = (int) test.TestCorrectNumber;
                        time += (int) (round.EndTime - round.AnswerTime);
                    }
                    else
                    {
                        foreach (var phase in round.Phase)
                        {
                            time += (int)(phase.EndTime - phase.AnswerTime);
                        }
                        time += (int)(round.EndTime - round.AnswerTime);
                    }
                }

                data.Puntuacion = score;
                data.Tiempo = time;
                result.Add(data);
                id++;
            }

            return Ok(result);
        }

        [HttpGet("stats/review/csv")]
        [Produces("text/plain")]
        public IActionResult ReviewCsv()
        {
            var completed = _logRepo.GetCompletedSessions();
            var result = new List<TimeScoreData>();
            int id = 1;
            foreach (var session in completed)
            {
                var data = new TimeScoreData { Id = id };
                var time = 0;
                var score = 0;
                foreach (var round in session.Round)
                {
                    if (round.RoundType.Equals("Test"))
                    {
                        var test = round.Test.First();
                        score = (int)test.TestCorrectNumber;
                        time += (int)(round.EndTime - round.AnswerTime);
                    }
                    else
                    {
                        foreach (var phase in round.Phase)
                        {
                            time += (int)(phase.EndTime - phase.AnswerTime);
                        }
                        time += (int)(round.EndTime - round.AnswerTime);
                    }
                }

                data.Puntuacion = score;
                data.Tiempo = time;
                result.Add(data);
                id++;
            }

            var sb = new StringBuilder();
            sb.Append("id,puntuacion,tiempo\n");

            foreach (var timeScoreData in result)
            {
                sb.Append(timeScoreData.Id + "," + timeScoreData.Puntuacion + "," + timeScoreData.Tiempo + "\n");
            }

            return Ok(sb.ToString());
        }
        #endregion
    }
}
