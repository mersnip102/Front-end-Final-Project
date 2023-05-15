import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { listMenu } from 'src/app/core/consts/guard.const';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
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
