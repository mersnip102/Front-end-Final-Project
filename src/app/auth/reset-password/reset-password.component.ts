import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { BaseService } from 'src/app/core/services/base-service/base.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPwForm!: FormGroup;
  constructor(public fb: FormBuilder, private authService: AuthService, private localStorageSv: LocalStoreService,
    private api: BaseService,
    private route: ActivatedRoute,
    private http: HttpClient,
    
    private router: Router,
    private notifyService: NotifyService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetPwForm = this.fb.group({
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required],
    });
  }
  onSubmitChangePassword() {
    const data = {
      newPassword: this.resetPwForm.value.newPassword,
      reNewPassword: this.resetPwForm.value.reNewPassword,
    };
    this.api.resetPassword(data).subscribe((res: any) => {
      console.log(res);

      this.notifyService.successMessage(res.message);
      this.resetPwForm.reset();
      // this.router.navigate(['/auth/login']);
    }, error => {
      this.notifyService.errorMessage(error.error.message);
    }
    );
  }
}
