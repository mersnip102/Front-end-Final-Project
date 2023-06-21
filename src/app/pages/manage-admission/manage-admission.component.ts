import { Component } from '@angular/core';
import { Data } from 'popper.js';

@Component({
  selector: 'app-manage-admission',
  templateUrl: './manage-admission.component.html',
  styleUrls: ['./manage-admission.component.css']
})
export class ManageAdmissionComponent {
  listOfData:Array<any> = [];
  deleteModal = false;
  editModal = false;
  addModal = false;
  radioValue = 1;
  ngOnInit(): void {
    this.listOfData = new Array(2).fill(0).map((_, index) => (index));
    console.log(this.listOfData);
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
    this.editModal = false;
  }

  handleCancelAddAdmission() {
    this.addModal = false;
  }

  handleOkAddAdmission() {
    this.addModal = false;
  }

  listOfCurrentPageData: readonly Data[] = [];

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
    console.log(listOfCurrentPageData);
  }

  refreshCheckedStatus(): void {
    
    
    
  }
}
