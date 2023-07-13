import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { PagesComponent } from './pages.component';
import { ManagementFeeComponent } from './management-fee/management-fee.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ConfirmFeeComponent } from './confirm-fee/confirm-fee.component';

import { EmailComponent } from './email/email.component';
import { NewEmailComponent } from './email/new-email/new-email.component';
import { BoxEmailComponent } from './email/box-email/box-email.component';
import { ReadEmailComponent } from './email/read-email/read-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestVerifyFeeComponent } from './request-verify-fee/request-verify-fee.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormGuard } from '../core/guards/form.guard';
import { ChatStudentsComponent } from './chat-students/chat-students.component';
import { ChatAdmissionsComponent } from './chat-admissions/chat-admissions.component';
import { ManagementEventListComponent } from './management-event-list/management-event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAdmissionComponent } from './manage-admission/manage-admission.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ScholarshipProposalComponent } from './schoolarship/scholarship-proposal/scholarship-proposal.component';
import { ManagementScholarshipComponent } from './management-scholarship/management-scholarship.component';

const routes: Routes = [
  {

    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: TestComponent,
      },
      {path: 'scholarship/:Id', component: ScholarshipProposalComponent},

      //Implement component other

      {
        path: 'managementFee',
        component: ManagementFeeComponent,
      },
      {
        path: 'listEvent',
        component: ListEventComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profileStudent/:Id',
        component: ProfileStudentComponent
      },
      {
        path: 'createAccount',
        component: CreateAccountComponent
      },
      {
        path: 'email',
        component: EmailComponent,
        children: [
          {
            path: 'new-email',
            // canDeactivate: [FormGuard]
            component: NewEmailComponent,
          },
          {
            path: 'box-email/:slug',
            component: BoxEmailComponent,
          },
          {
            path: 'read-email/:id',
            component: ReadEmailComponent,
          },
        ],
      },
      {
        path: 'feeVerification',
        component: ConfirmFeeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'requestFeeVerify',
        component: RequestVerifyFeeComponent,
      },
      {
        path: 'listStudent',
        component: ListStudentComponent,
      },
      {
        path: 'chat-students',
        component: ChatStudentsComponent,
      },
      {
        path: 'chat-admissions',
        component: ChatAdmissionsComponent,
      },
      {
        path: 'manage-event-list',
        component: ManagementEventListComponent,
      },
      {
        path: 'create-event',
        component: CreateEventComponent,
      },
      {
        path:'profile-account',
        component: ProfileAccountComponent
      },
      {
        path: 'manage-admission',
        component: ManageAdmissionComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'management-scholarship',
        component: ManagementScholarshipComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
