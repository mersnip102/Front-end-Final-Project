import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() eventData!: any
  // {
  //   date: string,
  //   time: string,
  //   title: string,
  //   description: string,
  //   isJoin: boolean,
  // };

  @Output() changeStatus = new EventEmitter<string>();
  
  eventsByStudent: any[] = [];

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

  async confirmEvent(studentId: any, eventId: any, status: any) {

    this.api.confirmEvent(studentId, eventId, status).subscribe(res => {
        console.log(res);
        this.notifyService.successMessage("Chỉnh sửa trạng thái event thành công");

        this.changeStatus.emit("changeStatus");
        this.cdr.detectChanges(); 
      } , error => {
        console.log(error);
        this.notifyService.errorMessage("Chỉnh sửa trạng thái event thất bại");
        
      }
    )

  }

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.profileForm.get('CertificateOfGraduation')!.setValue(file);
  //   }
  // }

  ngOptionsMajors = ["Công Nghệ Thông Tin", "Quản Trị Kinh Doanh", "Thiêt Kế Đồ Họa", "Quản Trị Marketing", "Quản Trị Sự Kiện", "Quản Trị Truyền Thông"];


  ngOptionsProvinceTHPT = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên", "Cần Thơ", "Đà Nẵng", "Hải Phòng", "Hà Nội", "TP HCM"];

  ngOptionsHightSchool = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang"]


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

  editRequest(){
    if(this.editStatus == 0){
      const id = this.route.snapshot.params['ID'];
      const updateAllowEditingStatus = 2;
      
          this.api.updateAllowEditing(id, updateAllowEditingStatus).subscribe(response => {
            // Swal.fire('Saved!', '', 'success')
            // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
            //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
            //     this.toastService.success({ detail: "Success", summary: "Edit Success", duration: 3000 });
            //   });
            // })
            this.changeStatus.emit("abc")
            this.events();
            // this.toastService.success({ detail: "Success", summary: "Request Success", duration: 3000 });

          },
            error => {
              // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([`/students/profilestudent/${this.route.snapshot.params['ID']}`]).then(() => {
              //     console.log(error);
              //     this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
              //   });
              // })
              this.events();
              console.log(error);
              // this.toastService.error({ detail: "Error", summary: error.statusText, duration: 3000 });
            }
          );
        
        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
      
    }
    
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private api: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
   ) {


    const currentYear = new Date().getFullYear() + 5;
    this.years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  } //dependency injection



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

  

  async events() {

    const id = this.route.snapshot.params['ID'];
    await this.api.getEventsByStudent(id
    ).subscribe(async res => {

     console.log(res);

     this.eventsByStudent = await res.events;

      
      
    //   console.log(res);
    //   if(this.editStatus == 0 || this.editStatus == 2){
    //     this.uploadForm.disable();
    //   }
      

    //   localStorage.setItem('studentPhone', d.student.Phone);

    //   let data = await { ...d.student };
    //   console.log(data);

    //   let array = await data.ImageFolder.split('\\')


    //   for (let key in data) {
    //     if (data.hasOwnProperty(key)) {
    //       this.uploadForm.get(key)?.setValue(data[key]);
    //     }

    //   }
    //   this.uploadForm.get('Phone')?.disable();

    //   let birthday = new Date(data.Birthday);
    //   console.log(birthday);
    //   let dateCitizen = new Date(data.DateCitizen);
      
    //   this.uploadForm.get('Birthday')?.setValue(moment(birthday).format('dd-MM-yyyy'));
    //   this.uploadForm.get('DateCitizen')?.setValue(moment(dateCitizen).format('dd-MM-yyyy'));

    // },

    //   error => {
    //     console.log("Error", error);
    //     alert("Error");
    //     // this.router.navigateByUrl('/students');
    //   }

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

  ngOnInit() {

   
   
  }
}
