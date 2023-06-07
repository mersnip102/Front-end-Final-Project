import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmissionManagerService {

  private api = 'https://greenwichaddmission.onrender.com/';


  sendFileChat(formData: FormData) {
    const headers = new HttpHeaders({
      
    })
    return this.http.post(this.api + 'chat-upload', formData, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  getScholarshipByStudent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get(this.api + `getScholarship/${id}`, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }

  
  getAllPayment() : Observable<any> {
    return this.http.get(this.api + 'payment')//stringify de chuyen doi tu object sang json
  }

  getPaymentById(id: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(this.api + `payment/${id}`, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  updatePaymentById(data: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.put(this.api + 'updatePayment', data, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  addPamentStudent(data: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(this.api + 'addPayment', data, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  deletePamentStudent(id: any) : Observable<any> {
   
    return this.http.delete(this.api + `deletePayment/${id}`, {responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  updatePament(id: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.put(this.api + `updatePayment/${id}`, {headers: headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }






  updateScholarshipByStudent(formData: FormData): Observable<any> {
    //convert formdata to object
    const obj: any = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });
    console.log(obj);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.put(this.api + `updateScholarship`, obj, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }





  getEventsByStudent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get(this.api + `eventsByStudent/${id}`, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  confirmEvent(studentId: any,eventId: any, status: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.put(this.api + 'confirmEvent', {studentId: studentId, eventId: eventId, status: status}, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
  }




  
  // pdf(): Observable<any> {
  //   const headers = new HttpHeaders({
    
      
  //     'Access-Control-Allow-Origin': '*',
     
  //   });
    
  //   return this.http.get('https://greenwichaddmission.onrender.com/my-pdf-file.pdf', {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
   
  // }

  updateAllowEditing(id: any,allowEditing: any): Observable<any> {
   
    return this.http.put(this.api + 'updateAllowEditing', {id: id, allowEditing: allowEditing}, {responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  closeAllowEditing(id: any,allowEditing: any): Observable<any> {
   
    return this.http.put(this.api + 'updateAllowEditing', {id: id, allowEditing: allowEditing}, {responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  updateEnoughProfile(id: any,enoughProfile: any): Observable<any> {
   
    return this.http.put(this.api + 'updateEnoughProfile', {id: id, enoughProfile: enoughProfile}, {responseType: 'json'})//stringify de chuyen doi tu object sang json
  }


  addStudentsToEvent(id: any,listStudent: any): Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    
    
    return this.http.post(this.api + `addStudentsEvent/${id}`, {listStudent: listStudent}, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
   
      
    }


    deleteStudentsToEvent(id: any,studentId: any): Observable<any> {
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      });
      
      
      return this.http.post(this.api + `deleteStudentEvent/${id}`, {studentId: studentId}, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
     
        
      }



  getStudentEvent(id: string): Observable<any> {
    console.log(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    
    
    return this.http.get(this.api + `getStudentsEvent/${id}`, {responseType: 'json'})//stringify de chuyen doi tu object sang json
   
      
    }

  getStudentsToEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    
    
    return this.http.get(this.api + `getStudentsToEvent/${id}`, {responseType: 'json'})//stringify de chuyen doi tu object sang json
   
  }


  sendEmail(data: any): Observable<any> {
    
    
    
    return this.http.post(this.api + 'send-email', data, {responseType: 'json'})//stringify de chuyen doi tu object sang json
   
  }





  getAllevents(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    
    return this.http.get(this.api + 'events', {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
   
  }


  getAllFee(): Observable<any> {
    return this.http.get(this.api + 'listFee');
  }

  deleteFee(Id: string): Observable<any> {
    return this.http.delete(this.api + `deleteFee/${Id}`);
  }

  getFeeById(Id: string): Observable<any> {
    return this.http.get(this.api + `fee/${Id}`);
  }

  saveFee(Id: string, formData : FormData): Observable<any> {
   
    console.log(formData.get('FeeType'));


    const data: any = {};
      formData.forEach((value, key) => {data[key] = value});
    

  
    if(Id == undefined || Id == null || Id == ''){
      return this.http.post(this.api + 'addFee', data,{responseType: 'json' });

    } else {
      const object: any = {};
      formData.forEach((value, key) => {object[key] = value});
      
      console.log(object);
      return this.http.post(this.api + `updateFee/${Id}`, object,{ responseType: 'json' });

    }
    
  }



  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  login(phone:string='', password:string=''): Observable<any>{    
    const userInfo = { phone:phone, password:password }
    console.log(userInfo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'login'
    , userInfo// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//login
  resetPassword(newPassword:string='', reNewPassword:string=''): Observable<any>{
    var account: any = localStorage.getItem('account')
    var phone = JSON.parse(account).Phone;
    console.log(phone);
    const password = {phone: phone,newPassword:newPassword, reNewPassword: reNewPassword }
    console.log(password);
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'changePassword'
    , password// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//resetPassword


  getStudentById(Id:string=''){    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.get(this.api + `getStudentById/${Id}`, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }


  getAStudent(Phone:string=''){    
    const userInfo = { Phone:Phone}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'getAStudent', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  getAllStuentByAdmission(Id:string='', query?: any){
    
    //set query
    const httpOptions = {
      
      params: query
    };
    
    console.log(query);
    
    return this.http.get(this.api + `getAllStuentByAdmission/${Id}`, {params: httpOptions.params, responseType: 'text'})//stringify de chuyen doi tu object sang json

  }

  getAllStuents(){
    
    return this.http.get(this.api + `allStudents`, {responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  testUpdateStudent(phone: string='', testUpdateStudent: Object){    
    const userInfo = { phone: phone, student: testUpdateStudent}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'testUpdateStudent', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  handleUpload(Id: string, formData: FormData){
    const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});

    console.log(formData.get('CertificateOfGraduation'));
    console.log(formData.get('FullName'));
  
    return this.http.post(this.api + `handleUpload/${Id}`, formData, { headers: headers, responseType: 'json' })
    
    // const req = new HttpRequest('POST', `${this.api}handleUpload`, formData, {
    //   reportProgress: true,
    //   responseType: 'json',
    //   params: new HttpParams().set('Id', Id)
    // });

    // return this.http.request(req);
  }

  createNewAccount(account: Object){    
    const userInfo = {account: account}
    // const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'createNewStudent', userInfo, { responseType: 'json'})//stringify de chuyen doi tu object sang json
  }

  createEvent(data: any) {
    
    // const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(this.api + 'createEvent', data, { responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  // login(data: any): Observable<any> {
  //   return this.http.post(api + 'login', data);
  // }
}
