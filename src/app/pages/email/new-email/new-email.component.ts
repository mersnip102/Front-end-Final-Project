import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GSafeData } from 'src/app/core/models/utils/safe-data.interface';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css'],
})
export class NewEmailComponent implements OnInit, GSafeData {
  htmlContent = '';
  newEmailForm!: FormGroup;
  initValueForm: any;

  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block'],
    ],
  };
  styles = {
    height: '10rem',
  };


  

  initForm() {
    this.newEmailForm = this.fb.group({
      emailTo: ['', Validators.required],
      subjectEmail: ['', Validators.required],
      htmlContent: [''],
    });
    this.initValueForm = this.newEmailForm.value;
  }

  navigatorBack() {
    this.router.navigate(['/pages/email/box-email/inbox']);
  }

  closeNewEmail() {
    this.deleteNewEmail();
  }

  isDataSaved(): boolean {
    // return !this.newEmailForm.dirty;
    return true;
  }

  sendNewEmail() {
    console.log(this.newEmailForm.value);
  }
  deleteNewEmail() {
    if (!this.emailForm.dirty && this.emailForm.value.text.trim() === '') {
      this.navigatorBack();
    } else {
      this.notifyService
        .notifyConfirm({
          title: 'Are you sure?',
          text: 'Delete changes and exit',
          icon: 'info',
        })
        .then((confirm: any) => {
          console.log(confirm);
          if (confirm && confirm.value) {
            this.navigatorBack();
          }
        });
    }
  }


  emailForm!: FormGroup;
  // attachments: File[] = [];

  constructor(
    
    
    
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: AdmissionService,
    private router: Router) {
      this.emailForm = this.fb.group({
        to: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        text: new FormControl('', Validators.required),
        emailFile: new FormControl(null),
        attachments: new FormControl(null)
      });
     }
  sendEmail(): void {
    // const formData = new FormData();
    let emailsArrTo!: any
    this.getEmailsFromString(this.emailForm.get('to')?.value);
    // if(this.emailForm.get('to')?.value != null && this.emailForm.get('to')?.value != undefined && this.emailForm.get('to')?.value != ''){
    //   emailsArrTo =this.emailForm.get('to')?.value.split(',').map((email: any) => email.trim());
      
    // }
    let emailList: string[] = [];
    // emailList.push(...this.emailListFile);
    // emailList.push(...emailsArrTo);
    console.log(this.emailListFile);
    
  
    // const data = {
    //   to: this.emailListFile,
    //   subject: this.emailForm.get('subject')?.value,
    //   text: this.emailForm.get('text')?.value,
     
    // };


    // // this.notifyService.notifyConfirm({
    // //   title: 'Are you sure?',
    // //   text: 'Send email to users',
    // //   icon: 'info',
    // // })
    // // .then(result => {
    // //   if (result.isConfirmed) {

    // //     return true;
    // //   } else {
    // //     return false;
    // //   }
    // // });

 
    // this.notifyService.confirmAdd('Bạn có chắc chắn muốn gửi email?').then((result) => {
    //   if (result) {

    //     this.api.sendEmail(data).subscribe(response => {
    //       console.log(response);
    
    //       this.notifyService.successMessage('Gửi email thành công');
          
    //         // this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
    //         //   this.router.navigate(['/admissions/email/newemail']).then(() => {
                
    //         //     // this.toastService.success({detail:"Send success", summary:"Success", duration: 3000});
    //         //   });
      
      
    //         //   })
    
    
         
    //       console.log(response);
    //       this.emailForm.reset();
    //       // this.attachments = [];
    
    //     }, error => {
    //       console.log(error);
    //       this.notifyService.errorMessage('Gửi email thất bại');
         
          
    //     });

    //   }
    // });

    
    // formData.append('to', this.emailList);
    // formData.append('subject', this.emailForm.get('subject')?.value);
    // formData.append('text', this.emailForm.get('text')?.value);
    // for (let i = 0; i < this.attachments.length; i++) {
    //   formData.append('attachments[]', this.attachments[i], this.attachments[i].name);
    // }
    
   

    
    
  }
  ngOnInit(): void {

    
      this.initForm();
    
    

  }

  // ngOnInit() {
  //   this.emailForm = this.fb.group({
  //     to: ['', Validators.required],
  //     subject: ['', Validators.required],
  //     body: ['', Validators.required],
  //     attachments: [null, Validators.required]
  //   });
  // }

  // sendEmail() {
  //   const formData = new FormData();
  //   formData.append('to', this.emailForm.get('to')?.value);
  //   formData.append('subject', this.emailForm.get('subject')?.value);
  //   formData.append('body', this.emailForm.get('body')?.value);
  //   for (let i = 0; i < this.attachments.length; i++) {
  //     formData.append('attachments[]', this.attachments[i], this.attachments[i].name);
  //   }
  //   this.http.post('/api/sendEmail', formData).subscribe(response => {
  //     console.log(response);
  //     this.emailForm.reset();
  //     this.attachments = [];
  //   });
  // }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   this.emailForm.get('attachments')?.setValue(file);
  // }

  // onDrop(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const files = event.dataTransfer.files;
  //   for (let i = 0; i < files.length; i++) {
  //     this.attachments.push(files[i]);
  //   }
  //   this.emailForm.get('attachments')?.setValue(this.attachments);
  // }

  // onDragOver(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.readExcelFile(file);

    console.log(this.emailListFile);
  }

  getEmailsFromString(inputString: string): string[] {
    
    // Tách các địa chỉ email bằng cách sử dụng regex
    const regex = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/g;
    const matches = inputString.match(regex);
  
    // Loại bỏ dấu cách đầu và cuối (nếu có)
    const trimmedMatches = matches?.map((match) => match.trim()) || [];
    trimmedMatches.forEach((match) => {
      this.emailListFile.includes(match) ? null : this.emailListFile.push(match);
    });


    // //add trimmedMatches to emailList
    // this.emailListFile?.push(...trimmedMatches);
  
    return trimmedMatches;
  }

  emailListFile: string[] = [];

  readExcelFile(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (event: any) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // lấy sheet đầu tiên 
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as []; // XLSX.utils.sheet_to_json(worksheet, { header: 1 }) để chuyển đổi dữ liệu từ worksheet sang mảng các dòng dữ liệu, bỏ qua dòng 1 (header).
      this.emailListFile = [];
      for(let i = 0; i < rows.length; i++) {
        console.log(rows[i][0]);
        if(rows[i][0] != undefined) {
          
          this.emailListFile?.push(rows[i][0]);
        }
        
        
      }
    };
    fileReader.readAsBinaryString(file); //fileReader.readAsBinaryString(file) để đọc nội dung của file Excel. Phương thức này sẽ đọc nội dung của file Excel và kích hoạt sự kiện onload khi quá trình đọc hoàn tất.
  }
}
