import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.services';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee-tracking',
  templateUrl: './employee-tracking.component.html',
  styleUrls: ['./employee-tracking.component.scss']
})
export class EmployeeTrackingComponent implements OnInit {
  onlineUsers: any = [];
  distinctOnlineUsers: any = [];
  dir: any;
  zoom: number = 10;
  direction: any = [];
  siteMarkers: any = [];
  userId: number = 0;
  isAllUser: boolean = true;
  openedWindow: number = 0;
  distance: number = 0;
  supervisorId: Number = 0; 

  // initial center position for the map
  lat: number = 25.4328287;
  lng: number = 81.8419559;

  // renderOptions = {
  //   suppressMarkers: true
  // }
  originIcon = '../../../assets/images/origin.png';
  liveIcon = '../../../assets/images/live.gif';

  constructor(private locationService: LocationService, private sharedService: SharedService, private userService: UserService) {

  }
  ngOnInit(): void {
    this.supervisorId = this.sharedService.getUserId();
    this.getOnlineUsers();
    this.onEmployeeLocationsTrack();
  }

  getOnlineUsers() {
    this.userService.getOnlineUsers(this.supervisorId).subscribe((response: any) => {
      this.onlineUsers = response.data;
      const distictUsers = [...new Set(this.onlineUsers.map((x: any) => x.name))];
      this.distinctOnlineUsers = distictUsers.sort();
    });
  }

  onChangeUser(event: any) {
    const selectedval = event.target.value;
    if (selectedval != "0") {
      this.userId = this.onlineUsers.find((x: any) => x.name == selectedval).userId;
    }
    else {
      this.userId = 0;
    }
    this.onEmployeeLocationsTrack();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  getDistance = async (distance: any) => {
    var origin = new google.maps.LatLng(distance.origin.lat, distance.origin.lng);
    var destination = new google.maps.LatLng(distance.destination.lat, distance.destination.lng);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.TWO_WHEELER,

      }, this.callback);
  }

  callback = (response: any, status: any) => {
    if (status == 'OK') {
      var origins = response.originAddresses;
      //var destinations = response.destinationAddresses;
      var distance = "";
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          distance = element.distance.text;
          console.log(distance);
          // var duration = element.duration.text;
          // var from = origins[i];
          // var to = destinations[j];
        }
      }
    }
  }

  calculateDistance(distance: any) {
    var origin = new google.maps.LatLng(distance.origin.lat, distance.origin.lng);
    var destination = new google.maps.LatLng(distance.destination.lat, distance.destination.lng);
    const dis = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    console.log(dis);
  }


  getDirection = (data: any) => {
    if (this.userId > 0) {
      this.dir = {
        origin: { lat: parseFloat(data[0].tripStartLatitude), lng: parseFloat(data[0].tripStartLongitude) },
        destination: { lat: parseFloat(data[data.length - 1].latitude), lng: parseFloat(data[data.length - 1].longitude) }
      }
      //inserting lat long for trip started
      this.direction.push({
        origin: { lat: parseFloat(data[0].tripStartLatitude), lng: parseFloat(data[0].tripStartLongitude) },
        destination: { lat: parseFloat(data[0].latitude), lng: parseFloat(data[0].longitude) }
      });
      data.forEach((element: any, index: number) => {
        if (index < data.length - 1) {
          this.direction.push({
            origin: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
            destination: { lat: parseFloat(data[index + 1].latitude), lng: parseFloat(data[index + 1].longitude) }
          });
        }
        //creating markers for sites
        if (element.siteId > 0) {
          this.siteMarkers.push({
            origin: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
            siteName: element.siteName,
            siteCreatedOn: element.siteCreatedOn
          });
        }
      });
      // calculating distance
      this.direction.forEach((element: any, index: number) => {
        if (index < this.direction.length - 1) {
          const getDistancePayload = {
            origin: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
            destination: { lat: parseFloat(this.direction[index + 1].latitude), lng: parseFloat(this.direction[index + 1].longitude) }
          }
          this.calculateDistance(getDistancePayload);
        }
      });
      this.isAllUser = false;
    }
    else {
      //all users block
      const distictUserIds = [...new Set(data.map((x: any) => x.userId))];
      const descOrderedData = data.reverse();
      distictUserIds.forEach(element => {
        const loc = descOrderedData.find((x: any) => x.userId == element);
        this.direction.push({
          origin: { lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude) },
          name: loc.name
        });
      });
      this.isAllUser = true;
    }
  }

  async onEmployeeLocationsTrack() {
    this.locationService.getEmployeeTravelLocation(this.userId).subscribe((response: any) => {
      let data = response.data;
      this.dir = null;
      this.direction = [];
      this.siteMarkers = [];
      if (data.length > 0) {
        this.getDirection(data);
      }
    });
  }

  openWindow(id: number) {
    this.openedWindow = id;
  }

  isInfoWindowOpen(id: number) {
    return this.openedWindow == id;
  }
}
