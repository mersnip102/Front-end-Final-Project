import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scholarship-proposal',
  templateUrl: './scholarship-proposal.component.html',
  styleUrls: ['./scholarship-proposal.component.css']
})
export class ScholarshipProposalComponent {
  // ngScholarship = ['Không','Phỏng vấn học bổng','Green Talent', 'Golden Compass','Silver Compass','Compass','Big Ben','Fschool']; 
  ngScholarship = [
    {
      name: 'Học bổng 100%',
      value: 400000000
    },
    {
      name: 'Học bổng 50%',
      value: 200000000
    },
    {
      name: 'Học bổng 30%',
      value: 120000000
    },
    {
      name: 'Học bổng 20%',
      value: 80000000
    },
    ]; 
  @ViewChild("toast") toast: ElementRef | undefined;

  form!: FormGroup;
  formData: FormData = new FormData();

  editStatus!: number;

  profileStatus!: number;

  uploadForm!: FormGroup;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';



  ngOptionsGender: Array<string> = ["Nam", "Nữ"]
  ngDropdownGender = "Nam";
  years: number[] = [];


  FullName!: string;
  CertificateOfGraduation!: File;


  ngOptionsMajors = ["Công Nghệ Thông Tin", "Quản Trị Kinh Doanh", "Thiêt Kế Đồ Họa", "Quản Trị Marketing", "Quản Trị Sự Kiện", "Quản Trị Truyền Thông"];


  ngOptionsProvinceTHPT = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên", "Cần Thơ", "Đà Nẵng", "Hải Phòng", "Hà Nội", "TP HCM"];

  ngOptionsHightSchool = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang"]

  // openModal(imageUrl: string) {
  //   const modalRef = this.modalService.open(ImageModalComponent, { size: 'lg' });
  //   modalRef.componentInstance.imageUrl = imageUrl;
  // }

  

  constructor(
    private localStorageSv: LocalStoreService,
    private notifyService: NotifyService,
    private http: HttpClient,
    private api: AdmissionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {


   
  } //dependency injection


  profile() {

    const Id = this.route.snapshot.params['Id'];
   
    this.api.getStudentById(Id
    ).subscribe(async res => {

     

      var d = await JSON.parse(res);
      
   
      let data = await { ...d.student };
      console.log(data);

      this.api.getScholarshipByStudent(Id).subscribe(async res => {
        console.log(res);

        // TypeScholarship: new FormControl(''),
        // ValueScholarship: new FormControl(''),
        // DatePropose: new FormControl(''),
        // AdmissionId: new FormControl(''),
        // Deadline: new FormControl(''),

        this.uploadForm.get('ScholarshipId')?.setValue(res.scholarship[0].Id);
        this.uploadForm.get('TypeScholarship')?.setValue(res.scholarship[0].ValueScholarship);
        this.uploadForm.get('ValueScholarship')?.setValue(res.scholarship[0].ValueScholarship);
        this.uploadForm.get('DatePropose')?.setValue(res.scholarship[0].DatePropose);
       

        let birthday = moment(new Date(res.scholarship[0].Deadline)).format('YYYY-MM-DD');
        
        
        this.uploadForm.get('Deadline')?.setValue(birthday);



        
       
        this.uploadForm.get('AdmissionId')?.setValue(res.scholarship[0].AdmissionId);
      });

     



      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.uploadForm.get(key)?.setValue(data[key]);
        }

      }

      // TypeScholarship: new FormControl(''),
      // ValueScholarship: new FormControl(''),
      // DatePropose: new FormControl(''),
      // AdmissionId: new FormControl(''),
      // Deadline: new FormControl(''),

      

      this.uploadForm.get('EnglishCertificate')?.setValue("Không có");
      
      this.uploadForm.get('AdmissionId')?.setValue(data['Admission']);

      
    },

      error => {
        console.log("Error", error);
        alert("Error");
        
      }

    );

  }



  async selectFile(event: any, fieldName: string) {

    let file: File = event.target.files[0];
    this.formData.append(fieldName, file);

  }


  async onSubmit() {

    // this.uploadForm.get('DatePropose')?.setValue(new Date().toISOString());
    

    //add form group value to form data ignore file

    this.formData.append('ScholarshipId', this.uploadForm.get('ScholarshipId')?.value);
    this.formData.append('FullName', this.uploadForm.get('FullName')?.value);
    
    this.formData.append('Email', this.uploadForm.get('Email')?.value);
    this.formData.append('Majors', this.uploadForm.get('Majors')?.value);
  
    this.formData.append('Phone', this.uploadForm.get('Phone')?.value);
    
    this.formData.append('EnglishCertificate', this.uploadForm.get('EnglishCertificate')?.value);

    
    const item: any = this.ngScholarship.filter(x => x.value == this.uploadForm.get('TypeScholarship')?.value)
    this.formData.append('TypeScholarship', item[0].name);
    
    this.formData.append('ValueScholarship', this.uploadForm.get('TypeScholarship')?.value);

    

    const Id = localStorage.getItem('token')

    this.formData.append('AdmissionId', this.uploadForm.get('AdmissionId')?.value);

    if( this.uploadForm.get('DatePropose')?.value) {
      this.formData.append('DatePropose', new Date( this.uploadForm.get('DatePropose')?.value).toISOString().slice(0, 10));

    } else {
      this.formData.append('DatePropose', new Date().toISOString().slice(0, 10));
    }
    this.formData.append('Deadline', new Date(this.uploadForm.get('Deadline')?.value).toISOString().slice(0, 10));
    
    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    this.formData.append('StudentId', this.route.snapshot.params['Id']);


    const account = JSON.parse(localStorage.getItem('account')!) 
   
    this.formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    if(!this.uploadForm.get('ScholarshipId')?.value){
      
      console.log(this.formData.get('DatePropose'));
      Swal.fire({
        title: "Are you sure to add this student's scholarship?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.api.addScholarshipByStudent(this.formData).subscribe(response => {
            // Swal.fire('Saved!', '', 'success')
            this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
              this.router.navigate([`/pages/profileStudent/${this.route.snapshot.params['Id']}`]).then(() => {
                this.notifyService.successMessage("Thêm đổi học bổng thành công")
              });
            })
          },
            error => {
              this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
                this.router.navigate([`/pages/profileStudent/${this.route.snapshot.params['Id']}`]).then(() => {
                  console.log(error);
                  this.notifyService.errorMessage("Thêm đổi học bổng thất bại")
                });
              })
            }
          );
        }
        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
      })
    } else {

      Swal.fire({
        title: "Are you sure to edit this student's scholarship?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.api.updateScholarshipByStudent(this.formData).subscribe(response => {
            // Swal.fire('Saved!', '', 'success')
            this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
              this.router.navigate([`/pages/profileStudent/${this.route.snapshot.params['Id']}`]).then(() => {
                this.notifyService.successMessage("Thay đổi học bổng thành công")
              });
            })
          },
            error => {
              this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
                this.router.navigate([`/pages/profileStudent/${this.route.snapshot.params['Id']}`]).then(() => {
                  console.log(error);
                  this.notifyService.errorMessage("Thay đổi học bổng thất bại")
                });
              })
            }
          );
        }
        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
      })

    }


    

   
  }


  private citis?: HTMLSelectElement;
  private districts?: HTMLSelectElement;
  private wards?: HTMLSelectElement;

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.profileForm.get('CertificateOfGraduation')!.setValue(file);
  //   }
  // }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({

      ScholarshipId: new FormControl(''),
      FullName: new FormControl(''),
     
      Email: new FormControl(''),
      Phone: new FormControl(''),
      Majors: new FormControl(''),
      EnglishCertificate: new FormControl(''),
      TypeScholarship: new FormControl(''),
      ValueScholarship: new FormControl(''),
      DatePropose: new FormControl(''),
      AdmissionId: new FormControl(''),
      Deadline: new FormControl(''),
    });

    const currentYear = new Date().getFullYear() + 5;
    this.years = Array.from({ length: 20 }, (_, i) => currentYear - i);


    this.profile();
  
  }

  private renderCity(data: any) {
    for (const x of data) {
      this.citis!.options[this.citis!.options.length] = new Option(x.Name, x.Id);
    }
    this.citis!.onchange = () => {
      this.districts!.length = 1;
      this.wards!.length = 1;
      if (this.citis!.value !== "") {
        const result = data.filter((n: any) => n.Id === this.citis!.value);

        for (const k of result[0].Districts) {
          this.districts!.options[this.districts!.options.length] = new Option(k.Name, k.Id);
        }
      }
    };
    this.districts!.onchange = () => {
      this.wards!.length = 1;
      const dataCity = data.filter((n: any) => n.Id === this.citis!.value);
      if (this.districts!.value !== "") {
        const dataWards = dataCity[0].Districts.filter((n: any) => n.Id === this.districts!.value)[0].Wards;

        for (const w of dataWards) {
          this.wards!.options[this.wards!.options.length] = new Option(w.Name, w.Id);
        }
      }
    };
  }

}
