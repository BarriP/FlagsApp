using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FlagsApp.Models
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public virtual DbSet<Phase> Phase { get; set; }
        public virtual DbSet<Round> Round { get; set; }
        public virtual DbSet<Session> Session { get; set; }
        public virtual DbSet<Test> Test { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Phase>(entity =>
            {
                entity.ToTable("PHASE");

                entity.Property(e => e.PhaseId)
                    .HasColumnName("PHASE_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AnswerTime).HasColumnName("ANSWER_TIME");

                entity.Property(e => e.EndTime).HasColumnName("END_TIME");

                entity.Property(e => e.IsCorrect).HasColumnName("IS_CORRECT");

                entity.Property(e => e.Item)
                    .IsRequired()
                    .HasColumnName("ITEM");

                entity.Property(e => e.RoundId).HasColumnName("ROUND_ID");

                entity.Property(e => e.StartTime).HasColumnName("START_TIME");

                entity.HasOne(d => d.Round)
                    .WithMany(p => p.Phase)
                    .HasForeignKey(d => d.RoundId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Round>(entity =>
            {
                entity.ToTable("ROUND");

                entity.Property(e => e.RoundId)
                    .HasColumnName("ROUND_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AnswerTime).HasColumnName("ANSWER_TIME");

                entity.Property(e => e.EndTime).HasColumnName("END_TIME");

                entity.Property(e => e.RoundName)
                    .IsRequired()
                    .HasColumnName("ROUND_NAME");

                entity.Property(e => e.RoundNumber).HasColumnName("ROUND_NUMBER");

                entity.Property(e => e.RoundType)
                    .IsRequired()
                    .HasColumnName("ROUND_TYPE");

                entity.Property(e => e.SessionId).HasColumnName("SESSION_ID");

                entity.Property(e => e.StartTime).HasColumnName("START_TIME");

                entity.HasOne(d => d.Session)
                    .WithMany(p => p.Round)
                    .HasForeignKey(d => d.SessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("SESSION");

                entity.HasIndex(e => e.Id)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Age).HasColumnName("AGE");

                entity.Property(e => e.Completed).HasColumnName("COMPLETED");

                entity.Property(e => e.EndTime).HasColumnName("END_TIME");

                entity.Property(e => e.Knowledge).HasColumnName("KNOWLEDGE");

                entity.Property(e => e.StartTime).HasColumnName("START_TIME");

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasColumnName("USER");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("TEST");

                entity.Property(e => e.TestId)
                    .HasColumnName("TEST_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.RoundId).HasColumnName("ROUND_ID");

                entity.Property(e => e.TestCorrectItems)
                    .IsRequired()
                    .HasColumnName("TEST_CORRECT_ITEMS");

                entity.Property(e => e.TestCorrectNumber).HasColumnName("TEST_CORRECT_NUMBER");

                entity.Property(e => e.TestFailedItems)
                    .IsRequired()
                    .HasColumnName("TEST_FAILED_ITEMS");

                entity.Property(e => e.TestFailedNumber).HasColumnName("TEST_FAILED_NUMBER");

                entity.Property(e => e.TestItems)
                    .IsRequired()
                    .HasColumnName("TEST_ITEMS");

                entity.Property(e => e.TestType)
                    .IsRequired()
                    .HasColumnName("TEST_TYPE");

                entity.HasOne(d => d.Round)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.RoundId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }
    }
}
