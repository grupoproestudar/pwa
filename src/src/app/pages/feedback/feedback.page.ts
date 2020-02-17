import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  groups : Observable<Group[]>;

  constructor(
    private readonly service: FirebaseService, 
    private readonly router: Router,
    private readonly storage: LocalStorageService) {}

  ngOnInit() {
    this.groups = this.service.getGroups();
  }
  
  redirectTo(group : Group) : void {
    this.storage.addGroup(group);
    this.router.navigate(["form", group.description]);
  }
}
