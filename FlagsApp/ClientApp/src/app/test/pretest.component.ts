import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"
import { HeaderService } from "../header.service";
import { Test } from "../models/rounds";

@Component({
  selector: 'pretest-component',
  templateUrl: './pretest.component.html',
  styleUrls: ['./pretest.component.css']
})
export class PretestComponent implements OnInit {

  questions = [];
  answered = [];
  correct = [];
  canContinue = false;
  revision = false;

  startTime: number = 0;
  answerTime: number = 0;
  endTime:number = 0;

  @Output() pretestEmitter = new EventEmitter();

  constructor(public service: HeaderService) { }

  generateQuestions() {
    const shuffled = FLAGS.sort(() => 0.5 - Math.random()); 
    shuffled.forEach((f, index) => {
      this.questions.push({
        imageUrl: f.imageUrl,
        code: f.code,
        number: index,
        options: FLAG_NAMES,
        answer: f.name
      });
      this.correct.push(f.code);
    });
  }

  ngOnInit() {
    this.generateQuestions();
    this.service.pretest();
    this.startTime = Math.round(+new Date() / 1000);
    window.scrollTo(0, 0);
  }

  answer(response, number) {
    console.log(number);
    console.log(response);
    if (response == null || response.length === 0) {
      this.answered[number] = null;
    } else {
      this.answered[number] = response;
    }

    console.log(this.answered);
    this.canContinue = this.answered.every(s => s != null) && this.answered.length === 50 && !this.answered.includes(undefined);
  }

  continue() {
    if (this.revision) {
      this.endTime = Math.round(+new Date() / 1000);

      const test = new Test();

      test.roundName = "Pretest";
      test.roundNumber = 0;
      test.roundType = "Test";
      test.startTime = this.startTime;
      test.endTime = this.endTime;
      test.answerTime = this.answerTime;

      test.testType = "Pretest";
      test.testItems = this.questions.map(f => f.code).join();
      const correctArray = [];
      const failedArray = [];
      this.answered.forEach((f, i) => {
        if (f === this.correct[i]) {
          correctArray.push(f);
        } else {
          failedArray.push(this.correct[i]);
        }
      });
      test.testCorrectItems = correctArray.join();
      test.testFailedItems = failedArray.join();
      test.testCorrectNumber = correctArray.length;
      test.testFailedNumber = failedArray.length;

      this.pretestEmitter.emit(test);
    } else {
      this.revision = true;
      window.scrollTo(0, 0);
      this.answerTime = Math.round(+new Date() / 1000);
    }
  }
}
