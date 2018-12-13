import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Buffer } from 'buffer';
//import {RequestOptions} from '@angular/http';

@Injectable()
export class HttpRequest{
  private path : string = 'http://192.168.43.128:4444/';//这里换成服务器网址
  private ibmpath: string = 'https://b7bf9be6-b9b5-435a-97bb-0333669d7045-bluemix.cloudant.com/';//URL https://<account>.cloudant.com
  private usersadminName: string = 'casheaderiverencitsideen';//
  private usersadminPassword: string = 'c6972bb7df71382c99cef814148e96576e5eb37e';
  private accountsadminName: string = 'lydroodstontandedepteene';
  private accountsadminPassword: string = '2e8b1d114f2611f8da72767b7ee1708cd97e27ca';
  private cardsadminName: string = 'regroccausemedeespossons';
  private cardsadminPassword: string = '60e9effb9b77382816c8feb9ee07b8b43230488b';
  private activitiesName: string = 'ovelymposedgerieryinhatu';
  private activitiesPassword: string = '442b38207ed079a0010860313c67ad600e392413';
  private auth: string = new Buffer(this.usersadminName + ':' + this.usersadminPassword).toString('base64');
  private auth2: string = new Buffer(this.accountsadminName + ':' + this.accountsadminPassword).toString('base64');
  private auth3: string = new Buffer(this.cardsadminName + ':' + this.cardsadminPassword).toString('base64');
  private auth4: string = new Buffer(this.activitiesName + ':' + this.activitiesPassword).toString('base64');
  private response : any = null;
    constructor(
    private http: HttpClient) {
  }
  private gethead(type:string) {
    return type=="users"?this.auth:type=="accounts"?this.auth2:type=="cards"?this.auth3:type=="activities"?this.auth4:"";
  }
  public httpPost(path : string, body : any){
    if (!path.match('http')) {
      path=this.path+path;
      // code...
    }
    let h = new HttpHeaders({'Accept':'*/*'});
    return this.http.post(path,JSON.stringify(body),{headers: h});
  }
  public httpGet(path : string){
    if (!path.match('http')) {
      path=this.path+path;
      // code...
    }
    let h = new HttpHeaders({'Accept':'*/*'});
    return this.http.post(path,{headers: h});
  }
  public ibmPost(path : string, body : any){
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    console.log(this.ibmpath+path,JSON.stringify(body));
    return this.http.post(this.ibmpath+path,JSON.stringify(body),{ headers: header });
  }
  public ibmDelete(path : string){
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    return this.http.delete(this.ibmpath+path,{ headers: header });
  }
  public ibmGet(path : string){
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    console.log(header,this.ibmpath+path);
    return this.http.get(this.ibmpath+path,{ headers: header });
  }
  public ibmHead(path : string){
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    console.log(header);
    return this.http.head(this.ibmpath+path,{ headers: header });
  }
  public ibmGetall(path : string){
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    console.log(header);
    return this.http.get(this.ibmpath+path+"/_all_docs",{ headers: header });
  }
  public quickUpdate(path : string, body : any, whattodo : Function){
    let pathsource=path.split('/');
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + this.gethead(path.split('/')[0]),
      'Content-Type': 'application/json'
    });
    this.http.get(this.ibmpath+path,{ headers: header }).subscribe(res=>{let item=res;
    this.http.delete(this.ibmpath+path+'?rev='+res['_rev'],{ headers: header }).subscribe(res =>{
      for (var i in body) {
        item[i]=body[i];
      }
      delete item['_rev'];
      console.log(item);
      this.http.post(this.ibmpath+pathsource[0],JSON.stringify(item),{ headers: header }).subscribe(res =>{
        whattodo();
        return 0;
        },error =>{
          return 1;
          })
      },error=>{
        return 2;
        });},error =>{
      return 3;
      });
  }
}
