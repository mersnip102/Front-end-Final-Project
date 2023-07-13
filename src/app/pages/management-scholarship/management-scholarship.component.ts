import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { AccountantService } from 'src/app/core/services/accountant-service/accountant.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';



@Component({
  selector: 'app-management-scholarship',
  templateUrl: './management-scholarship.component.html',
  styleUrls: ['./management-scholarship.component.css']
})
export class ManagementScholarshipComponent {
  listScholarship: any;
  totalScholarship = 0;
  verifiedScholarship = 0;

}
