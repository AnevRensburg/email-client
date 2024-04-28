import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}
// Export interface for signup credentials to be used in signup.component.ts
export interface SignUpCredentials { 
  username: string,
  password: string,
  passwordConfirmation: string;
}
interface SignUpResponse { 
  username: string;
}
interface checkAuthResponse { 
  authenticated: boolean,
  username: string;
}
// Export interface for signup credentials to be used in signin.component.ts
export interface SignInCredentials {
  username: string,
  password: string;
}
interface SignInResponse {
  username: string;
}





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // signedin$ =  new BehaviorSubject<boolean | null>(null);
  signedin$ =  new BehaviorSubject(false);
  test = true;
  username = '';

  constructor(private http: HttpClient) {}

  // Make a post request to see is username is available
  usernameAvailable(username: string){
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username', 
      { username: username }
    )
  }

  // Sign new user up
  signUp(credentials: SignUpCredentials){
    return this.http.post<SignUpResponse>(this.rootUrl + '/auth/signup', credentials)
    .pipe(
      tap(({ username }) => {
        this.username = username;
        this.signedin$.next(true);
      })
    )
  }

  // Do a check to see if user is signed in
  checkAuth(){
    return this.http.get<checkAuthResponse>(this.rootUrl + '/auth/signedin')
    // Set the set value of signed in equeal to the boolean response of the request
    .pipe(
      tap(({ authenticated, username }) => {
        console.log('Auth', authenticated);
        this.username = username;
        this.signedin$.next(authenticated);
        console.log('this.username is ', this.username)
        this.username = username;
      })
    )
  }

  // Sign user out
  signOut(){
    return this.http.post(this.rootUrl + '/auth/signout', {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  // Sign user in
  signIn(credentials: SignInCredentials){
    return this.http.post<SignInResponse>(this.rootUrl + '/auth/signin', credentials)
    .pipe(
      tap(({ username }) => {
        this.username = username;
        this.signedin$.next(true);
      })
    )
  }
  
}
