import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.services';

@Component({
  selector: 'app-employee-tracking',
  templateUrl: './employee-tracking.component.html',
  styleUrls: ['./employee-tracking.component.scss']
})
export class EmployeeTrackingComponent implements OnInit {
  dir: any;
  zoom: number = 14;
  direction: any = []

  // initial center position for the map
  lat: number = 25.4328287;
  lng: number = 81.8419559;
  constructor(private locationService: LocationService) {

  }
  ngOnInit(): void {
    this.onEmployeeLocationsTrack();
    this.getDirection();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  public getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }
  async onEmployeeLocationsTrack() {
    this.locationService.getEmployeeTravelLocation(13).subscribe((response: any) => {
      console.log(response);
      let data = response.data;
      data.forEach((element: any, index: number) => {
        if (index < data.length-1) {
          this.direction.push({
            origin: { lat: parseFloat(element.latitude), lng: parseFloat( element.longitude) },
            destination: { lat: parseFloat(data[index + 1].latitude), lng: parseFloat(data[index + 1].longitude) }
          });
        }
      });
      console.log(this.direction);
    });
  }
}
