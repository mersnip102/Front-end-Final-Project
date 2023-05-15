import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdmissionManagerService } from 'src/app/core/services/admission-manager-service/admission-manager.service';
import { BaseService } from 'src/app/core/services/base-service/base.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  infor: any = null
  FullName: any= null;
  Email: any= null;
  Phone: any= null;
  InnitiatedDate: any= null
  Gender: any= null
  Address: any= null
  async ngOnInit(): Promise<void> {
    this.getDataProfile();
   
    
    
  }
  constructor(private authService: AuthService, private localStorageSv: LocalStoreService,
        
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: BaseService,
    
    private router: Router,
    private notifyService: NotifyService,
    private fb: FormBuilder,) {
    }
  editStatus = 1;

  getDataProfile() {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    const data = {
      Role: decodedToken.Role,
      Id: decodedToken.ID
    }
    console.log(data);

    this.api.getProfile(data).subscribe((res: any) => {
      console.log(res);
      this.FullName = res.infor.FullName
      this.Email = res.infor.Email
      this.Phone = res.infor.Phone
      this.Address = res.infor.Address
      this.InnitiatedDate = res.infor.InnitiatedDate.slice(0,10)
    }, error => {
        console.log(error);
        this.notifyService.errorMessage("Lấy thông tin thất bại");
      });
  
    // const helper = new JwtHelperService();
    // const decodedToken = await helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    // this.infor = decodedToken.Infor
    // console.log(this.infor);
    
    // this.FullName = this.infor.FullName
    // this.Email = this.infor.Email
    // this.Phone = this.infor.Phone
    // this.InnitiatedDate = this.infor.InnitiatedDate.slice(0,10)
    // this.Gender = this.infor.Gender
    // this.Address = this.infor.Address

  }

  editProfile() {
    this.notifyService.confirmAdd('Bạn có chắc chắn muốn chỉnh sửa thông tin bản thân').then((result) => {
      if (result) {


        const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
  
        
    
    const data = {
      FullName: this.FullName,
      Email: this.Email,
      Gender: this.Gender,
      Address: this.Address,
      AccountId: decodedToken.ID,
     

     
    }
      this.api.updateProfile(data
      ).subscribe((res: any) => {
        this.router.navigate(['/pages/profile-account']);
        this.notifyService.successMessage("Thay đổi thông tin thành công");
        // this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/pages/profile-account']).then(() => {
            
        //   });
        // })
      },
  
        error => {
            console.log("Error", error);
            this.notifyService.errorMessage(error.error.message);
            // this.router.navigateByUrl('/admissions/registeraccount');
        }
      )};
    });
  }

      

  




}
