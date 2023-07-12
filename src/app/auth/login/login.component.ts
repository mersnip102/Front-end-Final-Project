import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  uploadedFiles: any[] = [];

    

    onUpload(event: any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        
    }

    
    status: any;
    durationInSeconds = 5;
    constructor(
      
      private authService: AuthService, private localStorageSv: LocalStoreService,
        
        private route: ActivatedRoute,
        private http: HttpClient,
        
        private router: Router,
        private notifyService: NotifyService) { } //dependency injection

        // showToast() {
        //     this.toastr.success('Success!', 'Toastr Message');
        //   }

        //   showSuccess() {
        //     this.toastr.success('Thành công', 'Thông báo', {
        //       timeOut: 2000,
        //       progressBar: true,
        //       progressAnimation: 'increasing',
        //       closeButton: true,
        //       positionClass: 'toast-top-right'
        //     });
        //   }

        
    ngOnInit(): void {
        // this.loginForm.patchValue({
        //     phone: this.route.snapshot.queryParamMap.get('phone')!,
        //     password: this.route.snapshot.queryParamMap.get('password')!
        //   });
        this.phone = this.route.snapshot.queryParamMap.get('phone')!;
        this.password = this.route.snapshot.queryParamMap.get('password')!;
        console.log(this.route.snapshot.queryParamMap);

          

     }

    //  openSnackBar() {
    //     this._snackBar.openFromComponent(ToastComponent, {
    //       duration: this.durationInSeconds * 1000,
    //     });
    //   }

    // loginForm = new FormGroup({
    //     phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)]),
    //     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // })

    phone?: any;
    password?: any;
    login() {
      console.log( this.phone,
        this.password)
        
        this.authService.login(
            this.phone,
            this.password
        ).subscribe(async res => {
          
          await this.router.navigateByUrl('/pages').then(() => {
            this.notifyService.successMessage("Đăng nhập thành công");
          });
          // confirm("Đăng nhập thành công");

            // var d = JSON.parse(res); //doi tu json sang object
            //     console.log(d.account.ID);
            // const expriesAt = moment().add(d.expiresIn, 'second'); // add de cong them thoi diem hien tai + khoang thoi gian 480s nua thi no se het han
            // localStorage.setItem('id_token', d.idToken);
            // localStorage.setItem('expires_at', JSON.stringify(expriesAt.valueOf()));

            // localStorage.setItem('account', JSON.stringify(d.account));
            
            // if(d.account.Role == 0){
            //     this.toastService.success({detail:"Login success", duration: 3000})
            //     this.router.navigateByUrl('/admissions');
                
            // } else if(d.account.Role == 1){
            //     this.toastService.success({detail:"Login success", duration: 3000})
            //     this.router.navigate(['/students']);
            // }

            
        
            // luu lai trang trc roi quay lai trang do, sau do xoa di
                // this.router.navigateByUrl('/students');
                // localStorage.setItem('token', res.result);
        },
        
        error => {
            // this.toastService.error({detail:"Login failed", duration: 3000})
            // const currentUrl = this.router.url;
            // this.router.navigate([currentUrl]);
            this.notifyService.errorMessage(error);
            console.log(error);
        }
        
        );

    }

    // details: LoginDetails = {
    //     username: null,
    //     password: null,
    // }
    // isValidated(ctrl: NgModel): boolean | null {
    //     var result: boolean | null
    //         = ctrl.valid || (ctrl.pristine && ctrl.untouched)
    //     return result;
    // }
    // getValidationClass(ctrl: NgModel): any {
    //     // solution 1: return a class name as string
    //     if (ctrl.touched && ctrl.value && this.isValidated(ctrl)) {
    //         return 'is-valid';
    //     } else if (!this.isValidated(ctrl)) {
    //         return 'is-invalid';
    //     } else {
    //         return '';
    //     }

    // }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
       
        this.router.navigateByUrl('/login');
    }

    // logined() {
    //     const str = localStorage.getItem('expires_at') || ""; // || " " nghia la neu khong co thi gan cho gia tri rong dung cho const
    //     if(str == ""){
    //         return false; //chua login

    //     }
    //     const expriesAt = JSON.parse(str);
    //     // return moment().isBefore(moment(expriesAt)); //isBefore kiem tra xem thoi gian hien tai co truoc thoi gian expriesAt hay khong - tra ve true or false
    // }
}
