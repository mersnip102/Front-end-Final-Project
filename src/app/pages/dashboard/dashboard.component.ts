import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpClient) { }
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
  ngOnInit(): void {
   
  
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
    {name: 'Trương Thu Thủy', y: 10},
    {name: 'Nguyễn Thị Yến Nhi', y: 5},
    {name: 'Nguyễn Xuân Quyến', y: 3},
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
    {x: Date.UTC(2022, 0, 1), y: 10},
    {x: Date.UTC(2022, 1, 1), y: 5},
    {x: Date.UTC(2022, 2, 1), y: 3},
    {x: Date.UTC(2022, 3, 1), y: 8},
    {x: Date.UTC(2022, 4, 1), y: 12},
    {x: Date.UTC(2022, 5, 1), y: 15},
    {x: Date.UTC(2022, 6, 1), y: 20},
    {x: Date.UTC(2022, 7, 1), y: 25},
    {x: Date.UTC(2022, 8, 1), y: 18},
    {x: Date.UTC(2022, 9, 1), y: 22},
    {x: Date.UTC(2022, 10, 1), y: 17},
    {x: Date.UTC(2022, 11, 1), y: 14}
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
