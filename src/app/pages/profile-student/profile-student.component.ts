import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';
import * as moment from 'moment';
import { NzImageService } from 'ng-zorro-antd/image';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
import Swal from 'sweetalert2';


interface Images {

  CertificateOfGraduation: string,
  TemporaryCertificateOfGraduation: string,
  StudyRecords: string,
  EnglishCertificate: string,
  BirthCertificate: string,
  PortraitImage: string,
  CitizenIdentification: string,
  OtherPapers: string,

}


interface Students {

  FullName: string | null,
  Gender: string | null,
  GraduationYear: string | null,
  LinkFacebook: string | null,
  Email: string | null,
  PhoneNumberFather: string | null,
  NameFather: string | null,
  PhoneNumberMother: string | null,
  NameMother: string | null,
  EmailFather: string | null,
  EmailMother: string | null,

}

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent {
  scholarshipForm!: FormGroup;
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
  dataProvince!: any;
  verifyFee = false;
  sexOptions = [{ name: 'Nam' }, { name: 'Nữ' }];

  majorOptions = [{ name: 'Quản trị marketing' }, { name: 'Kiểm toán' }, { name: 'Kế toán' }];

  cityOptions = [
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
    'Phú Yên',
    'Cần Thơ',
    'Đà Nẵng',
    'Hải Phòng',
    'Hà Nội',
    'TP HCM',
  ];

  // profileForm = this.fb.group({
  //   basicInfo: this.fb.group({
  //     name: 'Nguyễn Xuân Quyền',
  //     nationality: 'Việt Nam',
  //     sex: this.sexOptions[0],
  //     dateOfBirth: '02/12/1998',
  //     placeOfBirth: 'abc',
  //     id: '3423523',
  //     licienseDate: '16/03/2023',
  //     liciensePlace: 'Hà Nội',
  //     phoneNumber: '0379172166',
  //     email: 'mersnip102@gmail.com',
  //     major: this.majorOptions[0],
  //     linkFb: 'test.facebook.com',
  //   }),
  //   highSchoolInfo: this.fb.group({
  //     city: this.cityOptions[0],
  //     graduateYear: '2014',
  //     nameSchool: 'THPT Nguyễn Trãi',
  //   }),
  //   address: this.fb.group({
  //     city: this.cityOptions[0],
  //     district: '',
  //     ward: '',
  //     specificAddress: '',
  //   }),
  //   protector: this.fb.group({
  //     nameProSt: '',
  //     phoneProSt: '',
  //     emailProSt: '',
  //     nameProNd: '',
  //     phoneProNd: '',
  //     emailProNd: '',
  //   }),
  //   brief: this.fb.group({
  //     highSchoolDiploma: '',
  //     highSchoolTranscript: '',
  //     avatar: '',
  //     birthCert: '',
  //     graduationCert: '',
  //     englishCert: '',
  //     idCard: '',
  //     otherDocuments: '',
  //   }),
  // });
  roleUserCurrent!: number;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private localStorageSv: LocalStoreService,
    private renderer2: Renderer2,
    private cdr: ChangeDetectorRef,
    private nzImageService: NzImageService,
    private http: HttpClient,
    private api: AdmissionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService) {
    this.authService.roleUser.subscribe(res => {
      this.roleUserCurrent = res;
    });


  }

  // handleEdit() {
  //   this.profileForm.enable();
  // }

  onFileChange(event: any, fieldName: string) {
    let file: File = event.target.files[0];
    this.formData.append(fieldName, file);

    // console.log(event.srcElement.files[0].name);
    const parent = event.target.parentNode;
    // console.log(event.target.parentNode);
    const test = this.renderer2.createElement('img');
    // const test2 = this.renderer2.createElement('p');
    // this.renderer2.setProperty(test2, 'innerHTML', 'Ảnh thay đổi: ');
    this.renderer2.setProperty(test, 'src', URL.createObjectURL(event.srcElement.files[0]));
    this.renderer2.setStyle(test, 'height', '100px');
    this.renderer2.setStyle(test, 'width', '100px');
    this.renderer2.setStyle(test, 'margin', '25px');

    this.renderer2.insertBefore(parent, test, event.target);
    // this.renderer2.insertBefore(test,test2, event.target);



  }


  handleCancelModalEdit() {
    this.verifyFee = false;
  }
  handleOkEditFee() {

    //get list by select = true
    const listFeeType = this.listFee.filter(x => x.select == true);

    const data = {
      StudentId: this.route.snapshot.params['Id'],
      RequestDate: moment().format('YYYY-MM-DD'),
      PaymentValue: 20000000,
      FeeType: listFeeType
    }

    console.log(data);

    this.notifyService.confirmAdd('Bạn có chắc chắn muốn xác nhận xác minh phí cho học sinh này?').then((result) => {
      if (result) {
        this.api.addPaymentStudent(data).subscribe(response => {
          this.notifyService.successMessage('Gửi xác minh phí thành công');

          this.profile()

        },
          error => {
            console.log(error);
            this.notifyService.errorMessage('Gửi xác minh phí thất bại');
            this.profile()


          }
        );
      }

    });
    this.verifyFee = false;
  }
  show = false;
  showEdit = false;
  handleCancelShow() {
    this.show = false;
    this.showEdit = false;
  }
  handleOkShow() {
    this.show = false;
    this.showEdit = false;
  }


  idStudent!: any

  scholarshipStudent!: any

  scholarshipSelectedValue!: any

  form!: FormGroup;
  formData: FormData = new FormData();

  editStatus!: number;

  profileStatus!: number;

  payments: any[] = [];

  images: Images = {
    CertificateOfGraduation: '',
    TemporaryCertificateOfGraduation: '',
    StudyRecords: '',
    EnglishCertificate: '',
    BirthCertificate: '',
    PortraitImage: '',
    CitizenIdentification: '',
    OtherPapers: '',
  }

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


  onClickImage(imageURL: any): void {
    const image = [
      {
        src: imageURL,
        width: '300px',
        height: '350px',
        alt: 'ng-zorro'
      }
    ]


    this.nzImageService.preview(image, { nzZoom: 1.5, nzRotate: 0 });
  }

  // images: Images = {
  //   CertificateOfGraduation: null,
  //   TemporaryCertificateOfGraduation: null,
  //   StudyRecords: null,
  //   EnglishCertificate: null,
  //   BirthCertificate: null,

  //   PortraitImage: null,
  //   CitizenIdentificationIm: null,
  //   OtherPapers: null,
  // };

  // student: Students = {
  //   FullName: null,
  //   Gender: null,
  //   Birthday: null,
  //   PlaceOfBirth: null,
  //   Nationality: null,
  //   CitizenIdentificationNum: null,
  //   DateCitizenIdentification: null,
  //   PlaceCitizen: null,
  //   GraduationYear: null,
  //   LinkFacebook: null,
  //   Email: null,
  //   PhoneNumberSponsor1: null,
  //   NameSponsor1: null,
  //   PhoneNumberSponsor2: null,
  //   NameSponsor2: null,
  //   EmailSponsor1: null,
  //   EmailSponsor2: null,
  //   CertificateOfGraduation: null,
  // };

  // openModal(imageUrl: string) {
  //   const modalRef = this.modalService.open(ImageModalComponent, { size: 'lg' });
  //   modalRef.componentInstance.imageUrl = imageUrl;
  // }



  // imgSrc?:string;
  // onClick(event: any){
  //   const imgElem = event.target;
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var srcAttr = target.attributes.src;
  //   this.imgSrc = srcAttr.nodeValue;
  //   console.log(this.imgSrc);
  // }

  scholarship() {

    const Id = this.route.snapshot.params['Id'];

    this.api.getStudentById(Id
    ).subscribe(async res => {



      var d = await JSON.parse(res);


      let data = await { ...d.student };
      console.log(data);

      this.api.getScholarshipByStudent(data['Scholarship']).subscribe(async res => {
        console.log(res);

        // TypeScholarship: new FormControl(''),
        // ValueScholarship: new FormControl(''),
        // DatePropose: new FormControl(''),
        // AdmissionId: new FormControl(''),
        // Deadline: new FormControl(''),

        this.scholarshipForm.get('ScholarshipId')?.setValue(res.scholarship[0].Id);
        this.scholarshipForm.get('TypeScholarship')?.setValue(res.scholarship[0].TypeScholarship);
        this.scholarshipForm.get('ValueScholarship')?.setValue(res.scholarship[0].ValueScholarship);
        this.scholarshipForm.get('DatePropose')?.setValue(res.scholarship[0].DatePropose);


        let birthday = moment(new Date(res.scholarship[0].Deadline)).format('YYYY-MM-DD');


        this.scholarshipForm.get('Deadline')?.setValue(birthday);





        this.scholarshipForm.get('AdmissionId')?.setValue(res.scholarship[0].AdmissionId);
      });





      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.scholarshipForm.get(key)?.setValue(data[key]);
        }

      }

      // TypeScholarship: new FormControl(''),
      // ValueScholarship: new FormControl(''),
      // DatePropose: new FormControl(''),
      // AdmissionId: new FormControl(''),
      // Deadline: new FormControl(''),



      this.scholarshipForm.get('EnglishCertificate')?.setValue("Không có");

      this.scholarshipForm.get('AdmissionId')?.setValue(data['Admission']);


    },

      error => {
        console.log("Error", error);
        alert("Error");

      }

    );

  }

  date!: any

  onChange2(result: Date): void {
    console.log('onChange: ', result);
  }

  async scholarshipSubmit() {

    // this.uploadForm.get('DatePropose')?.setValue(new Date().toISOString());
    console.log(this.scholarshipForm.get('TypeScholarship')?.value.name);
    let formData = new FormData();
    //add form group value to form data ignore file
    formData.append('ScholarshipId', this.scholarshipForm.get('ScholarshipId')?.value);
    formData.append('FullName', this.scholarshipForm.get('FullName')?.value);

    formData.append('Email', this.scholarshipForm.get('Email')?.value);
    formData.append('Majors', this.scholarshipForm.get('Majors')?.value);

    formData.append('Phone', this.scholarshipForm.get('Phone')?.value);

    formData.append('EnglishCertificate', this.scholarshipForm.get('EnglishCertificate')?.value);



    const item: any = this.ngScholarship.filter(x => x.value == this.scholarshipForm.get('TypeScholarship')?.value)
    formData.append('TypeScholarship', item[0].name);
    formData.append('ValueScholarship', this.scholarshipForm.get('TypeScholarship')?.value);

    formData.append('DatePropose', new Date((this.scholarshipForm.get('DatePropose')?.value)).toLocaleDateString());


    formData.append('AdmissionId', this.scholarshipForm.get('AdmissionId')?.value);

    formData.append('Deadline', new Date('2023-08-10').toLocaleDateString());


    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });


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
          this.notifyService.successMessage("Thay đổi học bổng thành công");
          this.profile();
          this.scholarshipForm.reset();
        },
          error => {
            console.log(error);
            this.notifyService.errorMessage("Thay đổi học bổng thất bại");
            this.scholarshipForm.reset();
            this.profile();
          }
        );
      }
      // else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    })

    this.show = false;


  }

  updateProfileStatus(status: any) {

    const id = this.route.snapshot.params['Id'];

    this.api.updateEnoughProfile(id, status).subscribe(response => {
      // Swal.fire('Saved!', '', 'success')
      // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
      //     this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });
      //   });
      // })
      this.profile();
      // this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });

    },
      error => {
        // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
        //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
        //     console.log(error);
        //     this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
        //   });
        // })
        this.profile();
        console.log(error);
        // this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
      }
    );

    // else if (result.isDenied) {
    //   Swal.fire('Changes are not saved', '', 'info')
    // }
  }

  updateAllowEditing(status: any) {
    const id = this.route.snapshot.params['Id'];


    this.api.updateAllowEditing(id, status).subscribe(response => {
      // Swal.fire('Saved!', '', 'success')
      // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
      //     this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });
      //   });
      // })
      this.profile();
      // this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });

    },
      error => {
        // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
        //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
        //     console.log(error);
        //     this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
        //   });
        // })
        this.profile();
        console.log(error);
        // this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
      }
    );

    // else if (result.isDenied) {
    //   Swal.fire('Changes are not saved', '', 'info')
    // }
  }

  editRequest() {
    if (this.editStatus == 0) {
      const id = this.route.snapshot.params['Id'];
      const updateAllowEditingStatus = 2;

      this.api.updateAllowEditing(id, updateAllowEditingStatus).subscribe(response => {
        // Swal.fire('Saved!', '', 'success')
        // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
        //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
        //     this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });
        //   });
        // })
        this.profile();
        // this.toastService.success({ detail: "Success", summary: "Request Success", duration: 3000 });

      },
        error => {
          // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
          //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
          //     console.log(error);
          //     this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
          //   });
          // })
          this.profile();
          console.log(error);
          // this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
        }
      );

      // else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }

    }

  }

  // constructor(
  //   private cdr: ChangeDetectorRef,
  //   private scriptLoader: MessagesService,
  //   private http: HttpClient,
  //   private api: ApiService,
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private formBuilder: FormBuilder,
  //   private modalService: NgbModal,
  //   private toastService: NgToastService) {


  //   // this.profileForm =new FormGroup({
  //   //   FullName: new FormControl(''), 
  //   //   CitizenIdentificationNum: new FormControl(''),
  //   //   DateCitizenIdentification: new FormControl(''),
  //   //   PlaceCitizen: new FormControl(''),
  //   //   Gender: new FormControl(''),
  //   //   Birthday: new FormControl(''),
  //   //   PlaceOfBirth: new FormControl(''),
  //   //   Nationality: new FormControl(''),
  //   //   provinceTHPT: new FormControl(''),

  //   //   HightSchool: new FormControl(''),
  //   //   GraduationYear: new FormControl(''),
  //   //   Phone: new FormControl(''),
  //   //   LinkFacebook: new FormControl(''),
  //   //   Majors: new FormControl(''),
  //   //   Email: new FormControl(''),
  //   //   Province: new FormControl(''),
  //   //   District: new FormControl(''),
  //   //   Commune: new FormControl(''),
  //   //   privateAddress: new FormControl(''),
  //   //   NameSponsor1: new FormControl(''),
  //   //   PhoneNumberSponsor1: new FormControl(''),
  //   //   EmailSponsor1: new FormControl(''),
  //   //   NameSponsor2: new FormControl(''),
  //   //   PhoneNumberSponsor2: new FormControl(''),
  //   //   EmailSponsor2: new FormControl(''),

  //   //   CertificateOfGraduation: new FormControl(''),
  //   //   TemporaryCertificateOfGraduation: new FormControl(''),
  //   //   StudyRecords: new FormControl(''),
  //   //   EnglishCertificate: new FormControl(''),
  //   //   BirthCertificate: new FormControl(''),
  //   //   PortraitImage: new FormControl(''),
  //   //   CitizenIdentificationIm: new FormControl(''),
  //   //   OtherPapers: new FormControl(''),
  //   // });

  //   this.uploadForm = this.formBuilder.group({
  //     FullName: new FormControl(''),
  //     Gender: new FormControl(''),
  //     Birthday: new FormControl(''),
  //     PlaceOfBirth: new FormControl(''),
  //     Nationality: new FormControl(''),
  //     DateCitizen: new FormControl(''),
  //     PlaceCitizen: new FormControl(''),
  //     HightSchool: new FormControl(''),
  //     provinceTHPT: new FormControl(''),
  //     Address: new FormControl(''),
  //     GraduationYear: new FormControl(''),
  //     CitizenIdentificationNum: new FormControl(''),
  //     LinkFacebook: new FormControl(''),
  //     Email: new FormControl(''),
  //     PhoneNumberSponsor1: new FormControl(''),
  //     NameSponsor1: new FormControl(''),
  //     PhoneNumberSponsor2: new FormControl(''),
  //     NameSponsor2: new FormControl(''),
  //     EmailSponsor1: new FormControl(''),
  //     EmailSponsor2: new FormControl(''),



  //     CertificateOfGraduation: new FormControl(''),
  //     TemporaryCertificateOfGraduation: new FormControl(''),
  //     StudyRecords: new FormControl(''),
  //     EnglishCertificate: new FormControl(''),
  //     BirthCertificate: new FormControl(''),
  //     PortraitImage: new FormControl(''),
  //     CitizenIdentification: new FormControl(''),
  //     OtherPapers: new FormControl(''),
  //     Phone: new FormControl(''),
  //     Majors: new FormControl(''),
  //   });

  //   const currentYear = new Date().getFullYear() + 5;
  //   this.years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  // } //dependency injection



  // ngOnInit(): void {


  //   // this.profileForm.reset();

  // }



  // onFileSelected(event: Event, fileName: string){
  //   // const file = (event.target as HTMLInputElement).files
  //   // this.profileForm.patchValue({[fileName]: file});
  //   // this.profileForm.get(fileName)?.updateValueAndValidity();

  //   // const reader = new FileReader();
  //   // reader.onload = () => {
  //   //   if(fileName === 'CertificateOfGraduation') {
  //   //     this.student.CertificateOfGraduation = reader.result as string;
  //   //   }
  //   // }

  // }

  listFee: any[] = []

  onChange(event: any) {
    const Id = event.target.value;
    const isChecked = event.target.checked;


    this.listFee = this.listFee.map((item) => {
      if (item.Id == Id) {
        item.select = isChecked;
        return item;
      }
      return item;
    });
    console.log(this.listFee)



  }

  dataImage!: any;

  profile() {

    this.api.getAllFees().subscribe(res => {
      console.log(res);
      this.listFee = res.fee;

    }, error => {
      console.log(error);

    });

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    this.idStudent = this.route.snapshot.params['Id'];


    //get password from localstorage
    // var account: any = localStorage.getItem('account');
    // var phone = JSON.parse(account).Phone;
    // console.log("dsadsds" + phone);

    const Id = this.route.snapshot.params['Id'];





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


    this.api.getStudentById(Id
    ).subscribe(async res => {



      var d = await JSON.parse(res)

      this.payments = d.payments

      this.api.getScholarshipByStudent(d.student.Id).subscribe(async res => {
        this.scholarshipStudent = res.scholarship[0];
        console.log(this.scholarshipStudent);

        this.citis = document.getElementById("city") as HTMLSelectElement;
    this.districts = document.getElementById("district") as HTMLSelectElement;
    this.wards = document.getElementById("ward") as HTMLSelectElement;
    // lay api ra
    await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then(result => {
        this.dataProvince = result.data;
        this.renderCity(result.data);
      });

      }, error => {
        console.log(error);
      });

      this.editStatus = d.student.AllowEditing

      this.profileStatus = d.student.EnoughProfile



      localStorage.setItem('studentPhone', d.student.Phone);

      let data = await { ...d.student };
      this.dataImage = data
      console.log(data);

      let array = await data.ImageFolder.split('\\')




      this.images = {
        CertificateOfGraduation: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.CertificateOfGraduation,
        TemporaryCertificateOfGraduation: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.TemporaryCertificateOfGraduation,
        StudyRecords: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.StudyRecords,
        EnglishCertificate: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.EnglishCertificate,
        BirthCertificate: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.BirthCertificate,
        PortraitImage: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.PortraitImage,
        CitizenIdentification: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.CitizenIdentification,
        OtherPapers: 'http://localhost:3000/' + array.slice(7, array.length).join('/') + '/' + data.OtherPapers,

      }






      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.uploadForm.get(key)?.setValue(data[key]);
        }

      }
      // this.citis!.selectedIndex = this.uploadForm.get('Province')?.value - 1;
      // this.districts!.selectedIndex = this.uploadForm.get('District')?.value -1;
      // this.wards!.selectedIndex = this.uploadForm.get('Commune')?.value - 1;

      // this.uploadForm.get('Phone')?.disable();
      if (this.uploadForm.get('Birthday')?.value != null) {
        let birthday = new Date(data.Birthday);

        let converDate1 = moment(birthday).format('YYYY-MM-DD');
        this.uploadForm.get('Birthday')?.setValue(converDate1);
        console.log(this.uploadForm.get('Birthday')?.value);

      }
      if (this.uploadForm.get('DateCitizen')?.value != null) {
        let dateCitizen = new Date(data.DateCitizen);
        let converDate2 = moment(dateCitizen).format('YYYY-MM-DD');


        this.uploadForm.get('DateCitizen')?.setValue(converDate2);
      }

      if (this.uploadForm.get('GraduationYear')?.value == null) {
        this.uploadForm.get('GraduationYear')?.setValue(null);
      }

      this.renderCity2(this.dataProvince, this.uploadForm.get('Province')?.value, this.uploadForm.get('District')?.value, this.uploadForm.get('Commune')?.value);

      // let birthday = moment.utc(data.Birthday).local().toDate(); // Chuyển đổi chuỗi ngày tháng sang đối tượng Date
      // await this.uploadForm.get('Birthday')?.setValue(moment(birthday).format('YYYY-MM-DD')); // Định dạng lại đối tượng Date và gán giá trị cho trường input


      // let dateCitizen = moment.utc(data.DateCitizen).local().toDate(); // Chuyển đổi chuỗi ngày tháng sang đối tượng Date
      // await this.uploadForm.get('DateCitizen')?.setValue(moment(dateCitizen).format('YYYY-MM-DD')); // Định dạng lại đối tượng Date và gán giá trị cho trường input

      // this.uploadForm.get('FullName')?.setValue(d.student.FullName.toString());
      // this.uploadForm.get('Gender')?.setValue(d.student.Gender.toString());
      // this.uploadForm.get('Birthday')?.setValue(d.student.Birthday.toString());


      // this.ngDropdownMajor = this.profileForm.get('Majors')?.value?.toString();

      // this.images.CertificateOfGraduation = d.student.CertificateOfGraduation;

      // this.images.TemporaryCertificateOfGraduation = d.student.TemporaryCertificateOfGraduation.toString();
      // this.images.StudyRecords = d.student.StudyRecords.toString();
      // this.images.EnglishCertificate = d.student.EnglishCertificate.toString();
      // this.images.BirthCertificate = d.student.BirthCertificate.toString();
      // this.images.PortraitImage = d.student.PortraitImage.toString();
      // this.images.CitizenIdentificationIm = d.student.CitizenIdentification.toString();
      // this.images.OtherPapers = d.student.OtherPapers.toString();



      // alert("Đổi mật khẩu thành công");

      // this.router.navigateByUrl('/students');


      // this.router.navigateByUrl('/students');

      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        console.log("Error", error);

        // this.router.navigateByUrl('/students');
      }

    );

    this.cdr.detectChanges();

  }


  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const controlName = event.target.name;
  //   this.profileForm?.get(controlName)?.setValue(file);
  // }

  UploadProfile() {


    // const formData = new FormData();
    // formData.append('name', this.FullName);
    // formData.append('image1', this.images.image1);
    // formData.append('image2', this.images.image2);

    // console.log(formData.get('CertificateOfGraduation'));
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    // this.http.post('http://localhost:3000/handleUpload', formData, {headers: headers}).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    // //get password from localstorage
    // var account: any = localStorage.getItem('account');
    // var phone = JSON.parse(account).Phone;
    // console.log("dsadsds" + phone);

    // var formData = new FormData();

    // //add form group value to form data

    // formData.append('FullName', this.profileForm.value.FullName!);
    // formData.append('CertificateOfGraduation', this.profileForm.value.CertificateOfGraduation!);
    // console.log(formData.get('CertificateOfGraduation'));

    //   console.log("hii");
    //   this.api.handleUpload(this.route.snapshot.paramMap.get('Id')!, phone, formData
    //   ).subscribe(res => {
    //     alert("Thay đổi thông tin thành công");

    //     // this.router.navigateByUrl('/students/profilestudent');
    //     window.location.reload();
    //   },

    //     error => {
    //         console.log("Error", error);
    //         alert("Error");
    //         this.router.navigateByUrl('/students');
    //     }

    //   );

  }

  //   onFileSelected(event: Event, fieldName: string) {
  //   const input = event.target as HTMLInputElement ;
  //   const file = input.files[0];
  //   this[fieldName] = file;
  // }


  async selectFile(event: any, fieldName: string) {
    // this.selectedFiles = event.target.files;
    // this.formData = new FormData();

    // if (this.selectedFiles!.length > 0) {
    // for (let i = 0; i < this.selectedFiles!.length; i++) {
    //   const file: File = this.selectedFiles![i];
    //   this.formData.append('file[]', file, file.name);
    // }

    let file: File = event.target.files[0];
    this.formData.append(fieldName, file);



    // if (event.target.files.length > 0) {
    //   console.log(event.target.files.length);
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     const file: File = event.target.files[0];
    //     console.log(file);

    //     this.uploadForm.get(fieldName)!.setValue(file);


    //   }
    // }


  }


  // function for filling in pdf form fields
  async fillPDF(pdfSrc: string, data: any) {
    // // read the contents of the PDF file
    // const pdfBytes = await fs.readFile(pdfSrc);
    // // create a PDFDocument object from the buffered data
    // const pdfDoc = await PDFDocument.load(pdfBytes);
    // // get the first page of the PDF file
    // const page: PDFPage = pdfDoc.getPages()[0];

    // // create a font to use for the field values
    // // const fontBytes = await fs.readFile('assets/fonts/OpenSans-Regular.ttf');
    // // const font: PDFFont = await pdfDoc.embedFont(fontBytes);

    // // fill in the form fields with the provided data
    // page.drawText(data.firstName, { x: 45, y: 388, size: 11 });
    // page.drawText(data.lastName, { x: 45, y: 363, size: 11 });
    // page.drawText(data.address, { x: 45, y: 338, size: 11 });
    // page.drawText(data.city, { x: 45, y: 313, size: 11 });

    // // serialize the PDFDocument object to bytes
    // const pdfBytesFilled = await pdfDoc.save();

    // // save the filled-in PDF to a file
    // await fs.writeFile('assets/filled-in-form.pdf', pdfBytesFilled);
  }

  // function to call to fill in the form fields and save the PDF

  async exportPdf() {
    // // Load template PDF from the assets folder
    // const templatePDF = './test.pdf';

    // // Initialize jsPDF instance
    // const doc = new jsPDF();

    // // Set the coordinates (x, y) of the new content on the PDF page
    // const x = 10;
    // const y = 10;

    // // Add new content to the PDF page
    // doc.text('Hello, World!', x, y);

    // // Load the template PDF and add it as a new page to the jsPDF instance
    // // doc.addPage();
    // doc.addFileToVFS(templatePDF, 'test.pdf');
    // // doc.addFont('Helvetica', 'Helvetica', 'normal');
    // // doc.addFont('Helvetica-Bold', 'Helvetica', 'bold');
    // // doc.addImage('template.pdf', 'PDF', 0, 0, 210, 297, '', 'FAST');

    // // Save the PDF and download it
    // doc.save('new-pdf-file.pdf');

    // Load the existing PDF file
    const existingPdfBytes = await fetch('http://localhost:3000/my-pdf-file.pdf').then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Add new data to the PDF file
    const page = pdfDoc.getPage(0);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 16;
    const text = 'New data to be added to the PDF file';
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: 50,
      y: 650,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Save the new PDF file
    const newPdfBytes = await pdfDoc.save();

    // Download the new PDF file
    const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'profile.pdf');
  }

  //   async exportPdf() {
  //     // // Load the existing PDF file
  //     // const url = '/assets/template.pdf';
  //     // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  //     // // Load the PDFDocument
  //     // const pdfDoc = await PDFDocument.load(existingPdfBytes);

  //     // // Get the font to use for adding text
  //     // const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  //     // // Get the first page of the PDF
  //     // const page = pdfDoc.getPages()[0];

  //     // // Add the text to the PDF
  //     // const text = 'Hello World!';
  //     // page.drawText(text, {
  //     //   x: 50,
  //     //   y: 500,
  //     //   size: 50,
  //     //   font,

  //     // });

  //     // // Save the PDF
  //     // const pdfBytes = await pdfDoc.save();

  //     // // Convert the PDF to a blob
  //     // const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  //     // // Create a new jsPDF instance
  //     // const pdf = new jsPDF();

  //     // // Load the blob into the PDF using addPageContent
  //     // const options = {
  //     //   pagesplit: true,
  //     // };
  //     // pdf.addPage();
  //     // pdf.addPageContent(pdfBlob, 0, 0, options);
  //     // // Save the PDF using saveAs
  //     // pdf.save('newPdf.pdf');

  //     const pdfUrl = 'path/to/your/pdf/file.pdf';

  // const pdfDoc = new jsPDF();
  // const pdf = pdfDoc.loadFile(pdfUrl)
  // pdf.text('Hello, world!', 10, 10);
  // pdf.image('path/to/your/image.png', 50, 50, 50, 50);

  // pdf.save('new-file.pdf');


  //   }


  async onSubmit() {
    this.notifyService.confirmAdd('Bạn có chắc chắn muốn lưu thông tin?').then(async (result) => {
      if (result) {

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

        // await this.api.getAStudent(decodedToken.Phone
        // ).subscribe(async res => {
        //   console.log(res);



        //   var d: any = res;
        //   this.editStatus = d.student.AllowEditing

        //   if (this.editStatus == 0 || this.editStatus == 2) {
        //     this.notifyService.warningMessage("Bạn đang không có quyền chỉnh sửa thông tin này");
        //     // this.toastService.warning({duration: 3000, summary: 'You are not authorized to edit this profile.'});
        //     return;
        //   } 

        //add form group value to form data ignore file
        this.formData.append('FullName', this.uploadForm.get('FullName')?.value);
        this.formData.append('Gender', this.uploadForm.get('Gender')?.value);
        if (this.uploadForm.get('Birthday')?.value != null) {

          this.formData.append('Birthday', this.uploadForm.get('Birthday')?.value);
        }
        this.formData.append('PlaceOfBirth', this.uploadForm.get('PlaceOfBirth')?.value);
        this.formData.append('Nationality', this.uploadForm.get('Nationality')?.value);
        this.formData.append('CitizenIdentificationNum', this.uploadForm.get('CitizenIdentificationNum')?.value);
        if (this.uploadForm.get('DateCitizen')?.value != null) {
          this.formData.append('DateCitizen', this.uploadForm.get('DateCitizen')?.value);
        }

        this.formData.append('PlaceCitizen', this.uploadForm.get('PlaceCitizen')?.value);
        this.formData.append('HightSchool', this.uploadForm.get('HightSchool')?.value);
        this.formData.append('provinceTHPT', this.uploadForm.get('provinceTHPT')?.value);
        if (this.uploadForm.get('GraduationYear')?.value != null) {
          this.formData.append('GraduationYear', this.uploadForm.get('GraduationYear')?.value);
        }
        this.formData.append('LinkFacebook', this.uploadForm.get('LinkFacebook')?.value);
        this.formData.append('Email', this.uploadForm.get('Email')?.value);
        this.formData.append('Majors', this.uploadForm.get('Majors')?.value);
        this.formData.append('Commune', this.uploadForm.get('Commune')?.value);
        this.formData.append('District', this.uploadForm.get('District')?.value);
        this.formData.append('Province', this.uploadForm.get('Province')?.value);

        this.formData.append('NameSponsor1', this.uploadForm.get('NameSponsor1')?.value);
        this.formData.append('PhoneNumberSponsor1', this.uploadForm.get('PhoneNumberSponsor1')?.value);
        this.formData.append('NameSponsor2', this.uploadForm.get('NameSponsor2')?.value);
        this.formData.append('PhoneNumberSponsor2', this.uploadForm.get('PhoneNumberSponsor2')?.value);
        this.formData.append('EmailSponsor2', this.uploadForm.get('EmailSponsor2')?.value);
        this.formData.append('EmailSponsor1', this.uploadForm.get('EmailSponsor1')?.value);


        this.formData.append('Address', this.uploadForm.get('Address')?.value);



        // formData.append('FullName', this.uploadForm.get('FullName')?.value);
        // formData.append('Gender', this.uploadForm.get('Gender')?.value);
        // formData.append('Birthday', this.uploadForm.get('Birthday')?.value);
        // formData.append('PlaceOfBirth', this.uploadForm.get('PlaceOfBirth')?.value);
        // formData.append('Nationality', this.uploadForm.get('Nationality')?.value);
        // formData.append('CitizenIdentificationNum', this.uploadForm.get('CitizenIdentificationNum')?.value);
        // formData.append('DateCitizen', this.uploadForm.get('DateCitizen')?.value);
        // formData.append('PlaceCitizen', this.uploadForm.get('PlaceCitizen')?.value);
        // formData.append('provinceTHPT', this.uploadForm.get('provinceTHPT')?.value);
        // formData.append('HightSchool', this.uploadForm.get('HightSchool')?.value);
        // formData.append('CertificateOfGraduation', this.uploadForm.get('CertificateOfGraduation')?.value);
        // formData.append('TemporaryCertificateOfGraduation', this.uploadForm.get('TemporaryCertificateOfGraduation')?.value);
        // formData.append('StudyRecords', this.uploadForm.get('StudyRecords')?.value);
        // formData.append('EnglishCertificate', this.uploadForm.get('EnglishCertificate')?.value);
        // formData.append('BirthCertificate', this.uploadForm.get('BirthCertificate')?.value);
        // formData.append('PortraitImage', this.uploadForm.get('PortraitImage')?.value);
        // formData.append('CitizenIdentification', this.uploadForm.get('CitizenIdentification')?.value);

        // formData.append('OtherPapers', this.uploadForm.get('OtherPapers')?.value);


        const Id = this.route.snapshot.params['Id'];




        this.api.handleUpload(Id, this.formData).subscribe(response => {
          // Swal.fire('Saved!', '', 'success')




          this.notifyService.successMessage("Chỉnh sửa thông tin thành công").then(() => {
            this.profile();
            this.formData = new FormData();
          });
          // this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });



          // this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/pages/profile']).then(() => {
          //     this.notifyService.successMessage("Chỉnh sửa thông tin thành công");
          //     // this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });
          //   });
          // })
        },
          error => {

            this.notifyService.errorMessage(error.message).then(() => {
              this.formData = new FormData();

              console.log(error);
            });

            // this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
            //   this.router.navigate(['/pages/profile']).then(() => {
            //     console.log(error);
            //     this.notifyService.errorMessage("Chỉnh sửa thông tin thất bại");
            //     // this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
            //   });
            // })
          }
        );

        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }


        // if(confirm("Are you sure to edit this student?") ){
        //   this.api.handleUpload(Id, this.formData).subscribe(response => {

        //     // alert("Thay đổi thông tin thành công");

        //     // Reload current page
        //     this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
        //       this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {

        //         this.toastService.success({detail:"Edit success", summary:"Success", duration: 3000});
        //       });


        //       })


        //   },
        //     error => {

        //       alert("Error");
        //       location.reload();
        //     }
        //   );


        // }



        //   if (this.selectedFiles) {
        //     const file: File | null = this.selectedFiles.item(0);

        //     if (file) {
        //       this.currentFile = file;

        //       this.api.handleUpload(formData).subscribe({
        //         next: (event: any) => {
        //           console.log(event);
        //         },
        //         error: (err: any) => {
        //           console.log(err);
        //           this.progress = 0;

        //           if (err.error && err.error.message) {
        //             this.message = err.error.message;

        //           } else {
        //             this.message = 'Could not upload the file!';
        //           }

        //           this.currentFile = undefined;
        //         }
        //       });
        //     }

        //     this.selectedFiles = undefined;

        // }


      }
    }, error => {
      console.log(error);
      this.notifyService.errorMessage(error.error.message);

    });


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



  async ngOnInit() {
    

    this.uploadForm = this.formBuilder.group({
      AccountId: new FormControl(null),
      Address: new FormControl(null),
      Admission: new FormControl(null),
      AdmissionManager: new FormControl(null),
      AllowEditing: new FormControl(null),
      BirthCertificate: new FormControl(null),
      Birthday: new FormControl(null),
      CertificateOfGraduation: new FormControl(null),
      CitizenIdentification: new FormControl(null),
      CitizenIdentificationNum: new FormControl(null),
      Commune: new FormControl(null),
      CoverImage: new FormControl(null),
      DateCitizen: new FormControl(null),
      District: new FormControl(null),
      Email: new FormControl(null),
      EmailSponsor1: new FormControl(null),
      EmailSponsor2: new FormControl(null),
      EnglishCertificate: new FormControl(null),
      EnglishLevel: new FormControl(null),
      EnoughProfile: new FormControl(null),
      FullName: new FormControl(null),
      Gender: new FormControl(null),
      GraduationYear: new FormControl(null),
      HightSchool: new FormControl(null),
      Id: new FormControl(null),
      ImageFolder: new FormControl(null),
      InnitiatedDate: new FormControl(null),
      LeadSoure: new FormControl(null),
      LinkFacebook: new FormControl(null),
      Majors: new FormControl(null),
      NameSponsor1: new FormControl(null),
      NameSponsor2: new FormControl(null),
      Nationality: new FormControl(null),
      OtherPapers: new FormControl(null),
      Phone: new FormControl(null),
      PhoneNumberSponsor1: new FormControl(null),
      PhoneNumberSponsor2: new FormControl(null),
      PlaceCitizen: new FormControl(null),
      PlaceOfBirth: new FormControl(null),
      PortraitImage: new FormControl(null),
      Province: new FormControl(null),
      Scholarship: new FormControl(null),
      SchoolId: new FormControl(null),
      StudyRecords: new FormControl(null),
      TemporaryCertificateOfGraduation: new FormControl(null),
      provinceTHPT: new FormControl(null),
    });

    const currentYear = new Date().getFullYear() + 5;
    this.years = Array.from({ length: 20 }, (_, i) => currentYear - i);

    this.scholarshipForm = this.formBuilder.group({

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

    await this.profile();
    // this.uploadForm
    await this.scholarship()


    // this.uploadForm = this.formBuilder.group({
    //   FullName: null,
    //   Gender: null,
    //   Birthday: null,
    //   PlaceOfBirth: null,
    //   Nationality: null,
    //   CitizenIdentificationNum: null,
    //   DateCitizen: null,
    //   PlaceCitizen: null,
    //   provinceTHPT: null,
    //   HightSchool: null,
    //   CertificateOfGraduation: null,
    //   TemporaryCertificateOfGraduation: null,
    //   StudyRecords: null,
    //   EnglishCertificate: null,
    //   BirthCertificate: null,
    //   PortraitImage: null,
    //   CitizenIdentification: null,
    //   OtherPapers: null,
    // });












    // this.profileForm = this.formBuilder.group({
    //   FullName: null,
    //   CitizenIdentificationNum: null,
    //   DateCitizenIdentification: null,
    //   PlaceCitizen: null,
    //   Gender: null,
    //   Birthday: null,
    //   PlaceOfBirth: null,
    //   Nationality: null,
    //   provinceTHPT: null,

    //   HightSchool: null,
    //   GraduationYear: null,
    //   Phone: null,
    //   LinkFacebook: null,
    //   Majors: null,
    //   Email: null,
    //   Province: null,
    //   District: null,
    //   Commune: null,
    //   privateAddress: null,
    //   NameSponsor1: null,
    //   PhoneNumberSponsor1: null,
    //   EmailSponsor1: null,
    //   NameSponsor2: null,
    //   PhoneNumberSponsor2: null,
    //   EmailSponsor2: null,

    //   CertificateOfGraduation: null,
    //   TemporaryCertificateOfGraduation: null,
    //   StudyRecords: null,
    //   EnglishCertificate: null,
    //   BirthCertificate: null,
    //   PortraitImage: null,
    //   CitizenIdentificationIm: null,
    //   OtherPapers: null,

    // }
    // )
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

  private renderCity2(data: any, city: any, district: any, ward: any) {
    console.log(data);
    for (const x of data) {
      this.citis!.options[this.citis!.options.length] = new Option(x.Name, x.Id);
    }
    //set item selected for city
    this.citis!.value = city;


    this.districts!.length = 1;
    this.wards!.length = 1;
    if (this.citis!.value !== "") {
      const result = data.filter((n: any) => n.Id === this.citis!.value);

      console.log(this.citis!.selectedIndex);
      for (const k of result[0].Districts) {
        this.districts!.options[this.districts!.options.length] = new Option(k.Name, k.Id);
      }
    }
    this.districts!.value = district;


    this.wards!.length = 1;
    const dataCity = data.filter((n: any) => n.Id === this.citis!.value);
    if (this.districts!.value !== "") {
      const dataWards = dataCity[0].Districts.filter((n: any) => n.Id === this.districts!.value)[0].Wards;

      for (const w of dataWards) {
        this.wards!.options[this.wards!.options.length] = new Option(w.Name, w.Id);
      }
      this.wards!.value = ward;
    }

  }
}
function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

