import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';


@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}

@Component({
  selector: 'app-chat-students',
  templateUrl: './chat-students.component.html',
  styleUrls: ['./chat-students.component.css']
})
export class ChatStudentsComponent implements AfterViewInit {


public connect(): void {
  
}

public login(username: string, userType: string): void {
this.socket.emit('login', { username, userType });
}

// public sendMessage(from: string, to: string, message: string): void {
// this.socket.emit('message', { from, to, message });
// }



public onMessage(): Observable<any> {
return new Observable((observer) => {
this.socket.on('message', (data: any) => {
observer.next(data);
});
});
}



public onStudentList(): Observable<any> {
return new Observable((observer) => {
this.socket.on('studentList', (data: any) => {
observer.next(data);
});
});
}


// loadScript(src: string): void {
//   const script = this.renderer.createElement('script');
//   script.type = 'text/javascript';
//   script.src = src;
//   this.renderer.appendChild(this.document.body, script);
// }

loadScript2(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = (error: any) => {
      reject(error);
    };
    document.body.appendChild(script);
  });
}

public message$: BehaviorSubject<string> = new BehaviorSubject('');
 

  // socket2 = io('https://greenwichaddmission.onrender.com');

  // public sendMessage2(message: any) {
  //   console.log('sendMessage: ', message)
  //   this.socket2.emit('message', message);
  // }

  // public getNewMessage = () => {
  //   this.socket2.on('message', (message: any) =>{
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // };





// private socket: SocketIOClient.Socket;

//   constructor(private http: HttpClient) {
//     this.socket = io(environment.apiUrl);
//   }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${environment.apiUrl}/users`);
//   }

//   sendMessage(msg: Message): void {
//     this.socket.emit('send_message', msg);
//   }

//   onNewMessage(): Observable<Message> {
//     return new Observable((observer) => {
//       this.socket.on('new_message', (msg: Message) => {
//         observer.next(msg);
//       });
//     });
//   }


transform(value: string, limit: number = 20) {
  return value.length > limit ? value.substring(0, limit) + '...' : value;
}
// @ViewChild('chatBottom', { static: true }) chatBottom!: ElementRef;



// scrollToBottom(): void {
//   this.chatBottom.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
// }

// handleChange(info: NzUploadChangeParam): void {
//   if (info.file.status !== 'uploading') {
//     console.log(info.file, info.fileList);
//   }
//   if (info.file.status === 'done') {

//   } else if (info.file.status === 'error') {

//   }
// }

// previewFile = (file: NzUploadFile): Observable<string> => {
//   console.log('Your upload file:', file);
//   return this.http
//     .post<{ thumbnail: string }>(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
//       method: 'POST',
//       body: file
//     })
//     .pipe(map(res => res.thumbnail));
// };
// defaultFileList: NzUploadFile[] = [
//   {
//     uid: '-1',
//     name: 'xxx.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//   },
//   {
//     uid: '-2',
//     name: 'yyy.png',
//     status: 'error'
//   }
// ];

fileList: NzUploadFile[] = [];
// fileList2 = [...this.defaultFileList];

// newMessage = '';
// messageList: string[] = [];

// constructor(private chatService: MessagesService, private cdr: ChangeDetectorRef){

// }
// ngAfterViewInit(): void {
//   this.chatService.getNewMessage().subscribe((message: string) => {
//     this.messageList.push(message);
//     console.log(this.messageList);
//     this.cdr.detectChanges();
//   })
// }

// ngOnInit(){
//   // this.chatService.getNewMessage().subscribe((message: string) => {
//   //   this.messageList.push(message);
//   //   console.log(message);
//   //   this.cdr.detectChanges();
//   // })
// }

// sendMessage() {
//   this.chatService.sendMessage2(this.newMessage);
//   this.newMessage = '';
// }
sendMessageForm!: FormGroup;
sender!: string;
socket: any;
room: string = '';
message: string = '';
messages: any[] = []; // Change the type of messages to an array of any
// file!: File
file!: any

constructor(
  private nzImageService: NzImageService,
  private http: HttpClient, private localStorageSv: LocalStoreService, private cdr: ChangeDetectorRef, private api: AdmissionService, private fb: FormBuilder) {
  this.socket = io('https://greenwichaddmission.onrender.com');
  this.sendMessageForm = this.fb.group({
    message: new FormControl('', Validators.required),
  })

  // this.socket.on('previous-messages', (messages: any) => {
  //   console.log(messages);
  //   for (let message of messages) {
  //     console.log(message.Content);
  //     this.messages.push({

  //       timestamp: message.TimeStamp,
  //       username: message.SenderId,
  //       content: message.Content,
  //     });
  //   }
  //   console.log(this.messages);
  // });


}
listStudent: any[] = [];
ngOnInit(): void {
  // this.scrollToBottom();
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
  this.room = decodedToken.ID;
  this.joinRoom(this.room);


}

getListMessageByRoom(id: any) {
  this.api.getListMessageByRoom(id).subscribe((res: any) => {
    console.log(res);


  })
}

removeMessage(id: any) {
  this.api.removeMessage(id).subscribe((res: any) => {
    console.log(res);

  })
}


SendMessage() {
  this.socket.emit('message', this.sendMessageForm.get('message')?.value);
  console.log(this.sendMessageForm.get('message')?.value);



  const element = document.createElement('li');
  element.innerHTML = this.sendMessageForm.get('message')?.value;
  element.style.background = 'red';
  element.style.color = 'white';
  element.style.padding = '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  document.getElementById('message-list')?.appendChild(element);
  this.sendMessageForm.get('message')?.setValue('');

  // const chatDiv = this.el.nativeElement.querySelector('#chat');
  // const chatContentLeftSideDiv = this.renderer.createElement('div');
  // const dFlexDiv = this.renderer.createElement('div');
  // const img = this.renderer.createElement('img');
  // const divFlexGrow1 = this.renderer.createElement('div');
  // const pChatTime = this.renderer.createElement('p');
  // const pChatLeftMsg = this.renderer.createElement('p');

  // this.renderer.addClass(chatContentLeftSideDiv, 'chat-content-leftside');
  // this.renderer.addClass(dFlexDiv, 'd-flex');
  // this.renderer.setAttribute(img, 'src', 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png');
  // this.renderer.setAttribute(img, 'width', '48');
  // this.renderer.setAttribute(img, 'height', '48');
  // this.renderer.addClass(img, 'rounded-circle');
  // this.renderer.addClass(divFlexGrow1, 'flex-grow-1');
  // this.renderer.addClass(pChatTime, 'mb-0 chat-time');
  // this.renderer.addClass(pChatLeftMsg, 'chat-left-msg');

  // const textChatTime = this.renderer.createText('Harvey, 3:33 PM');
  // const textChatLeftMsg = this.renderer.createText(this.sendMessageForm.get('message')?.value);

  // this.renderer.appendChild(pChatTime, textChatTime);
  // this.renderer.appendChild(pChatLeftMsg, textChatLeftMsg);
  // this.renderer.appendChild(divFlexGrow1, pChatTime);
  // this.renderer.appendChild(divFlexGrow1, pChatLeftMsg);
  // this.renderer.appendChild(dFlexDiv, img);
  // this.renderer.appendChild(dFlexDiv, divFlexGrow1);
  // this.renderer.appendChild(chatContentLeftSideDiv, dFlexDiv);
  // this.renderer.appendChild(chatDiv, chatContentLeftSideDiv);



}

onClickImage(imageURL: any): void {
  const image = [
    {
      src: 'https://greenwichaddmission.onrender.com/uploads/chat/' + imageURL,
      width: '300px',
      height: '350px',
      alt: 'ng-zorro'
    }
  ]


  this.nzImageService.preview(image, { nzZoom: 1.5, nzRotate: 0 });
}
ngAfterViewInit(): void {

  this.socket.on('message', (data: any) => {
    
    this.messages.push({
      timestamp: data.timestamp,
      username: data.SenderId,
      content: data.Content,
      file: data.file,
    });
    this.cdr.detectChanges();
  });

  this.socket.on('previous-messages', (messages: any) => {
    console.log(this.messages);
    this.messages = [];
    if (messages.length > 0) {
      for (let message of messages) {

        this.messages.push({

          timestamp: message.TimeStamp,
          username: message.SenderId,
          content: message.Content,
          file: message.File,
        });
      }

      this.cdr.detectChanges();

    } else {
      this.messages = []
      this.cdr.detectChanges();
    }

  });

  this.cdr.detectChanges();
}

ReceiverId!: any;

joinRoom(room: any) {
  this.messages = [];

  this.ReceiverId = room;
  this.room = room;
  this.socket.emit('join-room', room)
  this.cdr.detectChanges();

}

checkUser(id: any) {

  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

  if (id == decodedToken.ID) {

    return true;
  } else {

    return false;
  }
}

isImage(file: string): boolean {

  return /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.test(file);
}

getListStudent() {
  // const user = JSON.parse(localStorage.getItem('account')!)
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

  this.api.getAllStuentByAdmission(decodedToken.Infor.Id).subscribe((res: any) => {
    this.listStudent = JSON.parse(res).account


    console.log(this.listStudent);

    for (let i = 0; i < this.listStudent.length; i++) {
      console.log(this.listStudent[i].AccountId);
      this.api.getListMessageByRoom(this.listStudent[i].AccountId).subscribe((messages: any) => {
        console.log(messages);
        if (messages.message.length > 0) {
          this.listStudent[i].lastMessage = messages.message[0]

        }
        console.log(this.listStudent[i]);


      }, (err: any) => {
        console.log(err);
      })
    }






  })
}


handleChange(info: NzUploadChangeParam): void {
  let fileList: any[] = [...info.fileList];

  // 1. Limit the number of uploaded files
  // Only to show two recent uploaded files, and old ones will be replaced by the new
  fileList = fileList.slice(-1);

  // 2. Read from response and show file link
  fileList = fileList.map(file => {
    if (file.response) {
      // Component will show file.url as link
      file.url = file.response.url;
    }
    return file;
  });

  this.fileList = fileList;
}


sendMessage() {

  console.log(this.fileList);

  const formData = new FormData();
  // formData.append('Room', this.room);
  // formData.append('SenderId',JSON.parse(localStorage.getItem('account')!).ID);
  // formData.append('ReceiverId', this.ReceiverId);
  formData.append('Content', this.message);
  // formData.append('file', this.uploadedFiles[0]);

  // this.api.sendFileChat(formData).subscribe(
  //   (res) => {
  //     console.log('File uploaded successfully');
  //   },
  //   (error) => {
  //     console.log('File upload failed:', error);
  //   }
  // );

  console.log(formData.get('Content'));

  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));

  if (this.fileList.length > 0 || this.message != '') {



    this.socket.emit('message',
      {
        Room: this.room,
        SenderId: decodedToken.ID,
        ReceiverId: this.ReceiverId,
        Content: this.message,
        file: this.fileList.length > 0 ? this.fileList[0] : null,
        fileName: this.fileList.length > 0 ? this.fileList[0].name : null,
      }
    )


  }
  this.message = ''

  this.fileList = [];

  this.cdr.detectChanges();


  console.log(this.message);
}

uploadedFiles: any[] = [];

onClear(event: any) {

  this.uploadedFiles = [];
  console.log(this.uploadedFiles)

}
onRemove(event: any) {
  // // Truy cập đối tượng FileList của phần tử <p-fileUpload>
  // const fileList: FileList = event.fileInput.files;

  // // Lấy index của tệp tin bị xóa
  // const index = Array.prototype.indexOf.call(fileList, event.file);

  // // Loại bỏ tệp tin khỏi danh sách tệp tin đã chọn
  // this.uploadedFiles.splice(index, 1);
  this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  console.log(this.uploadedFiles)



}

onSelect(event: any) {
  console.log(event.files);
  for (let file of event.files) {
    this.uploadedFiles.push(file);

    console.log(this.uploadedFiles[0])
  }


}
@ViewChild('fileInput') fileInput!: ElementRef;
sendFile() {
  // const file = this.fileInput.nativeElement.files[0];
  // if (!file) {
  //   this.snackBar.open('Vui lòng chọn một tệp để gửi', '', {
  //     duration: 2000,
  //   });
  //   return;
  // }

  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('room', this.room);
  formData.append('message', `Đã gửi tệp: ${this.file.name}`);
  formData.append('sender', this.sender);
  formData.append('timestamp', new Date().toISOString());
  this.api.sendFileChat(formData).subscribe(
    (res) => {
      console.log('File uploaded successfully');
    },
    (error) => {
      console.log('File upload failed:', error);
    }
  );


  // this.apo.post('https://greenwichaddmission.onrender.com/upload', formData).subscribe(
  //   () => {
  //     console.log('File uploaded successfully');
  //   },
  //   (error) => {
  //     console.log('File upload failed:', error);
  //   }
  // );
}

// isImage(file: string): boolean {
//   const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
//   return allowedExtensions.exec(file) !== null;
// }

previewSrc?: string | ArrayBuffer;



previewImage(event: any) {
  this.file = <File>event.target.files[0];
  // const file = event.target.files[0];
  if (this.file && this.isImage(this.file.name)) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewSrc = e.target.result;
    };
    reader.readAsDataURL(this.file);
  } else {
    this.previewSrc = '';
  }
}

}
