import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants/constants';
import { ICategory } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<ICategory[]>(`${BASE_URL}/categories`);
  }
}
