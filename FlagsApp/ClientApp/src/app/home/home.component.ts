import { Component, EventEmitter, Output } from '@angular/core';
import { User } from "../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() homeEmitter = new EventEmitter();

  model = new User();

  onSubmit() {
    if (this.model.age == null || this.model.name == null || this.model.knowledge == null) {
      alert("Se deben rellenar todos los datos");
      return;
    }
    if (this.model.age < 3 && this.model.age > 150) {
      alert("Introduzca una edad valida");
      return;
    }
    if (this.model.name.length < 2 || this.model.name.length > 30) {
      alert("Introduzca una edad valida");
      return;
    }
    if (this.model.knowledge < 0 || this.model.knowledge > 4) {
      alert("Introduzca un conocimiento de banderas valido");
      return;
    }

    this.notify();
  }

  notify() {
    this.homeEmitter.emit(this.model);
  }
}
