import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@Component({
  templateUrl: 'welcome.html'
  })
export class WelcomePage{
  public loginPage;
  constructor(public navCtrl: NavController) {
    this.loginPage = LoginPage;
  }
  slides = [
  {
    title: "欢迎来到e收款",
    description: "工行e收款 线上支付 简单便捷<br/>提升用户消费体验",
    image: "../../assets/imgs/welcomepage/1.png",
    },
    {
      title: "轻轻一扫 “码”上支付",
      description: "商家输入要付款的金额生成标识二维码<br/>用户扫码即可完成支付.",
      image: "../../assets/imgs/welcomepage/2.jpg",
      },
      {
        title: "e收款 惠生活",
        description: "让收付款更加简便快捷<br/>给您带来愉快的体验！",
        image: "../../assets/imgs/welcomepage/3.jpg",
      }
      ];
  private toTabPage(){
    this.navCtrl.setRoot(this.loginPage);
  }
}