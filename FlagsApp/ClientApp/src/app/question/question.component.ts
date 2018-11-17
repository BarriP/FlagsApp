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

  round = [];
  phases = [];

  roundQuestions = [];
  roundResponses = [];

  currentRound = -1;
  currentPhase = -1;

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
    this.currentPhase = 0;
    this.currentRound++;

    //sacar las preguntas
    this.drawQuestions();
  }

  drawQuestions() {
    const questionFlags = FLAGS.sort(() => 0.5 - Math.random()).slice(0, RONDAS);
    questionFlags.forEach(f => {
      this.roundQuestions.push({
        image: f.imageUrl,
        code: f.code,
        name: f.name,
        answers: this.drawAnswers(f.name)
      });
    });
  }

  drawAnswers(name: string) {
    const shuffled = FLAG_NAMES.sort(() => 0.5 - Math.random());
    const result: Array<string> = [];
    result.push(name);
    shuffled.forEach(s => {
      if (s !== name)
        result.push(s);
    });
    return result;
  }

  respond() {

  }

  continue() {
    if (this.answer) {
      this.currentRound++;

      if (this.currentRound < RONDAS) {
        this.answer = false;
        this.check = true;
      }
    }
  }

  
}
