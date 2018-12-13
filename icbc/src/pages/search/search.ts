import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest';
import {User} from '../../object/user';
import {Page} from '../../object/page';
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
    })
export class SearchPage {
    private date : Date = new Date();
    private data : any =[];
    private todayTradeMoney : number = 0;
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest) {
        this.date = new Date();
        //.has("firstName")
        let page = this;
        Page.searchpage=this;
        let datestring='accounts/_all_docs?startkey="'+User.getusername()+':'+[this.date.getFullYear(),this.date.getMonth()+1,this.date.getDate()].join(',')+',"&endkey="'+User.getusername()+':'+[this.date.getFullYear(),this.date.getMonth()+1,this.date.getDate()].join(',')+'z"';
        console.log(datestring);
        this.httpRequest.ibmGet(datestring).subscribe(res=>{
            res['rows'].map(function (item,index) { 
                page.httpRequest.ibmGet("accounts/"+item['id']).subscribe(response=>{
                    console.log(response,page.data);
                    console.log(page.data);
                    let a=parseInt(response['total_amt']);
                    page.todayTradeMoney+=a;
                    response['account']='color'+((a>=100000)? '6' : Math.ceil(Math.log10(a+0.5)) );
                    let b=response['_id'].split(':')[1].split(',');
                    response['time']=b[0]+'年'+b[1]+'月'+b[2]+'日 '+b[3]+'时'+b[4]+'分';
      /*while(page.data.length<index){

          };*/
          //page.data.push(response); 会乱序
          page.data.splice(index,0,response);

          });
                });
            });
        
    };
    ionViewDidLoad() {
    };
};

