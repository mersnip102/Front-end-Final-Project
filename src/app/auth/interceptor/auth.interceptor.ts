import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TOKEN } from 'src/app/core/consts/consts';
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private localStorageSv: LocalStoreService,

    private route: ActivatedRoute,
    private http: HttpClient,

    private router: Router,
    private notifyService: NotifyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let result = next.handle(request);
    // const token = this.localStorageSv.getLocalStorageItemAsJSON("accessToken");

    // if (token && token !== '') {
    //   const headers = request.headers.append('Authorization', `Bearer ${token}`);
    //   const req: HttpRequest<any> = request.clone({ headers });
    //   result = next.handle(req).pipe(
    //     tap(
    //       (event: HttpEvent<any>) => {
    //         return event;
    //       },
    //       (err: HttpErrorResponse) => {
    //         if (err.error.status === 403) {
    //           // localStorage.removeItem(TOKEN);
    //           localStorage.removeItem("accessToken");
    //           localStorage.removeItem("refreshToken");
    //           this.authService.refreshToken().subscribe(
    //             (res) => {
    //               // localStorage.setItem(TOKEN, res.accessToken);

    //               this.localStorageSv.setLocalStorageItem("accessToken", res.accessToken);
    //               this.localStorageSv.setLocalStorageItem("refreshToken", res.refreshToken);
    //               const headers = request.headers.append('Authorization', `Bearer ${this.localStorageSv.getLocalStorageItemAsJSON("accessToken")}`);
    //               const req: HttpRequest<any> = request.clone({ headers });
    //               result = next.handle(req);
    //             },
    //             (err) => {
    //               // localStorage.removeItem(TOKEN);
    //               localStorage.removeItem("accessToken");
    //               localStorage.removeItem("refreshToken");
    //               this.router.navigate(['/auth/login']);
    //               // this.notifyService.notify('error', 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
    //             }
    //           );
    //         } else if (err.error.status === 401) {
    //           // localStorage.removeItem(TOKEN);
    //           localStorage.removeItem("accessToken");
    //           localStorage.removeItem("refreshToken");
    //           this.router.navigate(['/auth/login']);
    //           // this.notifyService.notify('error', 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');

    //           // localStorage.removeItem('currentUser');
    //         } else if (err.error.status === 500) {
    //           //implement notify
    //         }
    //       }
    //     )
    //   );
    // }
    return result;
  }
}
