using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlagsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FlagsApp.Services
{
    public class LogRepository
    {
        private readonly DataContext _context;
        public LogRepository(DataContext ctx) => _context = ctx;

        /*
        public IEnumerable<Bar> GetBares() => _context.Bar.Include(u => u.Tapa).ToList();

        public Bar GetBar(int id) => _context.Bar.Include(u => u.Tapa).FirstOrDefault(
            b => b.Id == id);

        public Bar NewBar(Bar newBar) => _context.Bar.Add(newBar).Entity;

        public Bar ModifyBar(Bar modifiedBar)
        {
            _context.Entry(modifiedBar).State = EntityState.Modified;
            return modifiedBar;
        }

        public bool DeleteBar(int barId)
        {
            var bar = GetBar(barId);
            if (bar == null)
                return false;
            _context.Bar.Remove(bar);
            return true;
        }
        */

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
