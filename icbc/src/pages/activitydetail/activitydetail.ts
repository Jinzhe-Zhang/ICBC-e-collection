import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
@Component({
    selector: 'page-activitydetail',
    templateUrl: 'activitydetail.html'
    })
export class ActivitydetailPage {
    private id : string;
    private data : any;
    private body : any;
    private oScript : any;
    private oHead : any;
    private oStyle : any;
    private kind : string;
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest,
        public navParams : NavParams) {
        this.id=this.navParams.get('id');
        console.log(this.id);
        this.id =this.id.replace(/&/g,'%26');
        this.id =this.id.replace(/\//g,'%2F');
        this.id =this.id.replace(/:/g,'%3A');
        this.id =this.id.replace(/\\/g,'%5C');
        this.id =this.id.replace(/=/g,'%3D');
        this.id =this.id.replace(/,/g,'%2C');
        console.log(this.id);
        this.httpRequest.ibmGet('activities/'+this.id).subscribe(res=>{
            this.body=document.getElementById("content");
            this.data=res;
            this.kind =this.id.split(">split<")[3];
            if(this.kind=="article"){
                this.body.innerHTML="<div class=\"fixed-content\" style=\"margin-top: 56px; margin-bottom: 56px;\"></div><div class=\"scroll-content\" style=\"margin-top: 56px; margin-bottom: 56px;\">"+this.data.content+"</div>";

                }else if(this.kind=="game"){
                    this.oHead = document.getElementsByTagName('HEAD').item(0);
                    this.oScript= document.createElement("script"); 
                    this.oScript.type = "text/javascript"; 
                    this.oStyle=document.createElement("style");
                    this.oStyle.appendChild(document.createTextNode(this.data.css));
                    this.oHead.appendChild( this.oStyle);
                    this.body.style.padding="56px 0 0 0";
                    this.body.innerHTML=this.data.html;
                    this.oScript.innerHTML=this.data.js;
                    this.body.appendChild( this.oScript);
                }

                console.log(this.data);
                });
    }
    ionViewDidLoad() {
    };
    ionViewWillLeave() {
        this.body.style.padding="";
        if(this.kind=="game"){
            this.body.removeChild(this.oScript);
            this.oHead.removeChild(this.oStyle);}
        }
    }
