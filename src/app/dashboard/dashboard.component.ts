import { Component, OnInit } from '@angular/core';
import { OwnersService } from './owners.service';
import { Owner } from './owner';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  owners: Owner[];
  isLoading: boolean;
  user: User;

  constructor(private ownersService: OwnersService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getOwners();
    this.user = this.authenticationService.currentUserValue;
  }

  getOwners() {
    this.isLoading = true;
    this.ownersService.getOwners()
      .subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error));
  }

  handleResponse(response: Owner[]): void {
    this.isLoading = false;
    this.owners = response;
  }

  handleError(error: any): void {
    this.isLoading = false;
    console.error(error);
  }
}
