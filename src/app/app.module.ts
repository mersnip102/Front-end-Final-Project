import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { IconDefinition } from '@ant-design/icons-angular';
// import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { TableComponent } from './shared/components/event-card/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import vi from '@angular/common/locales/vi';
import { NzMessageService } from 'ng-zorro-antd/message';

// import * as AllIcons from '@ant-design/icons-angular/icons';

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, NotFoundComponent, TableComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, NzEmptyModule, NzTableModule, NzUploadModule],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    NzMessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
