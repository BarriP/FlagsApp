import { Component, OnInit } from '@angular/core';
import { FLAGS, FLAG_NAMES } from "../models/flags"

@Component({
  selector: 'pretest-component',
  templateUrl: './pretest.component.html',
  styleUrls: ['./pretest.component.css']
})
export class PretestComponent implements OnInit {

  questions = [];
  answered = [];
  canContinue = false;

  generateQuestions() {
    const shuffled = FLAGS.sort(() => 0.5 - Math.random()); 
    shuffled.forEach((f, index) => {
      this.questions.push({
        imageUrl: f.imageUrl,
        code: f.code,
        number: index,
        options: FLAG_NAMES
      });
    });
  }

  ngOnInit() {
    this.generateQuestions();
  }

  answer(number, response) {
    console.log(number);
    console.log(response);
    if (response == null || response.length === 0) {
      this.answered[number] = null;
    } else {
      this.answered[number] = response;
    }

    this.canContinue = this.answered.every(s => s != null);
  }
}
