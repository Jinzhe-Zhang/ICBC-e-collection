import { Injectable } from '@angular/core';
//import {RequestOptions} from '@angular/http';

@Injectable()
export class User{
    private static username:string="Taylor";
    private static password:string="123456";
    private static email:string="own_lay_4_u@163.com";
    private static phone:string="";
    private static head:any="";
    private static realname:any="";
    private static cards:any=[];
    private static selectcard:number=0;
    private static account:any=[];
    private static transaction:any=[];
    public static getusername(){
        return this.username;
    }
    public static setusername(username:string){
        this.username = username;
    }
    public static getpassword(){
        return this.password;
    }
    public static setpassword(password:string){
        this.password = password;
    }
    public static getemail(){
        return this.email;
    }
    public static setemail(email:string){
        this.email = email;
    }
    public static getphone(){
        return this.phone;
    }
    public static setphone(phone:string){
        this.phone = phone;
    }
    public static gethead(){
        return this.head;
    }
    public static sethead(head:any){
        this.head = head;
    }
    public static getcards(){
        return this.cards;
    }
    public static setcards(cards:any){
        this.cards = cards;
    }
    public static getrealname(){
        return this.realname;
    }
    public static setrealname(realname:string){
        this.realname = realname;
    }
    public static getselectcard(){
        return this.selectcard;
    }
    public static setselectcard(selectcard:number){
        this.selectcard = selectcard;
    }
}
