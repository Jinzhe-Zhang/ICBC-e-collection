import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {ActivitydetailPage} from '../activitydetail/activitydetail'
import {Page} from '../../object/page'
@Component({
    selector: 'page-activities',
    templateUrl: 'activities.html'
    })
export class ActivitiesPage {
    private data : any;
    private text : any;
    private activitydetailPage : any;
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest,
        public navParams : NavParams) {
        this.httpRequest.ibmGet('activities/_all_docs').subscribe(res=>{
            console.log(res);
            console.log("haha");
            this.data=res['rows'];
            this.activitydetailPage=ActivitydetailPage;
            });
    }
    ionViewDidLoad() {
    };
    toarticle(item) {
        this.navCtrl.push(this.activitydetailPage,{"id":item.id});
    }
}
