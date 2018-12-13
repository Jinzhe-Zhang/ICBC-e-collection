import { Component } from '@angular/core';
import { NavController ,NavParams,AlertController} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {CardPage} from '../card/card';
@Component({
    selector: 'page-carddetail',
    templateUrl: 'carddetail.html'
    })
export class CarddetailPage {
    private id : string;
    private password : any;
    private balance : string="未知";
    private cardPage : any;
    private confirmation : boolean=false;
    private borrow : number=0;
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest,
        public navParams : NavParams,
        public alertCtrl : AlertController) {
        this.id=navParams.get('id');
        console.log(navParams);
        this.httpRequest.ibmGet('cards/'+this.id).toPromise().then(response => {
            console.log(response);
            this.password = response['password'];
            this.balance = response['balance'];
            this.cardPage = CardPage;
            this.borrow = response['borrow']?response['borrow']:this.borrow;
            });
        
        this.alertCtrl.create({title: '密码确认',
            message: "请输入你的银行卡密码",
            inputs: [
            {
                name: 'password',
                placeholder: 'password',
                type:'password'
                },
                ],
                buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('您取消了此次交易');
                        this.navCtrl.pop();
                        this.navCtrl.push(this.cardPage);
                    }
                    },
                    {
                        text: '确认',
                        handler: data => {   
                            if(data['password']==this.password){
                                this.confirmation = true;
                            }
                            else{
                                this.alertCtrl.create({title: '安全提示',
                                    message: "密码错误！",
                                    buttons: [        {
                                        text: '取消',
                                        handler: data => {
                                            this.navCtrl.pop();
                                            this.navCtrl.push(this.cardPage);
                                        }
                                        }]
                                        }).present();
                            }
                            
                        }
                    }
                    ]
                    }).present();
    }
    
    ionViewDidLoad() {
    };
}
