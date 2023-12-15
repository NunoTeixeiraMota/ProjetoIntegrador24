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
    }
  };

  getToken(): string | null {
    const local=localStorage.getItem("token");
    if(!local){
      return null;
    }

    const {token,expiration}=JSON.parse(local);

    return token;

  }

  login(token: any,role:string){
    const expiration=new Date().getTime() + (60*60*1000);
    localStorage.setItem('token', JSON.stringify({token:token,expiration:expiration}));
    localStorage.setItem("role",role);
    this.isLogged.next(true);
  }

  logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem("role");
    this.isLogged.next(false);
  }

  async sign_in(user: User): Promise<any | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return await this.http.post<any>(
      `${API_CONFIG.apiBaseUrl}/api/auth/signin`, 
      user,
      httpOptions
    ).toPromise();
  }

  hasRole(role:string):boolean{
    if(localStorage.getItem("role")===role){
      return true;
    }
    return false;
  }
}