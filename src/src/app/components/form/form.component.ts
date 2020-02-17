import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {
  
  title: string;
  
  // Form
  member: string;
  feedback : string;
  grade : number = 1;
  
  members: string[];
  collectionName: string;

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly service : FirebaseService,
    private readonly datePipe: DatePipe,
    private readonly alertController: AlertController,
    private readonly router: Router,
    private readonly storage: LocalStorageService) {
    this.title = this.route.snapshot.paramMap.get("description");
  }

 async ngOnInit() {
    const setting = this.storage.getSetting();
    const group = this.storage.getGroup();
    this.collectionName = setting.collection;
    this.members = group != null ? group.members : [];
  }
  compareWithFn = (o1: any, o2: any) => {
    return o1 === o2;
  };
  
  onRateChange(value: number){
    this.grade = value;
  }
  
  clear() {
    this.feedback = "";
    this.grade = 1;
    this.member = "";
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Grupo Pró - Estudar',
      message: 'Feedback enviado com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.clear();
            this.router.navigate([""])
          }
        }
      ]
    });

    await alert.present();
  }
 
 async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Grupo Pró - Estudar',
      message: 'Preencha os campos obrigatórios : Feedback e Professor.',
      buttons: ['OK']
    });

    await alert.present();
  }

  save(obj : any) {
    if(this.collectionName == "feedbacks") {
      obj.group = this.title,
      obj.member =  this.member 
     }
     this.service.add(obj,this.collectionName);
  }
  
  async submit() {
    if(this.feedback.length == 0  || this.member.length == 0) {
      await this.errorAlert();
      return; 
    }

    this.save({
      createdAt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      feedback: this.feedback,
      grade: this.grade
    }); 
    
    await this.successAlert();
    return;
  }
}
