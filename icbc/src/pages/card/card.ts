import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {User} from '../../object/user';
import {CarddetailPage} from '../carddetail/carddetail'
@Component({
    selector: 'page-card',
    templateUrl: 'card.html'
    })
export class CardPage {
    private cards : any;
    private carddetailPage : any;
    private selectcards : any=[];
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest) {
        this.httpRequest.ibmGet('cards/_all_docs?startkey="'+User.getusername()+':"&endkey="'+User.getusername()+':|"').toPromise().then(response => {
            this.cards=response['rows'];
            this.selectcards=response['rows'];
            this.carddetailPage=CarddetailPage;
            console.log(this.selectcards,this.cards);
            }); 
    }
    ionViewDidLoad() {
    };

    getItems(val) {
        // Reset items back to all of the items

        // set val to the value of the ev target
        // if the value is an empty string don't filter the items
        console.log(val,this.selectcards);
        if (val && val.trim() != '') {
            this.selectcards = this.cards.filter((item) => {
                return ((item["id"].split(':')[1].slice(-4)).toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
        }
        else{
            this.selectcards = this.cards;
        }
        console.log(val,this.selectcards);
    }
    select(i){console.log(i);
        this.navCtrl.pop();
        this.navCtrl.push(this.carddetailPage,{'id':i});
    }
}
