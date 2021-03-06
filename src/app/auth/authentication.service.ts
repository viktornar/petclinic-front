import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // Reaguoja i pokycius User object. Kai tik atsinaujina informuoja visus apie
  // ta pokyti.
  private currentUserSubject: BehaviorSubject<User>;
  // Dar paaiskinsiu kam reikalingas;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { // Suveikia DI per konstruktoriu.
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/authenticate`,
      { username, password }
    )
      .pipe(map(user => {
        debugger;
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
