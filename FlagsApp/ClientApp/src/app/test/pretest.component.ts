import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"
import { HeaderService } from "../header.service";

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
  @Output() pretestEmitter = new EventEmitter();

  constructor(public service: HeaderService) { }

  generateQuestions() {
    const shuffled = FLAGS.sort(() => 0.5 - Math.random()); 
    shuffled.slice(1,4).forEach((f, index) => {
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
    this.service.pretest();
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
      this.pretestEmitter.emit(0/*TODO*/);
    } else {
      this.revision = true;
      window.scrollTo(0, 0);
    }
  }
}
