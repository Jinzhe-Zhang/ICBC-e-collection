import { Component } from '@angular/core';
import { NavController ,NavParams, AlertController,ToastController} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {User} from '../../object/user'
import {Page} from '../../object/page'
@Component({
  selector: 'page-receiving',
  templateUrl: 'receiving.html'
  })
export class ReceivingPage {
  private qrcode : string;
  private attach : string;
  private payMoney : number;
  private outtradeno : string;
  private card : string;
  constructor(public navCtrl: NavController,
    public httpRequest : HttpRequest,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.qrcode =navParams.get('qrcode').replace(/&/g,'%26');
    this.payMoney =navParams.get('order_amt') ;
    this.attach =navParams.get('attach') ;
    this.outtradeno =navParams.get('out_trade_no');
    console.log(this.qrcode);
    this.card=User.getcards()[User.getselectcard()]['card_no'];
  }
  ionViewDidLoad() {
    let page = this;
    let p={
      "out_trade_no":this.outtradeno,
      "confirm": "yes"
    }
    this.httpRequest.httpPost('qrcode',p).subscribe(response => {
      this.toastCtrl.create({
        message : "交易完成！",
        duration : 1000,
        showCloseButton : false,
        position : "bottom"}).present();
      let p={
        "_id":User.getusername()+":"+response['Trade_time'],
        "attach":this.attach,
        "total_amt":this.payMoney,
        "mycard_no":this.card
      }
      console.log(p);
      this.httpRequest.ibmPost('accounts',p).subscribe(response =>{
        if(Page.searchpage){
          Page.searchpage.constructor(Page.searchpage.navctrl,Page.searchpage.httpRequest);
        }
        },error=>{
          console.log(error);
          });
      Page.paypage.ionViewDidLoad();
      page.navCtrl.pop();
      },error =>{
        this.alertCtrl.create({
          title: "交易异常",
          subTitle: "交易失败！\n请检查网络连接状况",
          buttons: ['确认']
          }).present;
        page.navCtrl.pop();
        });
  };
  ionViewWillLeave(){

  }
}
