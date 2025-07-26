import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected authService = inject(AuthService);
  
  protected userEmail: string = 'john.doe@gmail.com';
  protected userPhone: string = '+359 885 888 888';

  readonly currentUser = this.authService.currentUser;

  onEdit(): void {
    alert('skoro');
  }
}
