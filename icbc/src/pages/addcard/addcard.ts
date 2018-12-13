import { Component } from '@angular/core';
import { NavController,NavParams,ToastController} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {User} from '../../object/user'
@Component({
    selector: 'page-addcard',
    templateUrl: 'addcard.html'
    })
export class AddcardPage {
    private cardno : any;
    private fatherpage : any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl : ToastController,
        public httpRequest : HttpRequest) {
        this.fatherpage=navParams.get("fatherpage")
    }
    ionViewDidLoad() {
    };
    private popToast(msg : string){
        let myToast = this.toastCtrl.create({
            message : msg,
            duration : 1000,
            position : "bottom",
            showCloseButton:true,
            closeButtonText:"关闭"});
        myToast.present();
    }
    submit(){
        let page=this;
        let a=User.getcards();
        console.log(a);
        a.push({'card_no':this.cardno});
        console.log(a);
        User.setcards(a);
        this.httpRequest.quickUpdate("users/"+User.getusername(),{
            "cards": a
            },function(){
                page.popToast("添加成功！");
                page.navCtrl.pop();
                })
    }
}
