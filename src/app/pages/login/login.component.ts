declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    // all came from google Docs
    google.accounts.id.initialize({
      client_id:
        '808210414722-uk4ojf4rn38nsn3s54uifk1oghobghg9.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode Token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      //navigate to browse
      this.router.navigate(['/browse']);
    }
  }
}
