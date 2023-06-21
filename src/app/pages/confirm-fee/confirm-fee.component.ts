import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { AccountantService } from 'src/app/core/services/accountant-service/accountant.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-confirm-fee',
  templateUrl: './confirm-fee.component.html',
  styleUrls: ['./confirm-fee.component.css']
})
export class ConfirmFeeComponent {
  paymentForm!: FormGroup;
  
  constructor(private i18n: NzI18nService,
    private http: HttpClient,
    private api: AccountantService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService) { }
  listOfData:Array<any> = [];
  deleteModal = false;
  editModal = false;
  radioValue = 1;
  ngFilterStatus = ["Tất cả", "Đã nộp đầy đủ phí ", "Thiếu phí giữ chỗ ", "Thiếu phí xét tuyển ", "Chưa nộp phí"];
  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => (index));
    this.getAllPayment();
    this.paymentForm = this.formBuilder.group({
      Id: [''],
      FeeType: ['', Validators.required],
      Fee: ['', Validators.required],
      SchoolYear: ['', Validators.required],
    });
  }

  handleCancelModalDelete() {
    this.deleteModal = false;
  }

  handleOkDeleteFee() {
    this.deleteModal = false;
  }

  
  handleCancelModalEdit() {
    this.editModal = false;
  }

  

  handleOkEditFee() {
    const data = {
      Id: this.idSelected,
      Status: this.radioValue
    }
    this.api.updatePaymentById(data).subscribe((data: any) => {
      console.log(data);
      this.notifyService.successMessage("Update Successfully");
      this.getAllPayment();
      
    }, error => {
      this.notifyService.errorMessage(error.error.message);
      console.log(error)
      this.getAllPayment();
    })

  
    
    this.editModal = false;
  }


  deletePayment(id: string): void {
   console.log(id);
    this.notifyService.confirmDelete().then((result) => {
      if (result) {


        this.api.deletePamentStudent(id).subscribe((data: any) => {
          
         
          this.notifyService.successMessage("Delete Successfully");
          this.getAllPayment();
        }, error => {
          this.notifyService.errorMessage(error.error.message);
          console.log(error)
        })

      }
    });

  }

  listPayment: any
  pendingPayment = 0
  fullPayment = 0 
  missingPayment=  0
  getAllPayment() {
    this.api.getAllPayment().subscribe((data: any) => {
      this.listPayment = data.payment;
      this.pendingPayment = 0
      this.fullPayment = 0
      this.missingPayment = 0
      this.listPayment.forEach((element: any) => {
        if(element.Status == 0) {
          this.missingPayment += 1;
        }
        if(element.Status == 1) {
          this.fullPayment += 1;
        }
        if(element.Status == 2) {
          this.pendingPayment += 1;
        }
      });


      console.log(data);
    }, error => {
      this.notifyService.errorMessage(error.error.message);

    })
  }
  idSelected!: any;
  editPayment(Id: string) {
    console.log(Id);
    this.editModal = true
    this.idSelected = Id;
   

    // const formData = new FormData();
    // for(let key in this.paymentForm.value) {
      
    //   formData.append(key, this.paymentForm.value[key]);
    // }
    // console.log(Id);
    // console.log(formData.get('SchoolYear'));

   
    // this.editModal = false;
    
    //   this.api.saveFee(Id, formData).subscribe(async res => {
    //     console.log(res);
    //     this.notifyService.successMessage(res.message);
    //     this.getAllPayment();
    //   },
    //   err => {
    //     console.log(err);
    //     this.notifyService.errorMessage(err.message);
        
    //   }
    //   );

    
    
   
  }


  
 
  

}
