import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {User} from '../../model/user';
import { API_CONFIG } from 'config';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged=new BehaviorSubject<boolean>(false);
  isAuthenticated$= this.isLogged.asObservable();  
  private apiBaseUrl = API_CONFIG.apiBaseUrlAuth; 

  token: any|unknown;

  constructor(private  http:HttpClient,  private router: Router
    ) {
    const local=localStorage.getItem("token");
    if(local){
      try{
      const {token,expiration}=JSON.parse(local);
      const now=new Date();
      if(now.getTime()>expiration){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.isLogged=new BehaviorSubject<boolean>(false);
        this.isAuthenticated$=this.isLogged.asObservable();
      }else{
        this.isLogged=new BehaviorSubject<boolean>(true);
        this.isAuthenticated$=this.isLogged.asObservable();
      }
    }catch(error){ console.log(error); }
  };}

  getToken(): string {
    const local=localStorage.getItem("token");
    if(!local){
      return "";
    }

    const {token,expiration}=JSON.parse(local);

    return token;

  }

  login(token: string,roles:string,expirationDate:string){
    const expiration = new Date(expirationDate); 
    console.log(token)
    localStorage.setItem('token', JSON.stringify({token:token,expiration:expiration}));
    localStorage.setItem("role",roles);
    this.isLogged.next(true);
  }

  logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem("role");
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }
  async sign_in(user: User): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    const url = `${API_CONFIG.apiBaseUrlAuth}/User/Login`;
    try {
      return await this.http.post<any>(url, user, httpOptions).toPromise();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  hasRole(role:string):boolean{
    if(localStorage.getItem("role")===role){
      return true;
    }
    return false;
  }
  getCurrentUserRole(): string | null {
    return localStorage.getItem("role");
  }

  signUp(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<User>(`${this.apiBaseUrl}/User/register`, user, httpOptions);
  }

  deleteUser(user: User): Observable<any> { // Changed return type to any as DELETE might not return User
    const url = `${this.apiBaseUrl}/User/DeleteAcc?email=${(user.email)}`;
    return this.http.delete<any>(url);
  }
  

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (Error) {
        return null;
      }
    }
    return null;
  }

  getUserFromToken(): User {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      // Use a regular expression to replace characters that are not letters or spaces
      const nameWithLettersAndSpaces = decodedToken.unique_name.replace(/[^a-zA-Z ]/g, '');
  
      return {
        name: nameWithLettersAndSpaces, 
        email: decodedToken.email
      };
    }
    return {};
  }
  ListUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<any>(`${this.apiBaseUrl}/List`, httpOptions);
  }
  
  
}