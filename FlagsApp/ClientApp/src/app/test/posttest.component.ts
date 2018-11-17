import { Component } from '@angular/core';

@Component({
  selector: 'posttest-component',
  templateUrl: './posttest.component.html',
  styleUrls: ['./posttest.component.css']
})
export class PosttestComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
