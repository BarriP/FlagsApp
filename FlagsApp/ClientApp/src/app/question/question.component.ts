import { Component } from '@angular/core';

@Component({
  selector: 'question-component',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
