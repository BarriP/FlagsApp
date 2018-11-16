import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() homeEmitter = new EventEmitter();

  notify() {
    this.homeEmitter.emit(0);
  }
}
