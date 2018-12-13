import { Component,ChangeDetectorRef } from '@angular/core';
import { NavController,NavParams,ToastController,AlertController} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest';
import {User} from '../../object/user';
import {AddcardPage} from '../addcard/addcard';
import {ChangeInformationPage} from '../changeInformation/changeInformation';
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
    private text : any;
  private username : any;
  public email : any;
  public phone : any;
  private cards : any;
  private selectcard : number;
  private addcardPage : any;
  private changeInformationPage : any;
  constructor(public navCtrl: NavController,
    public httpRequest : HttpRequest,
    public alertCtrl : AlertController,
    public navParams : NavParams,
    public cd: ChangeDetectorRef,
    public toastCtrl: ToastController) {
    this.username=User.getusername();
    this.email=User.getemail();
    this.phone=User.getphone();
    this.cards=User.getcards();
    this.selectcard=User.getselectcard();
    this.addcardPage=AddcardPage;
    this.changeInformationPage=ChangeInformationPage; }
  ionViewDidLoad() {
    if(typeof(this.selectcard)!="undefined"){
        document.getElementById("card"+this.selectcard).className="selected"; }/*
   this.httpRequest.httpPost('java',this.contentt).toPromise().then(response => {
        console.log(response);
        this.text = response;
      }); */
  };
  private popToast(msg : string){
    let myToast = this.toastCtrl.create({
      message : msg,
      duration : 1000,
      position : "bottom",
    showCloseButton:false,
    closeButtonText:"关闭"});
    myToast.present();
  }
  public addcard(){
    this.navCtrl.push(this.addcardPage,{fatherpage:this});
  }
  public changeInformation(){
    this.navCtrl.push(this.changeInformationPage,{fatherpage:this});
  }
  public select(i){
    if(typeof(this.selectcard)!="undefined"){
    document.getElementById("card"+this.selectcard).className="";}
    User.setselectcard(i);
    console.log(i);
    this.selectcard=i;
    document.getElementById("card"+i).className="selected";
      this.popToast("您已更换卡片！");
  }
  public delete(i){
    let page=this;
    this.alertCtrl.create({
    title: '确认删除',
    message: '您想删除这张卡片吗？\n'+User.getcards()[i].card_no,
    buttons: [
      {
        text: '确认',
        handler: () => {
         let a= User.getcards();
         a.splice(i,1);
          User.setcards(a);
          console.log(User.getcards());
          this.httpRequest.quickUpdate("users/"+User.getusername(),{
        "cards": a
      },function(){
    page.popToast("删除成功！");
     })
        }
      },
      {
        text: '取消',
        role: 'cancel'
      }
    ]
  }).present();
  }
  }
