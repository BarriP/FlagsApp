import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { User } from "../models/user";
import { HeaderService } from "../header.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() homeEmitter = new EventEmitter();

  model = new User();

  constructor(public service: HeaderService, public cookieService: CookieService) {}

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.model.age == null || this.model.user == null || this.model.knowledge == null) {
      alert("Se deben rellenar todos los datos");
      return;
    }
    if (this.model.age < 3 && this.model.age > 150) {
      alert("Introduzca una edad valida");
      return;
    }
    if (this.model.user.length < 2 || this.model.user.length > 30) {
      alert("Introduzca una edad valida");
      return;
    }
    if (this.model.knowledge < 0 || this.model.knowledge > 4) {
      alert("Introduzca un conocimiento de banderas valido");
      return;
    }

    this.setUserId();
    this.model.startTime = Math.round(+new Date()/1000);

    this.notify();
  }

  notify() {
    this.homeEmitter.emit(this.model);
  }

  setUserId() {
    if (this.cookieService.check('userid')) {
      const id = this.cookieService.get('userid');
      console.log(id);
      this.model.userid = Number(id);
    } else {
      const id = Math.floor(Math.random() * (5000000));
      this.cookieService.set('userid', id.toString());
      console.log(id);
      this.model.userid = Number(id);
    }
  }
}
