using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlagsApp.Models;
using FlagsApp.Models.Form;
using Microsoft.EntityFrameworkCore;

namespace FlagsApp.Services
{
    public class LogRepository
    {
        private readonly DataContext _context;
        public LogRepository(DataContext ctx) => _context = ctx;

        public Session NewSession(Session newSession) => _context.Session.Add(newSession).Entity;

        public Session GetSession(long id) => _context.Session.Find(id);

        public Round NewTest(TestForm value, Session session)
        {
            var tempRound = new Round
            {
                Session = session,
                StartTime = value.StartTime,
                AnswerTime = value.AnswerTime,
                EndTime = value.EndTime,
                RoundName = value.RoundName,
                RoundNumber = value.RoundNumber,
                RoundType = value.RoundType,
                SessionId = session.Id
            };

            var round = _context.Round.Add(tempRound).Entity;

            var tempTest = new Test
            {
                TestCorrectItems = value.TestCorrectItems,
                TestCorrectNumber = value.TestCorrectNumber,
                TestFailedItems = value.TestFailedItems,
                TestFailedNumber = value.TestFailedNumber,
                TestItems = value.TestItems,
                TestType = value.TestType,
                Round = round,
                RoundId = round.RoundId
            };

            return _context.Test.Add(tempTest).Entity.Round;
        }

        public Round NewRound(RoundForm value, Session session)
        {
            var tempRound = new Round
            {
                Session = session,
                StartTime = value.StartTime,
                AnswerTime = value.AnswerTime,
                EndTime = value.EndTime,
                RoundName = value.RoundName,
                RoundNumber = value.RoundNumber,
                RoundType = value.RoundType,
                SessionId = session.Id
            };

            var round = _context.Round.Add(tempRound).Entity;

            var list = new List<Phase>();
            Round result = null;
            foreach(var phase in value.Phases)
            {
                var tempPhase = new Phase
                {
                    Round = round,
                    StartTime = phase.StartTime,
                    AnswerTime = phase.AnswerTime,
                    EndTime = phase.EndTime,
                    RoundId = round.RoundId,
                    IsCorrect = phase.IsCorrect,
                    Item = phase.Item
                };

                result = _context.Phase.Add(tempPhase).Entity.Round;
            }

            return result;
        }

        public Session CompleteSession(Session session)
        {
            session.Completed = 1;
            session.EndTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            _context.Entry(session).State = EntityState.Modified;
            return session;
        }

        public IEnumerable<Session> GetSessions()
        {
            return _context.Session.ToList();
        }

        public void Save() => _context.SaveChanges();

        #region Dispose
        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
