import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"

@Component({
  selector: 'posttest-component',
  templateUrl: './posttest.component.html',
  styleUrls: ['./posttest.component.css']
})
export class PosttestComponent implements OnInit {

  questions = [];
  answered = [];
  correct = [];
  canContinue = false;
  revision = false;
  @Output() posttestEmitter = new EventEmitter();

  generateQuestions() {
    const shuffled = FLAGS.sort(() => 0.5 - Math.random());
    shuffled.slice(1, 4).forEach((f, index) => {
      this.questions.push({
        imageUrl: f.imageUrl,
        code: f.code,
        number: index,
        options: FLAG_NAMES,
        answer: f.name
      });
      this.correct.push(f.name);
    });
  }

  ngOnInit() {
    this.generateQuestions();
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
    this.canContinue = this.answered.every(s => s != null) && this.answered.length === 3 && !this.answered.includes(undefined);
  }

  continue() {
    if (this.revision) {
      this.posttestEmitter.emit(0/*TODO*/);
    } else {
      this.revision = true;
      window.scrollTo(0, 0);
    }
  }
}
