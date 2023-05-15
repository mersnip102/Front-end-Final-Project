import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { AccountantService } from 'src/app/core/services/accountant-service/accountant.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-management-fee',
  templateUrl: './management-fee.component.html',
  styleUrls: ['./management-fee.component.css']
})
export class ManagementFeeComponent implements OnInit {
  titleFee = "Học phí";
  amount = '9.500.000';
  time = '22/04/2023';
  data = [1, 2, 3, 4, 5, 6, 7];
  isVisible = false;
  deleteModal = false;
  editModal = false;

  
  showModal(id: any): void {
    if(id == '' || id == undefined || id == null) {
      this.isVisible = true;
      this.editModal = false;
      this.feeForm.reset();
      

    } else {
      this.isVisible = false;
      this.editModal = true;
      this.api.getFeeById(id).subscribe((data: any) => {
        data.fee.SchoolYear = new Date(Date.parse(data.fee.SchoolYear))
        this.feeForm.patchValue(data.fee);
        
        
      
      }, error => {
        this.notifyService.errorMessage(error.error.message);
      }
      )
    }
    

  }
 

  handleCancel(): void {
    
    this.isVisible = false;
    this.editModal = false;
  }

  handleCancelModalDelete() {
    this.deleteModal = false;
  }

  handleOkDeleteFee() {
    this.deleteModal = false;
    this.isVisible = false;


  }



  date = null;
  isEnglish = false;

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private api: AccountantService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService) {




  } //dependency injection) {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }



  deleteFee(id: string): void {

    this.notifyService.confirmDelete().then((result) => {
      if (result) {


        this.api.deleteFee(id).subscribe((data: any) => {
          console.log('Item deleted!');
          console.log(data);
          this.getAllFee();
          this.notifyService.successMessage("Delete Successfully");
        })

      } else {

        console.log('Delete cancelled.');
      }
    });

  }

  listFee: any
  getAllFee() {
    this.api.getAllFee().subscribe((data: any) => {
      this.listFee = data.fee;
      console.log(data);
    }, error => {

    })
  }

  saveFee(Id: string) {
    const formData = new FormData();
    for(let key in this.feeForm.value) {
      
      formData.append(key, this.feeForm.value[key]);
    }
    console.log(Id);
    console.log(formData.get('SchoolYear'));

    this.isVisible = false;
    this.editModal = false;
    
      this.api.saveFee(Id, formData).subscribe(async res => {
        console.log(res);
        this.notifyService.successMessage(res.message);
        this.getAllFee();
      },
      err => {
        console.log(err);
        this.notifyService.errorMessage(err.message);
        
      }
      );

    
    
   
  }


  
  feeForm!: FormGroup;
  ngOnInit() {
    this.getAllFee();
    this.feeForm = this.formBuilder.group({
      Id: [''],
      FeeType: ['', Validators.required],
      Fee: ['', Validators.required],
      SchoolYear: ['', Validators.required],
    });


  }
}
