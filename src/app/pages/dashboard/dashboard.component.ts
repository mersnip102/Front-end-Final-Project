import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/core/services/admission-service/admission.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { NotifyService } from 'src/app/core/services/utils/notify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private localStorageSv: LocalStoreService,
    private fb: FormBuilder, private renderer2: Renderer2,
    private sanitizer: DomSanitizer,
    // private scriptLoader: MessagesService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: AdmissionService,
    private notifyService: NotifyService) { }

  latitude!: any;
  longitude!: any;
 
  markerPosition!: any;
  address!: any;
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  getAddress(latitude: number, longitude: number): any {
    const url = `${this.geocodeUrl}?latlng=${latitude},${longitude}&key=AIzaSyBI0DTl9QdF8NjI1g7P3TDvG0wwbjBPfwU`;

    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.address = res.results[0].formatted_address;
      console.log(this.address);
    }
    );

      
  }

  date = null;

  onChange(result: Date[]): void {
    if(result.length != 0) { 
      const start: Date = new Date(result[0])
    
    
    const formattedStartDate = moment(start).format('YYYY-MM-DD');

    const end: Date = new Date(result[0])
    
    const formattedEndDate = moment(end).format('YYYY-MM-DD');
    this.getDashboardData()

    } else {
      this.date = null;
    }
    
   
  }

  getDashboardData(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.localStorageSv.getLocalStorageItemAsJSON("accessToken"));
    console.log(decodedToken);
  }
  ngOnInit(): void {
    this.getDashboardData();
   
  
    // Highcharts.chart('container', {
    //   chart: {
    //     type: 'pie'
    //   },
    //   title: {
    //     text: 'Số lượng hồ sơ các tuyển sinh tuyển được trong khoảng thời gian'
    //   },
    //   series: [{
    //     name: 'Số lượng',
    //     data: data,
    //     showInLegend: true,
    //     dataLabels: {
    //       enabled: true,
    //       format: '{point.name}: {point.y}'
    //     }
    //   }]
    // });
  }
  data2: any = [
    {name: 'Trương Thu Thủy', y: 28},
    {name: 'Nguyễn Thị Yến Nhi', y: 42},
    {name: 'Nguyễn Xuân Quyến', y: 20},
  ];
  chartOptions2: any = {
    chart: {
      type: 'pie'
    },
    title: {
          text: 'Số lượng hồ sơ theo tuyển sinh'
        },
    xAxis: {
      categories: ['Thanh Hóa', 'An Giang', 'Bắc Kạn']
    },
    yAxis: {
      title: {
        text: 'Số tiền (VNĐ)'
      }
    },
    series: [{
          name: 'Số lượng',
          data: this.data2,
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}'
          }
        }]
  };

  data3: any = [
   
    {x: Date.UTC(2022, 7, 1), y: 10},
    {x: Date.UTC(2022, 8, 1), y: 15},
    {x: Date.UTC(2022, 9, 1), y: 30},
    {x: Date.UTC(2022, 10, 1), y: 5},
    {x: Date.UTC(2022, 11, 1), y: 7},
    {x: Date.UTC(2023, 0, 1), y: 4},
    {x: Date.UTC(2023, 1, 1), y: 7},
    {x: Date.UTC(2023, 2, 1), y: 10},
    {x: Date.UTC(2023, 3, 1), y: 8},
    {x: Date.UTC(2023, 4, 1), y: 12},
    {x: Date.UTC(2023, 5, 1), y: 15},
    {x: Date.UTC(2023, 6, 1), y: 10},
  ];
  chartOptions3: any = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Số lượng hồ sơ các tuyển sinh tuyển được theo khoảng thời gian'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}'
      }
    },
    yAxis: {
      title: {
        text: 'Số lượng'
      }
    },
    series: [{
      name: 'Số lượng',
      data: this.data3
    }]
  
  };



  // constructor() {}
  // ngOnInit(): void {}
  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  // center: google.maps.LatLngLiteral = {
  //     lat: 24,
  //     lng: 12
  // };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // zoom = 4;
  // addMarker(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  // }
  // openInfoWindow(marker: MapMarker) {
  //     if (this.infoWindow != undefined) this.infoWindow.open(marker);
  // }

  highcharts = Highcharts;
  Highcharts = Highcharts; // add this
  chartOptions: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Kế hoạch vốn đầu tư'
    },
    xAxis: {
      categories: ['Thanh Hóa', 'An Giang', 'Bắc Kạn']
    },
    yAxis: {
      title: {
        text: 'Số tiền (VNĐ)'
      }
    },
    series: [
      {
        name: 'Series 1',
        data: [50000000, 75000000, 100000000]
      },
      {
        name: 'Series 1',
        data: [25000000, 50000000, 75000000]
      }
    ]
  };


  // mapOptions: google.maps.MapOptions = {
  //   center: { lat: 48.8588548, lng: 12.347035 },
  //   zoomControl: false,
  //   mapTypeControl: false,
  //   streetViewControl: false,
  //   fullscreenControl: false,
  // };

  // markerPosition = { lat: 48.8634286, lng: 12.3114617 };

}
