import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { RequestOptions } from '@angular/http';
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";
import { HttpRequest } from '../../object/httpRequest';
import { Buffer } from 'buffer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { elementClass } from '@angular/core/src/render3/instructions';
import {User} from '../../object/user'
import {Page} from '../../object/page'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  })
export class LoginPage {
  private loader : any = null;
  private text: any;
  private username: string;
  private password: string;
  public tabspage: any;
  public registerpage: any;
  constructor(public navCtrl: NavController,
    private toastCtrl : ToastController,
    private alertCtrl: AlertController,
    /////////
    ///////
    private loadingControl : LoadingController,
    public httpRequest : HttpRequest) {
    this.tabspage = TabsPage;
    this.registerpage = RegisterPage;
  }
  ionViewDidLoad() {
    // this.httpRequest.httpPost('java',this.contentt).toPromise().then(response => {
      //      console.log(response);
      //      this.text = response;
      //    }); 

    };
    private popToast(msg : string){
      let myToast = this.toastCtrl.create({
        message : msg,
        duration : 1000,
        showCloseButton : true,
        position : "bottom",
        closeButtonText:"关闭"});
      myToast.present();
    }
    private showAlert(title : string, msg : string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: ['确定']
        });
      alert.present();
    }
    public signIn() {
      let loader = this.loadingControl.create({
        content : "登录中...",
        duration : 10000,
        dismissOnPageChange : true
        });
      loader.present();
      this.httpRequest.ibmGet('users/' + this.username).subscribe(res => {
        if (res['password'] == this.password) {
          console.log("login");
          loader.dismiss();
          User.setusername(this.username);
          User.setpassword(this.password);
          User.setemail(res['email']);
          User.setphone(res['phone']?res['phone']:"");
          User.setcards(res['cards']?res['cards']:[]);
          User.setrealname(res['realname']?res['realname']:"");
          User.setselectcard(res['selectcard']?res['selectcard']:0);
          Page.tabpage=this.navCtrl;
          this.popToast("登录成功");
          //提示
          this.navCtrl.setRoot(this.tabspage);
        }
        else {
          loader.dismiss();
          this.showAlert("登录失败","用户名或密码错误！");
          //提示
        }
        },error =>{
          loader.dismiss();
          this.showAlert("登录失败","用户名不存在！");
          });
    }
    public signUp() {
      this.navCtrl.push(this.registerpage)
    }

  }
