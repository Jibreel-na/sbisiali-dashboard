import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { PaginationModel } from 'models/pagination.model';
import { AdModel } from 'models/advertise.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'services/data.service';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss']
})
export class AdvertisingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'link', 'preview', 'active', 'action'];
  dataSource: any;
  pageEvent: PageEvent;
  pageSize = 12;
  length: number;
  type: string;
  baseUrl = environment.baseUrl;
  ads: AdModel[];
  pagination = new PaginationModel();


    constructor(private restService: DataService,
                private toastr: ToastrService) {
       this.pagination.page = 0 ;
       this.pagination.limit = 20 ;
    }

    applyFilter(filterValue: string) {
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getAds();
    }

    getAds() {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getAdvertisings(this.pagination).then((res) => {
                this.length = res.totalResults;
                this.dataSource = new MatTableDataSource(res.results);
                console.log(this.dataSource);
                this.ads = res.results;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }



    activeBlock(data: AdModel, status) {
        data.active = status;
        this.restService.updateAdvertising(data);
    }


    confirmeActiveBlock(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        } else if (status == 2) {
            statusName = 'block';
        } else {
            statusName = 'active';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this ad ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(item, status);

                }
            });
    }


    ngOnInit() {
        this.getAds();

    }

}
