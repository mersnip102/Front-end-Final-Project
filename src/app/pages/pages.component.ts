import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { listMenu } from '../core/consts/guard.const';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  roleUserCurrent!: number;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.roleUser.subscribe(res => {
      console.log(res);
      if(res == 4) {
        
        this.router.navigateByUrl("/auth/login");
      } else {
        this.roleUserCurrent = res;
        this.router.navigateByUrl(listMenu[this.roleUserCurrent].defaultScreen);
      }
      
      
    });
    
  }

}
