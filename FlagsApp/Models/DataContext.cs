using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FlagsApp.Models
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<Answers> Answers { get; set; }
        public virtual DbSet<Session> Session { get; set; }

        public DataContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answers>(entity =>
            {
                entity.HasKey(e => new { e.SessionId, e.QuestionNumber });

                entity.ToTable("ANSWERS");

                entity.Property(e => e.SessionId).HasColumnName("SESSIONID");

                entity.Property(e => e.QuestionNumber).HasColumnName("QUESTION_NUMBER");

                entity.Property(e => e.EndTime).HasColumnName("END_TIME");

                entity.Property(e => e.QuestionItem)
                    .IsRequired()
                    .HasColumnName("QUESTION_ITEM");

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasColumnName("RESULT");

                entity.Property(e => e.StartTime).HasColumnName("START_TIME");

                entity.HasOne(d => d.Session)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.SessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("SESSION");

                entity.HasIndex(e => e.Id)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID");

                entity.Property(e => e.Age).HasColumnName("AGE");

                entity.Property(e => e.EndTime).HasColumnName("END_TIME");

                entity.Property(e => e.StartTime).HasColumnName("START_TIME");

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasColumnName("USER");

                entity.Property(e => e.Userid).HasColumnName("USERID");
            });
        }
    }
}
