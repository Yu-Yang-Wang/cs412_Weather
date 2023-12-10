import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(
    private http: HttpClient
  ) { }

  getDataFromBackend(data: string) {
    return this.http.post('http://localhost:3000/ps4/api/sendData3', { city: data });
  }

}
