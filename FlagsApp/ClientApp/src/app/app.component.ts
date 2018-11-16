import { Component } from '@angular/core';
import { User } from "./models/user.ts"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public view: String = "login";

  private user: User;

  logged(user) {
    this.user = user;
    console.log(user);
  }
}
