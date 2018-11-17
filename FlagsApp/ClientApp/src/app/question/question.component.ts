import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"

const RONDAS = 2;
const PREGUNTAS = 3;

@Component({
  selector: 'question-component',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Output() questionEmitter = new EventEmitter();

  round = [];
  phases = [];

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

  ngOnInit() {
    this.newRound();
  }

  newRound() {
    this.answer = true;
    this.check = false;
    this.review = false;
    this.currentPhase = 0;
    this.currentRound++;

    if (this.currentRound > RONDAS) {
      this.questionEmitter.emit(0);
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
  }

  drawAnswers(name: string) {
    const shuffled = FLAG_NAMES.sort(() => 0.5 - Math.random());
    const result: Array<string> = [];
    result.push(name);
    shuffled.forEach(s => {
      if (s !== name)
        result.push(s);
    });
    return result.slice(0,4).sort(() => 0.5 - Math.random());
  }

  respond(response) {
    if (this.answer) {
      const resp = {
        isCorrect: this.currentQuestion.name === response,
        correct: this.currentQuestion.name,
        answered: response
      };
      this.roundResponses.push(resp);
      this.currentResponse = resp;
      this.answer = false;
      this.check = true;
    }
  }

  continue() {
    if (this.check) {
      this.currentPhase++;

      if (this.currentPhase <  PREGUNTAS) {
        this.answer = true;
        this.check = false;
        this.currentQuestion = this.roundQuestions[this.currentPhase];
      } else {
        this.answer = false;
        this.check = false;
        this.review = true;
        window.moveTo(0,0);
      }
    }

    if (this.review) {
      this.newRound();
    }
  }
}
