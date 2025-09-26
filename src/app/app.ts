import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router'; //imported to use routing in the app

//add imports to component
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
