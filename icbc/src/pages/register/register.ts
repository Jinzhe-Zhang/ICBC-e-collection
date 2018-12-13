import { Component } from '@angular/core';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {LicencePage} from '../licence/licence'
import { LoginPage } from '../login/login'
///////////
//////////
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
  })
export class RegisterPage {
  password : string = "";
  username : string = "";
  email : string = "";
  confirm : string = "";
  agreed : boolean = false;

  private loginPage : any = null;
  private licencePage : any = null;
  private isRegister : boolean = false;
  private registerOkay : boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private alertCtrl: AlertController,
    private loadingControl : LoadingController,
    private httpRequest : HttpRequest)
  {
    this.loginPage = LoginPage;
    this.licencePage = LicencePage;
  }

  ionViewDidLoad() {
  }
  private popToast(msg : string){
    let myToast = this.toastCtrl.create({
      message : msg,
      duration : 1000,
      position : "bottom",
      showCloseButton:true,
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
  readLicence(){
    this.navCtrl.push(this.licencePage);
  }
  checkPassword(){
    if(this.password != this.confirm
      && this.password.length != 0
      && this.confirm.length != 0){
      this.popToast("password discrepancy");
    }
  }

  checkListIsLegal() : boolean{
    if (this.username.length == 0) {
      this.popToast("用户名不能为空");
    }
    else if (this.email.length == 0) {
      this.popToast("邮箱不能为空");
    }
    else if (!this.email.match(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/))
    {
      this.popToast("邮箱格式不对");
    }
    else if (String(this.password).length == 0) {
      this.popToast("密码不能为空");
    }
    else if (!String(this.username).match(/^[A-Za-z0-9]*$/)){
      this.popToast("用户名必须由字母或数字组成");
    }
    else if (!String(this.password).match(/\S{6,14}/))
    {
      this.popToast("密码必须由6-14位字母，数字或字符组成");
    }
    else if (this.password != this.confirm) {
      this.popToast("两次输入密码不相同");
    }
    else if (!this.agreed) {
      this.popToast("您需要同意我们的协议");
    }
    else {
      return true;
    }
    return false;
  }

  //todo: use Regex to check username and email's legitimacy.

  submitButtonClick(){
    if (this.checkListIsLegal()) {

      let loader = this.loadingControl.create({
        content : "登录中...",
        duration : 10000,
        dismissOnPageChange : true
        });
      loader.present();

      this.httpRequest.ibmHead('users/' + this.username).subscribe(res => {
        //用户名已存在
        //弹窗提示
        loader.dismiss();
        this.showAlert("注册错误","用户名已存在！");
        },
        error => {
          
          this.httpRequest.ibmPost('users',{
            "_id": this.username,
            "email": this.email,
            "password": this.password
            }).subscribe(res => {
              //注册
              loader.dismiss();
              console.log("registered");
              this.popToast("注册成功");
              this.navCtrl.pop();
              },
              error => {
                loader.dismiss();
                //错误处理
                })
            
            })

      // this.navCtrl.setRoot(this.loginPage);
    }
  }

/*
  private signUpErrorHandler(error : Response){
    let message : string = "Unknown Error.";
    console.log(error.statusText);
  }

  private showAlert(title : string, msg : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
    }*/
  }
