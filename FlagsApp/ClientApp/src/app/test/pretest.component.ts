import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pretest-component',
  templateUrl: './pretest.component.html',
  styleUrls: ['./pretest.component.css']
})
export class PretestComponent implements OnInit {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
  ngOnInit() {

  }
}
