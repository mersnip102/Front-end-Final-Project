import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  listOfData:Array<any> = [];
  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => (index));
  }
}
