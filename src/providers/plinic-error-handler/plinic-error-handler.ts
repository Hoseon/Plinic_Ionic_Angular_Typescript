import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule, ErrorHandler } from '@angular/core';


/*
  Generated class for the PlinicErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlinicErrorHandlerProvider implements ErrorHandler {
  handleError(error){
    //에러내용 출력
  }

  constructor(public http: HttpClient) {
  }

}
