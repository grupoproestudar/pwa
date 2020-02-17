import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Setting } from 'src/app/models/setting.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  settings: Observable<Setting[]>;
  user: any;

  constructor(
    private readonly service: FirebaseService, 
    private readonly router: Router,
    private readonly firebaseauth: AngularFireAuth,
    private readonly storage: LocalStorageService,
    private readonly loadingController: LoadingController) {
      firebaseauth.user.subscribe((data => {
        this.user = data;
      })); 
     }

  async ngOnInit() {
    
    (await this.loading()).present();
    
    this.settings = this.service.getSettings();
    
    this.settings.subscribe(async (elements)=> {
      if(elements.length > 0) {
        (await this.loading()).onDidDismiss()
      }
    })

    this.firebaseauth.auth.signInAnonymously();
  }

   loading(): Promise<HTMLIonLoadingElement>  {
    return  this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
  }

  redirectTo(config: Setting) {
    this.storage.clear();
    this.storage.addSetting(config);

    if (config.collection == "feedbacks") {
      this.router.navigate(["feedback"])
    } else {
      this.router.navigate(["form", config.title]);
    }
  }
}
