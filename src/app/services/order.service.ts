import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrderService {

  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  getOrders() {
    // let headers = new Headers();
    // let token = localStorage.getItem("token");
    // headers.append("Authorization", "Bearer " + token);

    return this.authHttp.get('/api/orders'
      // , {
      //   headers: headers
      // }
    )
      .map(response => response.json());
  }
}
