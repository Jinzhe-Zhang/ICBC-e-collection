import { Component } from '@angular/core';
import { NavController} from 'ionic-angular'
import { PayPage } from '../pay/pay';
import { ActivitiesPage } from '../activities/activities';
import { SearchPage } from '../search/search';
import { MePage } from '../me/me';
@Component({
  templateUrl: 'tabs.html'
  })
export class TabsPage {
  tab1Root = PayPage;
  tab2Root = SearchPage;
  tab3Root = ActivitiesPage;
  tab5Root = MePage;
  private viewHeight= window.innerHeight
  constructor(navCtrl:NavController) {
  }
  ionViewDidLoad() {
    document.getElementById("tabs").style.height=this.viewHeight+"px";
  };
}
