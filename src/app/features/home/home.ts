import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn; 
  //signal -> when it is updated from service we get the current state in the html
  readonly currentUser = this.authService.currentUser;
}
