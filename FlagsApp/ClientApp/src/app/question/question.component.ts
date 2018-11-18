import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"
import { HeaderService } from "../header.service";
import { HttpClient } from '@angular/common/http';
import { Phase, Round } from "../models/rounds"

const RONDAS = 7;
const PREGUNTAS = 8;

@Component({
  selector: 'question-component',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Output() questionEmitter = new EventEmitter();

  phases = [];

  roundStartTime: number;
  roundAnswerTime: number;
  roundEndTime: number;

  startTime: number;
  endTime: number;
  answerTime: number;

  roundQuestions = [];
  roundResponses = [];

  currentRound = -1;
  currentPhase = -1;

  currentQuestion: any = {};
  currentResponse: any = {};

  // revision general
  review = false;
  // contestar
  answer = true;
  // revisar la contestacion
  check = false;

  constructor(public service: HeaderService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.newRound();
  }

  newRound() {
    this.answer = true;
    this.check = false;
    this.review = false;
    this.currentPhase = 0;
    this.currentRound++;

    this.roundQuestions = [];
    this.roundResponses = [];

    this.service.question(this.currentRound, this.currentPhase);

    if (this.currentRound > RONDAS) {
      this.questionEmitter.emit({end:true});
    }

    //sacar las preguntas
    this.drawQuestions();
  }

  drawQuestions() {
    const questionFlags = FLAGS.sort(() => 0.5 - Math.random()).slice(0, PREGUNTAS);
    questionFlags.forEach(f => {
      this.roundQuestions.push({
        image: f.imageUrl,
        code: f.code,
        name: f.name,
        answers: this.drawAnswers(f.name)
      });
    });
    this.currentQuestion = this.roundQuestions[0];

    this.phases = [];

    this.roundStartTime = Math.round(+new Date() / 1000);
    this.startTime = Math.round(+new Date() / 1000);
  }

  drawAnswers(name: string) {
    const shuffled = FLAG_NAMES.sort(() => 0.5 - Math.random());
    const result: Array<string> = [];
    result.push(name);
    shuffled.forEach(s => {
      if (s.name !== name)
        result.push(s.name);
    });
    return result.slice(0,4).sort(() => 0.5 - Math.random());
  }

  respond(response) {
    if (this.answer) {
      const resp = {
        isCorrect: this.currentQuestion.name === response,
        correct: this.currentQuestion.name,
        code: this.currentQuestion.code,
        answered: response
      };
      this.roundResponses.push(resp);
      this.currentResponse = resp;
      this.answer = false;
      this.check = true;
      this.answerTime = Math.round(+new Date() / 1000);
    }
  }

  continue() {
    if (this.check) {
      this.currentPhase++;
      this.endTime = Math.round(+new Date() / 1000);

      const phase = new Phase();
      phase.startTime = this.startTime;
      phase.answerTime = this.answerTime;
      phase.endTime = this.endTime;
      const resp = this.roundResponses[this.roundResponses.length - 1];
      phase.isCorrect = resp.isCorrect;
      phase.item = resp.code;

      this.phases.push(phase);

      if (this.currentPhase < PREGUNTAS) {
        this.answer = true;
        this.check = false;
        this.service.question(this.currentRound, this.currentPhase);
        this.currentQuestion = this.roundQuestions[this.currentPhase];
        this.startTime = Math.round(+new Date() / 1000);
        return;
      } else {
        this.answer = false;
        this.check = false;
        this.review = true;
        this.service.review(this.currentRound);
        window.scrollTo(0, 0);
        this.roundAnswerTime = Math.round(+new Date() / 1000);
        return;
      }
    }

    if (this.review) {
      this.roundEndTime = Math.round(+new Date() / 1000);

      const round = new Round();
      round.startTime = this.roundStartTime;
      round.endTime = this.roundEndTime;
      round.answerTime = this.roundAnswerTime;
      round.phases = this.phases;
      round.roundName = `Round ${this.currentRound+1}`;
      round.roundNumber = this.currentRound+1;
      round.roundType = "Question";

      this.questionEmitter.emit({
        end: false,
        round: round
      });

      this.newRound();
    }
  }
}
