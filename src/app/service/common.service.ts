import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from '../model/i-account';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

    getCarsSmall() {
    return this.http.get<any>('assets/data/cars-small.json')
      .toPromise()
      .then(res => <IAccount[]>res.data)
      .then(data => { return data; });
    }

    getCarsMedium() {
    return this.http.get<any>('assets/data/cars-medium.json')
      .toPromise()
      .then(res => <IAccount[]>res.data)
      .then(data => { return data; });
    }

    getCarsLarge() {
    return this.http.get<any>('assets/data/cars-large.json')
      .toPromise()
      .then(res => <IAccount[]>res.data)
      .then(data => { return data; });
    }

    getCarsHuge() {
      return this.http.get<any>('assets/data/cars-huge.json')
        .toPromise()
        .then(res => <IAccount[]>res.data)
        .then(data => { return data; });
    }
}
