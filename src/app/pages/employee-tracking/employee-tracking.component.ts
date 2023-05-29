import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-tracking',
  templateUrl: './employee-tracking.component.html',
  styleUrls: ['./employee-tracking.component.scss']
})
export class EmployeeTrackingComponent {
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 12.9698;
  lng: number = 77.7500;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 12.9698,
		  lng: 77.7500,
		  label: 'A',
		  draggable: true
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
