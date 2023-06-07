import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://greenwichaddmission.onrender.com/';
  private readonly accessTokenKey = 'accessToken'; 
  private readonly refreshTokenKey = 'refreshToken';
  roleUser: Observable<number>;
  //role-number
  roleUserSubject: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  // roleUserSubject!: BehaviorSubject<number>

  constructor( private router: Router, private http: HttpClient, private route: ActivatedRoute, private localStoreService: LocalStoreService) {
    // if(this.localStoreService.getLocalStorageItemAsJSON(this.accessTokenKey) !== null) {
    this.roleUser = this.roleUserSubject.asObservable();
    
  }

  setValueRole(value: number) {
    this.roleUserSubject.next(value);
  }


  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { phone, password }).pipe(
      tap((tokens: any) => {
        
        this.localStoreService.setLocalStorageItem(this.accessTokenKey, tokens.accessToken);
        this.localStoreService.setLocalStorageItem(this.refreshTokenKey, tokens.refreshToken);
        
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.localStoreService.getLocalStorageItemAsJSON(this.accessTokenKey));
       
        this.setValueRole(decodedToken.Role);
        
        // this.setToken(tokens.access_token);
        // this.setRefreshToken(tokens.refreshToken);
      })
    );
  }

  getToken(): any {
    return localStorage.getItem(this.accessTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getRefreshToken(): any {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  isUserAuthenticated(): boolean {
    const token = this.getToken();
    // kiểm tra xem token có tồn tại hay không
    return !!token;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refreshToken`, { refresh_token: refreshToken })
    // .pipe(
    //   tap((tokens: any) => { //tap là 1 operator của rxjs nó sẽ thực hiện 1 hành động nào đó khi observable được gọi 
    //     // this.setToken(tokens.access_token); 
    //     // this.setRefreshToken(tokens.refresh_token);
    //     this.localStoreService.setLocalStorageItem(this.accessTokenKey, tokens.accessToken);
    //     this.localStoreService.setLocalStorageItem(this.refreshTokenKey, tokens.refreshToken);
    //   })
    // );
  }

  logout() {
    this.setValueRole(4);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    this.router.navigateByUrl('/auth/login');
    
    
  }
}
