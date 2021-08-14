import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
  
})
export class FileUploadService {

  SERVER_URL: string = "{Server URL}"
  baseApiUrl = "https://file.io"

  constructor(private httpClient:HttpClient) { }


  public upload(formData) {
  return this.httpClient.post<any>(this.SERVER_URL, formData, {


    reportProgress: true,


    observe: 'events'

  });
  }
}