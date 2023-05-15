import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NewEmailComponent } from 'src/app/pages/email/new-email/new-email.component';
import { GSafeData } from '../models/utils/safe-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<GSafeData> {
  canDeactivate(
    component: NewEmailComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.newEmailForm.dirty) {
      return false;
    }
    return true;
  }
}
