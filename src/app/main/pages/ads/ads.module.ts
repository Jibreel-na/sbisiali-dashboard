import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisingComponent } from './advertising/advertising.component';
import { RequestsComponent } from './requests/requests.component';
import { AdsComponent } from './ads.component';
import { AuthGuard } from 'guard/auth.guard';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
      path     : 'ads',
      component: AdsComponent,
      canActivate: [AuthGuard],

  }
];

@NgModule({
  declarations: [AdsComponent, AdvertisingComponent, RequestsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FuseSharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatSelectModule,

  ]
})

export class AdsModule { }
