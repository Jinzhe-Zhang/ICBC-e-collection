import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Http } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'qrscanner.html'
})
export class QRScannerPage {

  constructor(public navCtrl: NavController,
              public platform:Platform,
              public androidPermissions: AndroidPermissions,
              public qrScanner: QRScanner,
              public alertCtrl: AlertController,
              public http: Http) {
                
                // solve the problem - "plugin not installed".
                platform.ready().then(()=>{
                  this.qrscanner();
                })
                
  }

  qrscanner() {
    
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            if (text==="https://vip.dccnet.com.cn/servlet/wcqr?f=ICBCqr&X=1&T=3&P=6&I=dda5a8c6c91e455b&N=6ffca517a6b68febc5cf2a7d95d8fdfb&L=4e77298cf75dea0b2a4e7d6f4865f05221f1a34ff15b0e06f6048076d4b1135fc1728202557100d5"){
            this.alertCtrl.create({title: '付款确认',
      message: "请输入你的支付密码",
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
          }
        },
        {
          text: '确认',
          handler: data => {   
            if(data['password']=='181123'){
                                  this.http.post("http://192.168.43.128:4444/pay",JSON.stringify({
                         "qr_code":"6235124674559394540",
                         "mer_id":"020002040095",
                         "out_trade_no":"ZHL777O15002039",
                         "order_amt":"7370"
                      })).subscribe(res => {
                        this.alertCtrl.create({title: '支付提示',
                  message: "您已支付成功！",
                  buttons: ['确认']
                }).present();
                            },
                            err => {
                        this.alertCtrl.create({title: '支付提示',
                  message: "支付失败，请检查网络！",
                  buttons: ['确认']
                }).present();
                            });}
             else{
                             this.alertCtrl.create({title: '支付提示',
                                message: "密码错误！",
                                buttons: ['确认']
                              }).present();
             }
        
          }
        }
      ]
    }).present();
          }
          else{
                             this.alertCtrl.create({title: '支付提示',
                                message: "暂不支持此类二维码！",
                                buttons: ['确认']
                              }).present();

          }
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
            //alert(data.showing);
          },err => {
            //alert(err);

          });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }

}