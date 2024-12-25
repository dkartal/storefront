import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5000/api/users";
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(user: {firstname: string, lastname: string,  password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, user);
  }

  login(user: {firstname: string, lastname: string,  password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.success) {
          this.loggedIn.next(true); // Update logged-in state
        }
      })
    );  
  }

  logout(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.success) {
          this.loggedIn.next(false); // Update logged-in state
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
