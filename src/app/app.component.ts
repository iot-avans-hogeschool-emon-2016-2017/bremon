import {Component} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent {

  isDarkTheme: boolean = false;
  title = 'Bremon';

  public sidenavOpened = false;
  public sidenavMode = "over";

  constructor(public authService: AuthService) {
    if (window.innerWidth > 960) {
      this.sidenavOpened = true;
      this.sidenavMode = "side";
    }
  }

  onResize(event) {
    if (event.target.innerWidth > 960) {
      this.sidenavOpened = true;
      this.sidenavMode = "side";
    }
    else {
      this.sidenavOpened = false;
      this.sidenavMode = "over";
    }
  }

  onClick(event, sidenav) {
    if (window.innerWidth <= 960) {
      sidenav.toggle();
    }
  }
}
