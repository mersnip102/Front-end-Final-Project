import { Component } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { getISOWeek } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
import { AdmissionManagerService } from 'src/app/core/services/admission-manager-service/admission-manager.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  listOfData: Array<any> = [];
  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => index);
  }
  
  mode: NzCalendarMode = 'month';
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  date = null;

  Name: any = null
  DateTime:any = null
  Tickets:any = null
  Expense:any =  null
  Description:any = null

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
  constructor(private authService: AuthService, private localStorageSv: LocalStoreService,
        
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: AdmissionManagerService,
    
    private router: Router,
    private notifyService: NotifyService) { }

  createEvent(): void {

    this.notifyService.confirmAdd('Bạn có chắc chắn muốn tạo sự kiện này?').then((result) => {
      if (result) {


        const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    console.log(decodedToken.ID);
        
    
    const data = {
      Name: this.Name,
      StartDate: this.DateTime[0],
      EndDate: this.DateTime[1],
      Expense: this.Expense,
      Tickets: this.Tickets,
      Description: this.Description,
    }





      // if(this.loginForm.invalid){
      //     return false;
      // } 
      // truyen du lieu vao form
      // console.log(data.phone, data.password);
      // this.router.navigateByUrl('/students');

      // return true;
      // console.log(
      //  this.resetPasswordForm.value);
      // if (this.resetPasswordForm.value.oldPassword != oldPw) {

      //   alert("Mật khẩu cũ không đúng");
      //   return false;
      // }
      // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
      //   alert("Mật khẩu mới không trùng khớp");
      //   return false;
      // }
      // else {
      
      this.api.createEvent(data
      ).subscribe((res: any) => {
        
        // var d = JSON.parse(res); //doi tu json sang object
        
       
        this.Expense = null;
        this.Name = null;
        this.Tickets = null;
        this.Description = null;
        this.DateTime = null;

       
        this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/pages/create-event']).then(() => {
            this.notifyService.successMessage("Tạo sự kiện thành công");
          });
        })
        // const helper = new JwtHelperService();
      
        // const decoedToken = helper.decodeToken(d.account);
        
        
        // alert("Tạo tài khoản thành công. Đã gửi Email cho sinh viên");
        
        // // this.router.navigateByUrl('/students/profilestudent');
        // this.router.navigateByUrl('/admissions');
      },
  
        error => {
            console.log("Error", error);
            this.notifyService.errorMessage(error.error.message);
            // this.router.navigateByUrl('/admissions/registeraccount');
        }
  
      );



       

      } else {

        console.log('Cancelled.');
      }
    });

  }
}
