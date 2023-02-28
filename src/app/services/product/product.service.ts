import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/store/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = "https://fakestoreapi.com/";
  constructor(private http: HttpClient) { }

  getProduct(): Observable<Products[]> {
    return <Observable<Products[]>>this.http.get(this.apiUrl + 'products');
  }

}
