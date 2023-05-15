import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { listMenu } from 'src/app/core/consts/guard.const';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  roleUserCurrent!: number;
  routerLinkHome!: string;

  constructor(private authService: AuthService) {
    this.authService.roleUser.subscribe(res => {
      this.roleUserCurrent = res;
    });
    this.routerLinkHome = listMenu[this.roleUserCurrent].defaultScreen;
  }
}
