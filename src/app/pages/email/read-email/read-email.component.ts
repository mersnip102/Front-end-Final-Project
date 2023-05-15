import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-read-email',
  templateUrl: './read-email.component.html',
  styleUrls: ['./read-email.component.css'],
})
export class ReadEmailComponent implements OnInit {
  idEmail!: string;
  constructor(public ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.idEmail = params['id'];
    });
  }
}
