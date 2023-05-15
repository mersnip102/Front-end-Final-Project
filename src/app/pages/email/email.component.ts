import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  constructor(public router: Router){
    this.router.navigateByUrl('/pages/email/box-email/inbox')
  }
}
