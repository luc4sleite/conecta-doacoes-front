import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ong } from '../classes/ong';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  baseUrl = 'http://localhost:8080/ongs';

  constructor(private httpClient: HttpClient) { }

  register(ong: Ong) {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token da sessão
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<Ong>(this.baseUrl, ong, { headers });
  }

}
