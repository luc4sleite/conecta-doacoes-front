import { LoginResponse } from './../types/login-response-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("user-name", value.name)
        sessionStorage.setItem("user-role", value.role)
      })
    )
  }

  register(name: string, email: string, role: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/register`, {name, email, role, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("user-name", value.name)
        sessionStorage.setItem("user-role", value.role)
      })
    )
  }
}
