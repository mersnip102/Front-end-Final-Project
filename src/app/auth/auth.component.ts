import { Component } from '@angular/core';
import { GSafeData } from '../core/models/utils/safe-data.interface';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { listMenu } from '../core/consts/guard.const';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  roleUserCurrent!: number;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.roleUser.subscribe(res => {
      console.log(res);
      if(res == 4) {
        
        // this.router.navigateByUrl("/auth/login");
      } else {
        this.roleUserCurrent = res;
        this.router.navigateByUrl(listMenu[this.roleUserCurrent].defaultScreen);
      }
      
      
    });
    
  }

}
