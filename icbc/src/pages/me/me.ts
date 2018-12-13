import { Component} from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import {HttpRequest} from '../../object/httpRequest'
import {User} from '../../object/user'
import {Page} from '../../object/page'
import {TransactionPage} from '../transaction/transaction'
import {AccountPage} from '../account/account'
import {LoginPage} from '../login/login'
import {CardPage} from '../card/card'
@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
  })
export class MePage {
  private username:string;
  private date:string;
  private pathhead : string = " ../assets/imgs/mepagebuttons/"
  private items : Array<any> = [];
  private transactionPage :any;
  private cardPage :any;
  private accountPage :any;
  private month
  constructor(public navCtrl: NavController,
    public httpRequest : HttpRequest,
    public alertCtrl: AlertController) {
    this.username=User.getusername();
    let monthname=["January ",
    "February ",
    "March ",
    "April ",
    "May ",
    "June ",
    "July ",
    "August ",
    "September ",
    "October ",
    "November ",
    "December "]
    let d=new Date();
    this.date=monthname[d.getMonth()]+d.getDate()+", "+d.getFullYear();
    this.transactionPage=TransactionPage;
    this.accountPage=AccountPage;
    this.cardPage=CardPage;
    this.items=
    [
    { path: "account.png ", span: "账户管理",page: this.accountPage},
    { path: "PieChart.png ", span: "统计报表",page: this.transactionPage},
    { path: "card.png ", span: "工行卡信息",page: this.cardPage}
    ];

  }
  ionViewDidLoad() {
  };
  public cancel() {
    let page = this;
    let alert = this.alertCtrl.create({
      title: "注销确认",
      subTitle: "您确定要退出当前账户吗？",
      buttons: [{text:'确认',handler: () => {
        Page.tabpage.setRoot(LoginPage);
        }},'取消']
        });
    alert.present();
  };
  push(root:any){
    this.navCtrl.push(root);
  };
}