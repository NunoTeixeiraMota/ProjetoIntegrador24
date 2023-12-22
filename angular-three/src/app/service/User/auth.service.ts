import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {User} from '../../model/user';
import { API_CONFIG } from 'config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged=new BehaviorSubject<boolean>(false);
  isAuthenticated$= this.isLogged.asObservable();  

  token: any|unknown;

  constructor(private  http:HttpClient) {
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

  getToken(): string | null {
    const local=localStorage.getItem("token");
    if(!local){
      return null;
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
      // Handle or throw error
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
}