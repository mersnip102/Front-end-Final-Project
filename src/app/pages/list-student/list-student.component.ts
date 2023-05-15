import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  year: any = null;

  searchValue = '';
  visible = false;
  listOfAllStudentData: any[] = [];
  listOfEligibleStudentData: any[] = [];
  listOfOverdueStudentData: any[] = [];
  // listOfDisplayData = [...this.listOfData];
  reset(): void { 
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfAllStudentData = this.listOfAllStudentData.filter((item: any) => item.name.indexOf(this.searchValue) !== -1);
  }


  constructor(private localStorageSv: LocalStoreService,
    private fb: FormBuilder, private renderer2: Renderer2,
    private sanitizer: DomSanitizer,
    // private scriptLoader: MessagesService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: AdmissionService,
    private notifyService: NotifyService) { }

  ngOnInit(): void {
    // this.listOfAllStudentData = new Array(100).fill(0).map((_, index) => (index));
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));


    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: this.semester,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      fee: this.checkOptionsListStudentTwo.filter((item: any) => item.checked === true).map((item: any) => item.value),
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }
    this.all(data);
    this.profileOverdue(data);
    this.profileEligible(data);
  }

  showProfile(Id: any) {
    this.router.navigate([`/pages/profileStudent/${Id}`]);
  }




  selectedValue: any = null;

  // log(event: any) {
  //   console.log(event);
  // }

  semester: any = null

  checkOptionsListStudentOne = [
    { label: 'Chưa đủ hồ sơ', value: 0 },
    { label: 'Đã đủ hồ sơ', value: 1 },
    { label: 'Quản lý đã xác nhận', value: 2 },
    { label: 'Hồ sơ quá hạn', value: 4 }
  ];

  checkOptionsListStudentTwo = [
    { label: 'Đã nộp đủ phí', value: 0 },
    { label: 'Chưa nộp đủ phí', value: 1 },

  ];


  checkOptionsListStudentThree = [
    { label: 'Online', value: "Online" },
    { label: 'Direct', value: "Direct" },
    { label: 'Database', value: "Database" },
    { label: 'Referral', value: "Referral" },
    { label: 'Internals', value: "Internals" },
    { label: 'Online Mass', value: "Online Mass" },
    { label: 'Other', value: "Other" },

  ];

  log(value: object[]): void {
    console.log(value);
    console.log(this.semester);
    console.log(this.year);
  }

  form!: FormGroup;
  formData: FormData = new FormData();

  payments: any[] = [];

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


  filterAll() {
    // const filterValue = value.toLowerCase();
    // return this.ngOptionsProvinceTHPT.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    // get value property of checkOptionsListStudentOne if checked property = true
    // const checkedItems = this.checkOptionsListStudentOne.filter((item: any) => item.checked).map((item: any) => item.value);


    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));


    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: this.semester,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      fee: this.checkOptionsListStudentTwo.filter((item: any) => item.checked === true).map((item: any) => item.value),
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.all(data);
  }

  getValueYearChangeAll(result: Date) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: result,
      semester: this.semester,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      fee: this.checkOptionsListStudentTwo.filter((item: any) => item.checked === true).map((item: any) => item.value),
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }
    console.log(data);
    this.all(data);

  }

  getValueSemesterChangeAll(event: any) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: event,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      fee: this.checkOptionsListStudentTwo.filter((item: any) => item.checked === true).map((item: any) => item.value),
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.all(data);

  }

  filterEligible() {
    // const filterValue = value.toLowerCase();
    // return this.ngOptionsProvinceTHPT.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    // get value property of checkOptionsListStudentOne if checked property = true
    // const checkedItems = this.checkOptionsListStudentOne.filter((item: any) => item.checked).map((item: any) => item.value);


    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));


    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: this.semester,

      
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.profileEligible(data);
  }

  getValueYearChangeEligible(result: Date) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: result,
      semester: this.semester,

     
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }
    console.log(data);
    this.profileEligible(data);

  }

  getValueSemesterChangeEligible(event: any) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: event,

      
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.profileEligible(data);

  }


  filterOverdue() {
    // const filterValue = value.toLowerCase();
    // return this.ngOptionsProvinceTHPT.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    // get value property of checkOptionsListStudentOne if checked property = true
    // const checkedItems = this.checkOptionsListStudentOne.filter((item: any) => item.checked).map((item: any) => item.value);


    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));


    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: this.semester,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.profileOverdue(data);
  }

  getValueYearChangeOverdue(result: Date) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: result,
      semester: this.semester,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
      
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }
    console.log(data);
    this.profileOverdue(data);

  }

  getValueSemesterChangeOverdue(event: any) {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

    let data = {
      Id: decodedToken.Infor.Id,
      role: decodedToken.Role,
      year: this.year,
      semester: event,

      profile: this.checkOptionsListStudentOne.filter((item: any) => item.checked === true).map((item: any) => item.value),
     
      leadSoure: this.checkOptionsListStudentThree.filter((item: any) => item.checked === true).map((item: any) => item.value),
    }

    this.profileOverdue(data);

  }



  async all(data: any) {
    this.listOfAllStudentData = [];
    // let listTemp: any[] = []


    // this.listOfAllStudentData.filter((item: any) => {
    //   item.studentId 
    // })


    await this.api.getListStudent(data
    ).subscribe(async (res: any) => {
     
      

      this.listOfAllStudentData = res.students
      // const uniqueValues = new Set(this.listOfAllStudentData.map((v: any) => v.studentId));
      // console.log(uniqueValues);

      const result = Object.values(
        this.listOfAllStudentData.reduce((acc: any, item: any) => {
          if (!acc[item.studentId]) {
            acc[item.studentId] = {
              ...item,
              StatusArr: [item.Status]
            };
          } else {
            acc[item.studentId].StatusArr.push(item.Status);
          }
          return acc;
        }, {})
      );
      
     
      this.listOfAllStudentData = result;
     
      this.listOfAllStudentData.map((item: any) => {
        if(item.StatusArr.includes(0)){
          item.StatusFee = 0
      } else if(item.StatusArr.length == 1) {
        item.StatusFee = 0
      } else {
        item.StatusFee = 1
      }
    }

      )
      console.log(this.listOfAllStudentData);
    

    },

      error => {
        console.log("Error", error);
        this.notifyService.errorMessage(error.error.message);
        // this.router.navigateByUrl('/students');
      }

    );

  }

  async profileEligible(data: any) {

    this.listOfEligibleStudentData = [];
    // let listTemp: any[] = []


    // this.listOfAllStudentData.filter((item: any) => {
    //   item.studentId 
    // })


    await this.api.getListStudentEnoughProfile(data
    ).subscribe(async (res: any) => {
     
      

      this.listOfEligibleStudentData = res.students
      // const uniqueValues = new Set(this.listOfAllStudentData.map((v: any) => v.studentId));
      // console.log(uniqueValues);

      const result = Object.values(
        this.listOfEligibleStudentData.reduce((acc: any, item: any) => {
          if (!acc[item.studentId]) {
            acc[item.studentId] = {
              ...item,
              StatusArr: [item.Status]
            };
          } else {
            acc[item.studentId].StatusArr.push(item.Status);
          }
          return acc;
        }, {})
      );
      
     
      this.listOfEligibleStudentData = result;
     
      this.listOfEligibleStudentData.map((item: any) => {
        if(item.StatusArr.includes(0)){
          item.StatusFee = 0
      } else if(item.StatusArr.length == 1) {
        item.StatusFee = 0
      } else {
        item.StatusFee = 1
      }
    }

      )
      console.log(this.listOfEligibleStudentData);
    

    },

      error => {
        console.log("Error", error);
        this.notifyService.errorMessage(error.error.message);
        // this.router.navigateByUrl('/students');
      }

    );

  }

  async profileOverdue(data: any) {

    this.listOfOverdueStudentData = [];
    // let listTemp: any[] = []


    // this.listOfAllStudentData.filter((item: any) => {
    //   item.studentId 
    // })


    await this.api.getListStudentOutOfDate(data
    ).subscribe(async (res: any) => {
     
      

      this.listOfOverdueStudentData = res.students
      // const uniqueValues = new Set(this.listOfAllStudentData.map((v: any) => v.studentId));
      // console.log(uniqueValues);

      const result = Object.values(
        this.listOfOverdueStudentData.reduce((acc: any, item: any) => {
          if (!acc[item.studentId]) {
            acc[item.studentId] = {
              ...item,
              StatusArr: [item.Status]
            };
          } else {
            acc[item.studentId].StatusArr.push(item.Status);
          }
          return acc;
        }, {})
      );
      
     
      this.listOfOverdueStudentData = result;
     
      this.listOfOverdueStudentData.map((item: any) => {
        if(item.StatusArr.includes(0)){
          item.StatusFee = 0
      } else if(item.StatusArr.length == 1) {
        item.StatusFee = 0
      } else {
        item.StatusFee = 1
      }
    }

      )
      console.log(this.listOfOverdueStudentData);
    

    },

      error => {
        console.log("Error", error);
        this.notifyService.errorMessage(error.error.message);
        // this.router.navigateByUrl('/students');
      }

    );
  }


}


