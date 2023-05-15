import { Injectable } from '@angular/core';
import { interval, take } from 'rxjs';
import Swal from 'sweetalert2';
import { INotifyModel } from '../../models/notify.model';
import {
  COLOR_BTN_CANCEL,
  COLOR_BTN_CONFIRM,
  PREFIX_MESSAGE,
  TEXT_BTN_CANCEL,
  TEXT_BTN_CONFIRM,
  TITLE_MSG_ERROR,
  TITLE_MSG_SUCCESS,
  TypeIcon,
} from '../../consts/consts';
import { ErrorData } from '../../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor() {}

  // notifyMessage(notifyModel: INotifyModel) {
  //   this.overrideContentIcon();
  //   return Swal.fire(

  //   );
  // }
  notifyWithParameter(notifyModel: INotifyModel, parameter: string[]) {
    this.overrideContentIcon();
    return Swal.fire({
      title: notifyModel.title,
      text: notifyModel.text,
      icon: 'success',
    });
  }

  notifyConfirm(notifyModel: INotifyModel) {
    return Swal.fire({
      title: notifyModel.title,
      text: notifyModel.text,
      icon: 'success',
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonColor: COLOR_BTN_CANCEL,
      cancelButtonText: notifyModel.cancelButtonText
        ? notifyModel.cancelButtonText
        : TEXT_BTN_CANCEL,
      confirmButtonText: notifyModel.confirmButtonText
        ? notifyModel.confirmButtonText
        : TEXT_BTN_CONFIRM,
      allowEscapeKey: false,
    });
  }

  notifyCustomImage(notifyModel: INotifyModel) {
    return Swal.fire({
      title: notifyModel.title,
      text: notifyModel.text,
      imageUrl: notifyModel.imageUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Confirm image',
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonColor: COLOR_BTN_CANCEL,
      confirmButtonColor: COLOR_BTN_CONFIRM,
      cancelButtonText: notifyModel.cancelButtonText
        ? notifyModel.cancelButtonText
        : TEXT_BTN_CANCEL,
      confirmButtonText: notifyModel.confirmButtonText
        ? notifyModel.confirmButtonText
        : TEXT_BTN_CONFIRM,
      allowEscapeKey: false,
    });
  }

  notifyErrorFromRequest(errorData: ErrorData) {
    let text: string;
    if (errorData?.field && errorData?.field !== null) {
      text = PREFIX_MESSAGE + errorData.message;
    } else {
      text = `${PREFIX_MESSAGE}` + (errorData?.message || 'MN009');
    }

    return Swal.fire({
      title: TITLE_MSG_ERROR,
      text,
      icon: TypeIcon.Error,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  overrideContentIcon() {
    const InterObj = interval(5)
      .pipe(take(100))
      .subscribe(() => {
        const elements = document.querySelector('.swal2-info > .swal2-icon-content');
        if (elements) {
          elements.innerHTML = '';
          InterObj.unsubscribe();
        }
      });
  }


  errorMessage(message: string) {
    return Swal.fire({
      title: TITLE_MSG_ERROR,
      text: message,
      icon: TypeIcon.Error,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  successMessage(message: string) {
    return Swal.fire({
      // position: 'top-end',
      title: TITLE_MSG_SUCCESS,
      text: message,
      icon: TypeIcon.Success,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  warningMessage(message: string) {
    return Swal.fire({
      title: 'Warning',
      text: message,
      icon: TypeIcon.Warning,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }

  confirmAdd(text: any): Promise<boolean> {
    return Swal.fire({
      title: text,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then(result => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }


  notifyCreateAccountSuccess(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Account created successfully!',
      html: `
        <p>Full Name: ${data.FullName}</p>
        <p>Phone: ${data.Phone}</p>
        <p>Email: ${data.Email}</p>
        <p>Password: ${data.Password}</p>
      `,
      confirmButtonText: 'Copy',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
        const text = `Full Name: ${data.FullName}\nPhone: ${data.Phone}\nEmail: ${data.Email}\nPassword: ${data.Password}`;
        navigator.clipboard.writeText(text).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Copied!',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }
  

 
}
