import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  public static latitude;
  public static longitude;

  constructor() { }

  moveMarker(map: L.map) {
    var myMarker = L.marker([44.425, 26.1], {title: "MyPoint", alt: "The Big I", draggable: true})
		.addTo(map)
		.on('dragend', function() {
			var coord = String(myMarker.getLatLng()).split(',');
			MarkerService.latitude = coord[0].split('(')[1];
			MarkerService.longitude = coord[1].split(')')[0];
			myMarker.bindPopup("Moved to: " + MarkerService.latitude + ", " + MarkerService.longitude + ".");
		});
  }

  posMarker(map, lat, lon) {
    const marker = L.marker([lat, lon]);
    marker.addTo(map);
  }
}
