import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [BasicLayoutComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
    NzDropDownModule,
    RouterModule,
  ],
  exports: [BasicLayoutComponent],
})
export class BasicLayoutModule {}
