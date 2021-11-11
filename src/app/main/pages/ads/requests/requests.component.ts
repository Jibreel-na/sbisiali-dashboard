import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { environment } from 'environments/environment';
import { PaginationModel } from 'models/pagination.model';
import { RequestModel } from 'models/request.model';
import { UserModel } from 'models/user.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Request By Name', 'Request By Email', 'Request To Name', 'Request To Email', 'City', 'Created At', 'Cost', 'status'];
  dataSource: any;
  pageEvent: PageEvent;
  pageSize = 12;
  length: number;
  type: string;
  baseUrl = environment.baseUrl;
  requests: RequestModel[];
  pagination = new PaginationModel();
  statusList = [
    {title: 'Waiting Response', value: 0},
    {title: 'Accepted', value: 1},
    {title: 'Rejected', value: 2},
    {title: 'Paid', value: 3},
];

    constructor(private restService: DataService,
                private toastr: ToastrService) {
       this.pagination.page = 0 ;
       this.pagination.limit = 20 ;
    }

    applyFilter(filterValue: string) {
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getRequests();
    }

    getRequests() {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getRequests(this.pagination).then((res) => {
                this.length = res.totalResults;
                this.dataSource = new MatTableDataSource(res.results);
                console.log(this.dataSource);
                this.requests = res.results;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    updateStatus(element) {
        if (!('time' in element))
            element.time = "";
        if (element.profession == "")
            element.profession = "unknown";
        element.country = element.country.title;
        element.duration = element.duration.range + ' ' + element.duration.unit.title;
      this.restService.updateRequest(element).then((res) => {
      }).catch((err: HttpErrorResponse) => {
        console.log(err.message);
      });
    }



    ngOnInit() {
        this.getRequests();
    }
}
