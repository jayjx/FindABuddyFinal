import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id: string;
  constructor(private router:ActivatedRoute) {
    this.id = this.router.snapshot.params.id;
  }
  ngOnInit() {
  
    this.loginUser()
  }
  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    this.id = value;
    console.log('tabsuserid: ', value);
  }
}
