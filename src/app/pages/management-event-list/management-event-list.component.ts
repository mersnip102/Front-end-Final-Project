import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { map, pipe } from 'rxjs';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

interface Event {
  id: string,
  title: string,
  start: string,
  end: string,
  editable: boolean,
}
@Component({
  selector: 'app-management-event-list',
  templateUrl: './management-event-list.component.html',
  styleUrls: ['./management-event-list.component.css'],
})
export class ManagementEventListComponent {
  listDataMap = {
    eight: [{ type: 'warning', content: 'Sự kiên chào sinh viên' }],
    ten: [{ type: 'warning', content: 'Ngày hôi việc làm' }],
    eleven: [{ type: 'success', content: 'This is very long usual event........' }],
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  visible: boolean = false;
  deleteModal = false;
  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  pressDel(id: any) {
    this.notifyService.confirmDelete().then((result) => {
      if (result) {
        this.api.deleteEvent(id).subscribe((data: any) => {
          this.notifyService.successMessage('Xóa event thành công');
          this.getAllEvent();
        }, error => {
          this.notifyService.errorMessage(error.error.message);
        });

      }
    });
  }

  handleCancelModalDelete() {
    this.deleteModal = false;
  }
  handleOkDeleteFee() {
    this.deleteModal = false;
  }

  detailEvent = false;

  listOfData: Array<any> = [];
  // ngOnInit(): void {
  //   this.listOfData = new Array(100).fill(0).map((_, index) => index);
  // }

  handleCancelVeiwDetail() {
    this.detailEvent = false;
  }
  handleOkViewDetail() {
    this.detailEvent = false;
  }

  deleteStudentModal = false;
  handleCancelStudentDelete() {
    this.deleteStudentModal = false;
  }
  handleOkStudentModal() {
    this.deleteStudentModal = false;
  }


  events: any[] = [];

  Role!: any 

  handleEventClick(arg: EventClickArg) {
    // code xử lý sự kiện click ở đây
    console.log('Event clicked:', arg.event.id);
    // this.router.navigate(['/admissions/addstudentevent', arg.event.id]);
   this.detailAnEvent(arg.event.id);
      
  }

  getAllEvent(): any {
    // this.api.getAllevents().subscribe((data: any) => {
    //   this.events = [];
    
    //   for (let i = 0; i < data.events.length; i++) {
    //   //   let startDateString = data.events[i].StartDate;
    //   // let startDate = new Date(startDateString);
    //   // // Chuyển đổi sang múi giờ GMT+7
    //   // startDate.setHours(startDate.getHours() + 7);

    //   // let endDateString = data.events[i].EndDate;
    //   // let endDate = new Date(endDateString);
    //   // // Chuyển đổi sang múi giờ GMT+7
    //   // endDate.setHours(startDate.getHours() + 7);

     

     
    //     this.events.push({
    //       id: data.events[i].Id,
    //       title: data.events[i].Name,
    //       start: data.events[i].StartDate,
    //       end: data.events[i].EndDate,
    //       Tickets: data.events[i].Tickets,
    //       Expense: data.events[i].Expense,
    //       Description: data.events[i].Description,
    //       editable: true,
    //     });
    //   }
    //   console.log(this.events);

    //   this.calendarOptions.events = this.events;
    // }, (error: any) => {
    //   console.log(error);
    // });
    this.api.getAllevents()
    .pipe(map((products: any) => {
      return products.events.map((product: any) => ({
        ...product,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }));
    }))
    .subscribe((data: any) => {
      this.events = [];
      console.log(data);
    
      for (let i = 0; i < data.length; i++) {
      //   let startDateString = data.events[i].StartDate;
      // let startDate = new Date(startDateString);
      // // Chuyển đổi sang múi giờ GMT+7
      // startDate.setHours(startDate.getHours() + 7);

      // let endDateString = data.events[i].EndDate;
      // let endDate = new Date(endDateString);
      // // Chuyển đổi sang múi giờ GMT+7
      // endDate.setHours(startDate.getHours() + 7);

     

     
        this.events.push({
          id: data[i].Id,
          title: data[i].Name,
          start: data[i].StartDate,
          end: data[i].EndDate,
          Tickets: data[i].Tickets,
          Expense: data[i].Expense,
          Description: data[i].Description,
          backgroundColor: data[i].backgroundColor,
          editable: true,
        });
      }
      console.log(this.events);

      this.calendarOptions.events = this.events;
    }, (error: any) => {
      console.log(error);
    });
  }
  ngOnInit(): void {

    const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.localStoreService.getLocalStorageItemAsJSON("accessToken"));
        console.log(decodedToken);
        this.Role = decodedToken.Role;

    this.getAllEvent();

    // this.getStudentsToEvent();
    // this.getStudentEvent()
    
      
  }
  ngSemester = [  "Tất Cả", "Spring Part 1", "Spring Part 2", "Summer Part 1", "Summer Part 2", "Fall Part 1", "Fall Part 2",];
  constructor(
    private localStoreService: LocalStoreService,
    private http: HttpClient,
    private api: AdmissionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
    ) {

  } 
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // sử dụng plugin dayGridPlugin
      initialView: 'dayGridMonth', // hiển thị lịch theo tháng
      // eventBackgroundColor: '#0000FF', // màu nền của sự kiện

      events: [
        // {
        //   title: 'Sự kiện 1',
        //   start: '2023-03-10', // ngày bắt đầu sự kiện
        //   end: '2023-03-15' // ngày kết thúc sự kiện
        // },
        // {
        //   title: 'Sự kiện 2',
        //   start: '2023-03-15', // ngày bắt đầu sự kiện
        //   end: '2023-03-17' // ngày kết thúc sự kiện
        // }
      ],
      eventClick: this.handleEventClick.bind(this)
    
  };


  isShowFilter= false;
  isFilterXacNhan = false;
  isFilterPhi = false;
  isFilterHoso = false;

  parentSelector : boolean = false;

  listStudent: any[] = [];

  listStudentEvent: any[] = [];
  
 
  addStudentsToEvent(id: any){
    this.notifyService.confirmAdd('Bạn có chắc chắn muốn thêm sinh viên vào sự kiện này?').then((result) => {
      if(result) {
      
      const listAdd = this.listStudent.filter((item) => item.select == true);
     
      this.api.addStudentsToEvent(id, listAdd).subscribe((res: any) => {
        this.detailAnEvent(id);
        
        
       
      }, (err) => {
        this.notifyService.errorMessage('Add student to event failed');
       
      })
    }
    }
    
    
    )
}

  deleteStudentToEvent(id: string){
    if(confirm('Are you sure to delete this student from this event?')){
      const idEvent = this.route.snapshot.paramMap.get('id') as string;
      const student = this.listStudentEvent.filter((item) => item.Id == id);
      console.log(student)
      this.api.deleteStudentsToEvent(idEvent, student).subscribe((res: any) => {
        
        this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
          this.router.navigate([`/admissions/addstudentevent/${this.route.snapshot.params['id']}`]).then(() => {
            
          
          });
          })
        
       
      }, (err) => {
       
      })
    }

  }

  onChange(event: any){
    const Id = event.target.value;
    const isChecked = event.target.checked;
    console.log(isChecked)
    
    this.listStudent = this.listStudent.map((item) => {
      if (item.Id == Id) {
        item.select = isChecked;
        this.parentSelector ==false
        return item;
      }
      if(Id == -1) {
        item.select = this.parentSelector;
        return item

      }
      return item;
    });

    console.log(this.listStudent)
    
  }
  checkboxForm!: FormGroup;
  items: any[] = [];
  // checkedItems: Item[] = [];
  selectedItems: any[] = [];

  // selectAll(isChecked: boolean) {
  //   this.selectedItems = []; // clear the selected items array
  //   this.items.forEach(item => item.isSelected = isChecked);
  // }

  // onItemSelect(item: any, isChecked: boolean) {
  //   item.isSelected = isChecked;
  //   if (isChecked) {
  //     this.selectedItems.push(item);
  //   } else {
  //     const index = this.selectedItems.indexOf(item);
  //     if (index >= 0) {
  //       this.selectedItems.splice(index, 1);
  //     }
  //   }
  //   // this.updateMasterCheckbox();
  // }
  


  
  onSubmit() {
    // // Lấy ra FormArray checkboxes và sử dụng phương thức getRawValue để lấy ra mảng các giá trị của các checkbox đã chọn
    // const checkboxes = this.checkboxForm.get('checkboxes') as FormArray;
    // const checkedItems = checkboxes.getRawValue().map((value, index) => {
    //   if (value) {
    //     return this.items[index];
    //   }
    // }).filter(item => item);

    // // Lưu trữ các giá trị của các checkbox đã chọn vào mảng checkedItems
    // this.checkedItems = checkedItems;
    // console.log(this.checkedItems);
  }

  getStudentEvent(id: any) {
    this.detailEvent = !this.detailEvent;
    this.visible = false;

    const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.localStoreService.getLocalStorageItemAsJSON("accessToken"));
        
       

    const data = {
      AdId: decodedToken.Infor.Id,
      Role: this.Role,
      eventID: id
    }

    console.log(data)
    
    this.api.getStudentEvent(data).subscribe(response => {
      console.log(response);
      this.listStudentEvent = [];
      response.students.forEach((element: any) => {
        element.select = false;
        this.listStudentEvent.push(element);
      });

      
  
        // this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/admissions/email/newemail']).then(() => {
            
        //     this.toastService.success({detail:"Send success", summary:"Success", duration: 3000});
        //   });
  
  
        //   })
     
      
      // this.emailForm.reset();
      // this.attachments = [];

    }, error => {
      console.log(error);
      // this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/admissions/event']).then(() => {
          
          
      //   });


      //   })
    });
  }



  event: any
 detailAnEvent(id: any): void {

     this.api.getEventById(id).subscribe((res: any) => {
      this.event = res.event;
      console.log(res)
      this.visible = true;
      this.detailEvent = true
      

      this.getStudentsToEvent(id);
      this.getStudentEvent(id);
    }, (err) => {
      console.log(err)
      this.notifyService.errorMessage("Get event error")
    })
    
   
   

  }
 
  getStudentsToEvent(id: any): void {
    
    this.detailEvent = !this.detailEvent;
    this.visible = false;

    const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.localStoreService.getLocalStorageItemAsJSON("accessToken"));
        
       

    const data = {
      AdId: decodedToken.Infor.Id,
      Role: this.Role,
      eventID: id
    }

    console.log(data)
    
    
    this.api.getStudentsToEvent(data).subscribe(response => {
      
      console.log(response);
      this.listStudent = [];
      response.students.forEach((element: any) => {
        element.select = false;
        this.listStudent.push(element);
      });
  
        // this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/admissions/email/newemail']).then(() => {
            
        //     this.toastService.success({detail:"Send success", summary:"Success", duration: 3000});
        //   });
  
  
        //   })
     
     
      // this.emailForm.reset();
      // this.attachments = [];

    }, error => {
      console.log(error);
      // this.router.navigateByUrl('/admissions', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/admissions/event']).then(() => {
          
         
      //   });


      //   })
    });
  }

}
