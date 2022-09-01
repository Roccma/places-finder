import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { NotiflixService } from './notiflix.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor( private http: HttpClient,
              private notiflixService: NotiflixService ) { }

  getPlacesData( lat: number, lng: number, keywords: string, range: number ){
    console.log(lat, lng);
    this.http.get( `${ environment.search_places_url }/nearby-search/${ lat },${ lng }/${ keywords }/${ range }` )
      .subscribe(
        (data: any) => {         
          const date = new Date(); 
          new AngularCsv(<any> data['data'], `Reporte ${ date.getFullYear() }-${ date.getMonth() }-${ date.getDate() } ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }` );
          this.notiflixService.hideLoading();
        }
      )
  }
}
