import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { NotiflixService } from 'src/app/services/notiflix.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  latitud: number = 0;
  longitud: number = 0;
  range: number = 1000;
  keywords: string = "";

  constructor( private backendService: BackendService,
                private notiflixService: NotiflixService ) { 
  }

  ngOnInit(): void {}

  public formatLabel(value: number) {
    this.range = value;
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  public onChangeSlider(event: any){
    this.range = event.value;
    
  }

  public onKeywordsKeyUp(event: any){
    this.keywords = event.target.value;
  }

  public AddressChange(address: any) {
    this.latitud = address.geometry.location.lat();
    this.longitud = address.geometry.location.lng();
    
  }

  public onGetData(){
    if( this.latitud === 0 && this.longitud === 0 ){
      this.notiflixService.showAlert("No se ha indicado lugar", "failure");
      return;
    }
    else if( this.keywords == "" ){
      this.notiflixService.showAlert("No se ha indicado ninguna palabra clave", "failure");
      return;
    }
    else{
      this.notiflixService.showLoading("Trayendo datos");
      this.backendService.getPlacesData( this.latitud, this.longitud, this.keywords, this.range );
    }
  }

}
