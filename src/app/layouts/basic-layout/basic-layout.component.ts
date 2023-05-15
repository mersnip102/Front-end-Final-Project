import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { listMenu } from 'src/app/core/consts/guard.const';
import { IListMenu } from 'src/app/core/models/list-menu.model';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css'],
})
export class BasicLayoutComponent implements OnInit {
  isCollapsed = false;
  // listMenu: IListMenu[] = [
  //   {
  //     name: 'Email',
  //     roleActivated: [
  //       {
  //         roleNumber: [RoleNumber.student, RoleNumber.admissionsManager],
  //         routerLink: 'email/box-email/inbox',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Chat',
  //     roleActivated: [
  //       {
  //         roleNumber: RoleNumber.student,
  //         routerLink: 'chat-students',
  //       },
  //       {
  //         roleNumber: RoleNumber.admissions,
  //         routerLink: 'chat-admissions',
  //       },
  //     ],
  //   },
  // ];
  roleUserCurrent!: number;
  listMenuByRole: any;
  // arr = [];

  constructor(public router: Router, private authService: AuthService) {
    this.authService.roleUser.subscribe(res => {
      this.roleUserCurrent = res;
    });
  }
  ngOnInit(): void {
    // console.log(this.roleUserCurrent);
    this.listMenuByRole = [listMenu[this.roleUserCurrent]];
    // this.router.navigateByUrl(listMenu[this.roleUserCurrent].defaultScreen);
  }

  logout() {
    this.authService.logout();
  }
}
