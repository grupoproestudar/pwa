import { Injectable } from '@angular/core';
import { Setting } from '../models/setting.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  clear() {
    localStorage.clear();
  }
  addSetting(obj : Setting) {
    localStorage.setItem("settings", JSON.stringify(obj));
  }
  addGroup(obj: Group) {
    localStorage.setItem("groups", JSON.stringify(obj));
  }
  getSetting() : Setting {
    const  item = localStorage.getItem("settings");
    return JSON.parse(item) as Setting;
  }
  getGroup() : Group {
    const  item = localStorage.getItem("groups");
    return JSON.parse(item) as Group;
  }
}
