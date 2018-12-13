import { Component } from '@angular/core';
import { NavController,ToastController,NavParams } from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest';
import {User} from '../../object/user';
import {AccountPage} from '../account/account';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
    selector: 'page-changeInformation',
    templateUrl: 'changeInformation.html'
    })
export class ChangeInformationPage {
    private email : string;
    private phone : string;
    private fatherpage : any;
    private img : any="";
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public camera: Camera,
        private toastCtrl : ToastController,
        public httpRequest : HttpRequest
        ) {
        this.email=User.getemail();
        this.phone=User.getphone();
        this.fatherpage=navParams.get('fatherpage');
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
    getPictureByCamera() {    
        const options: CameraOptions = {
            quality: 100,//图片质量
            destinationType: this.camera.DestinationType.DATA_URL,//返回值的格式
            sourceType: this.camera.PictureSourceType.CAMERA,//设置图片的来源
            allowEdit:true,//是否允许编辑
            encodingType: this.camera.EncodingType.JPEG,//选择返回的图像文件的编码
            mediaType: this.camera.MediaType.PICTURE,//选择媒体类型，根据sourceType确定
            saveToPhotoAlbum: true//是否在拍照后保存到相册
        }
        this.camera.getPicture(options).then((imageDATA) => {
            this.img=imageDATA;
            }, (err) => {
                // Handle error
                });
    }
    public submit(){
        let page=this;
        this.httpRequest.httpPost("face",{
            "id":User.getusername(),
            "img":this.img
            }).subscribe(res=>{
                page.popToast("上传成功！");
                })
            if(this.img){
                this.httpRequest.httpPost("face",{
                    "id":User.getusername(),
                    "img":this.img
                    }).subscribe(res=>{
                        page.popToast("上传成功！");
                        })
                };
                this.httpRequest.quickUpdate('users/'+User.getusername(),{
                    "email": this.email,
                    "phone": this.phone,
                    "pic": this.img
                    },function(){
                        User.setemail(page.email);
                        User.setphone(page.phone);
                        page.popToast("修改成功！");
                        page.fatherpage.email=page.email;
                        page.fatherpage.phone=page.phone;
                        page.navCtrl.pop();
                        });
            }
        }