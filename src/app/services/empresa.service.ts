import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ong } from '../classes/ong';
import { Empresa } from '../classes/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  baseUrl = 'http://localhost:8080/empresas';

  constructor(private httpClient: HttpClient) { }

  register(empresa: Empresa) {
    return this.httpClient.post<Ong>(this.baseUrl, {empresa});
  }
}
