import { Component } from '@angular/core';
import { NavController , NavParams, ToastController, App, AlertController, LoadingController} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest';
import {Page} from '../../object/page';
import {ReceivingPage} from '../receiving/receiving';
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
  })
export class PayPage {
  private  text : string ;
  private  attach : string ; //备注
  private  ptext : string ;
  private  sum : number =0;
  private  calcbtns : Array<string> ;
  private numstack : Array<number> = [];
  constructor(public navCtrl: NavController,
    private toastCtrl : ToastController,
    public httpRequest : HttpRequest) {
    Page.paypage=this;
  }
  ionViewDidLoad() {
    this.text="";
    this.attach="";
    this.sum=0;
    this.calcbtns=[
    '7','8','9','4','5','6','1','2','3','0','+','.'
    ]
  };
  public btnpush(btn : string ){
    if(btn=='+')
    {     //加号
      if(this.text!="" &&  this.text.charAt(this.text.length-1)!='+') {
        this.text+='+';

      }  
    }
    else if (btn=='cancel')
    {     //退格
      if((/^(.*)(\+[\d\.]*)$/).test(this.text)){
        this.text=RegExp.$1;
        this.sum=this.text != ""?eval(this.text) : 0;}
        else{
          this.text = "";
          this.sum = 0;
        }
      }
      else if (btn=='ok')
      {     //提交
        if(this.sum>0){
          let p : any = {

            mer_id :"020002040095",
            store_code :"02000015087",
            out_trade_no :"ZHL777O15002039",
            order_amt : this.sum*100,
            attach : this.attach,
            confirm : "no"
          }
          this.httpRequest.httpPost('qrcode',p).subscribe(response => {
            console.log(response);
            console.log(p);
            response["order_amt"]=p["order_amt"];
            response["attach"]=p["attach"];
            response["out_trade_no"]=p["out_trade_no"];
            this.navCtrl.push(ReceivingPage,response);
            console.log(response);
            }); }
          else
          {
            this.toastCtrl.create({
              message : "请输入支付金额！",
              duration : 1000,
              showCloseButton : false,
              position : "bottom"}).present();
          }
        }
    else{
      if(!(/\.\d\d$/).test(this.text)){
        if(btn=='.' && (this.text=="" ||  this.text.charAt(this.text.length-1)=='+'))
        {this.text+="0.";}
        else if(btn=='.' && this.text!="" &&  this.text.charAt(this.text.length-1)=='.'){}
        else if(btn!='+'&&btn!='.'&&this.text.charAt(this.text.length-1)==='0'&&(this.text.charAt(this.text.length-2)==='+' || this.text.length===1)){
          {this.text=this.text.substr(0,this.text.length-1)+btn;}
        }
        else
        {          this.text+= btn;
          if(eval(this.text)>100000){
            this.text=this.text.substr(0,this.text.length-1);
            this.toastCtrl.create({
              message : "单次收款金额不能超过10万元",
              duration : 1000,
              showCloseButton : false,
              position : "bottom"}).present();
            return;
          }

          this.sum=this.text != ""?eval(this.text) : 0;
        }
        }
        }
        this.ptext=this.text.length>30? '...'+this.text.substr(this.text.length-31,this.text.length) : this.text;

      }
    }