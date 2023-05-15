import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-box-email',
  templateUrl: './box-email.component.html',
  styleUrls: ['./box-email.component.css'],
})
export class BoxEmailComponent implements OnInit {
  isInboxEmail = true;
  dataInbox = [
    {
      id: '123',
      content: 'It is a long established fact that a reader will be distracted by the readable...',
      date: '5:56 PM',
    },
    {
      id: '1233123123',
      content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit...',
      date: 'Oct 22',
    },
    {
      id: '12356',
      content: 'It is a long established fact that a reader will be distracted by the readable...',
      date: 'Oct 22',
    },
  ];



  dataSent = [
    {
      id: '123',
      content: 'Dân chơi sợ bug',
      date: '11:12 AM',
    },
  ];
  constructor(public router: Router, public ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      if (params['slug'] === 'inbox') {
        this.isInboxEmail = true;
      } else {
        this.isInboxEmail = false;
      }
    });
  }
}
