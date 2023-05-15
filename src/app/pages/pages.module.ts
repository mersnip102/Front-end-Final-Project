import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Ng-Zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { BasicLayoutModule } from '../layouts/basic-layout/basic-layout.module';
import { TestComponent } from './test/test.component';
import { ManagementFeeComponent } from './management-fee/management-fee.component';
import { ListEventComponent } from './list-event/list-event.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { ConfirmFeeComponent } from './confirm-fee/confirm-fee.component';
import { EmailComponent } from './email/email.component';
import { NewEmailComponent } from './email/new-email/new-email.component';
import { ReadEmailComponent } from './email/read-email/read-email.component';
import { BoxEmailComponent } from './email/box-email/box-email.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestVerifyFeeComponent } from './request-verify-fee/request-verify-fee.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ListStudentComponent } from './list-student/list-student.component';
import { ProfileComponent } from './profile/profile.component';

import { ChatStudentsComponent } from './chat-students/chat-students.component';
import { ChatAdmissionsComponent, EllipsisPipe } from './chat-admissions/chat-admissions.component';
import { ManagementEventListComponent } from './management-event-list/management-event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAdmissionComponent } from './manage-admission/manage-admission.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScholarshipProposalComponent } from './schoolarship/scholarship-proposal/scholarship-proposal.component';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key: any) => antDesignIcons[key])
@NgModule({
  declarations: [
    PagesComponent,
    TestComponent,
    ManagementFeeComponent,
    ConfirmFeeComponent,
    ListEventComponent,
    EventCardComponent,
    EmailComponent,
    NewEmailComponent,
    ReadEmailComponent,
    BoxEmailComponent,
    DashboardComponent,
    RequestVerifyFeeComponent,
    ListStudentComponent,
    ChatStudentsComponent,
    ChatAdmissionsComponent,
    ManagementEventListComponent,
    CreateEventComponent,
    ProfileAccountComponent,
    ProfileComponent,
    CreateAccountComponent,
    ManageAdmissionComponent,
    ProfileStudentComponent,
    EllipsisPipe,
    ScholarshipProposalComponent
  ],
  imports: [
    [ClipboardModule],
    CommonModule,
    PagesRoutingModule,
    BasicLayoutModule,
    NzCardModule,
    NzDropDownModule,
    NzModalModule,
    NzDatePickerModule,
    NzPaginationModule,
    NzTableModule,
    NzInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzTabsModule,
    NzPopoverModule,
    NzCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzCalendarModule,
    NzBadgeModule,
    NzTimePickerModule,
    NzSelectModule,
    FullCalendarModule,
    NzUploadModule,
    NzImageModule,
    QuillModule.forRoot(),
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class PagesModule {}
