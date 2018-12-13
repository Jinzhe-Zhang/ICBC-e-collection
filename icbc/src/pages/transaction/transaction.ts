import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest';
import {User} from '../../object/user';
declare var echarts;
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
  })
export class TransactionPage {
  @ViewChild('container1') container1:ElementRef;
  @ViewChild('container2') container2:ElementRef;
  @ViewChild('container3') container3:ElementRef;
  private chart : any;
  private chart2 : any;
  private chart3 : any;
  private text : any;
  private flag :number=0;
  private monthMoney : any=[0,0,0,0,0,0,0,0,0,0,0,0];
  private dayMoney : any=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  private weekMoney : any=[0,0,0,0];
  private date :Date = new Date;
  private monthdata :any =['一\n月','二\n月','三\n月','四\n月','五\n月','六\n月','七\n月','八\n月','九\n月','十\n月','十\n一\n月','十\n二\n月'];
  private weekdata : any =['周日','周一','周二','周三','周四','周五','周六'];
  private datedata : string[] = new Array(28);
  ionViewDidLoad() {
    let ctx = this.container1.nativeElement;
    this.chart = echarts.init(ctx,'macarons');
    this.chart.setOption(
    {
      grid: {
        x: 40,
        x2:50
        },
        title : {
          text: '周结算'
          },
          tooltip : {
            trigger: 'axis'
            },
            legend: {
              data:['上周营业额','本周营业额'],
              x:'right'
              },
    /*toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
        },*/
        calculable : true,
        xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : this.weekdata.slice(this.date.getDay(),7).concat(this.weekdata.slice(0,this.date.getDay()))
        }
        ],
        yAxis : [
        {
          type : 'value',
          max :Math.round(Math.max.apply({},this.dayMoney)/180)*200,
          min : 0,
          axisLabel : {
            formatter: '¥{value}',
            position: 'bottom',
            margin:10,
            rotate:45
          }
        }
        ],
        series : [
        {
          name:'上周营业额',
          type:'line',
          data:this.dayMoney.slice(14,21)
          },
          {
            name:'本周营业额',
            type:'line',
            data:this.dayMoney.slice(21,28),
            markLine : {
              data : [
              {type : 'average', name : '平均值'}
              ]
            }
          }
          ],
          color:[
          "#f7cefa", '#ff7f50']

        }
        );
    

    

    
    let ctx2 = this.container2.nativeElement;
    this.chart2 = echarts.init(ctx2,'macarons');
    this.chart2.setOption(
    {
      grid: {
        x: 50,
        x2: 50
        },
        title : {
          text: '月结算'
          },
          tooltip : {
            trigger: 'axis'
            },
            legend: {
              data:['周营业额','日营业额'],
              x:'right'
              },
    /*toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
        },*/
        calculable : true,
        xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data:[this.datedata[0],this.datedata[7],this.datedata[14],this.datedata[21],this.date.getMonth()+1+'.'+this.date.getDate()]
          },
          {
            show : false,
            boundaryGap : true,
            data:[this.datedata[0]+'-'+this.datedata[6],this.datedata[7]+'-'+this.datedata[13],this.datedata[14]+'-'+this.datedata[20],this.datedata[21]+'-'+this.datedata[27]]
            },
            {
              show : false,
              boundaryGap : true,
              data:this.datedata
            }
            ],
            yAxis : [
            {
              type : 'value',
              max :Math.round(Math.max.apply({},this.weekMoney)/800)*1000,
              min : 0,
              name: '周营业额',
              axisLabel : {
                formatter: '¥{value}',
                margin:10,
                rotate:45
              }
              },
              {
                type : 'value',
                name: '日营业额',
                max :Math.round(Math.max.apply({},this.dayMoney)/180)*200,
                min : 0,
                axisLabel : {
                  formatter: '¥{value}',
                  position: 'right',
                  margin:15,
                  rotate:-45
                }
              }
              ],
              series : [
              {
                name:'周营业额',
                type:'line',
                data:this.weekMoney,
                xAxisIndex:1,
                legendHoverLink:false
                },
                {
                  name:'日营业额',
                  type:'bar',
                  data:this.dayMoney,
                  xAxisIndex:2,
                  yAxisIndex:1,
                  legendHoverLink:false
                }
                ],
                color:[
                "#3578e9", '#ff7f50']

              }
              );

    
    let ctx3 = this.container3.nativeElement;
    this.chart3 = echarts.init(ctx3,'macarons');
    this.chart3.setOption(
    {
      grid: {
        x: 50,
        x2: 60
        },
        title : {
          text: '年结算'
          },
          tooltip : {
            trigger: 'axis'
            },
            legend: {
              data:['月营业额'],
              x:'right'
              },
    /*toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
        },*/
        calculable : true,
        xAxis : [
        {
          type : 'category',
          boundaryGap : true,
          data :this.monthdata.slice(this.date.getMonth(),12).concat(this.monthdata.slice(0,this.date.getMonth()))
        }
        ],
        yAxis : [
        {
          type : 'value',
          max :Math.round(Math.max.apply({},this.monthMoney)/1900)*2000,
          min : Math.ceil(Math.min.apply({},this.monthMoney)/1100)*1000,
          axisLabel : {
            formatter: '¥{value}',
            position: 'bottom',
            margin:10,
            rotate:45
          }
        }
        ],
        series : [
        {
          name:'月营业额',
          type:'line',
          data:this.monthMoney,
          markLine : {
            data : [
            {type : 'average', name : '平均值'}
            ]
          }
        }
        ],
        color:[
        '#9370DB']

      }
      );
  };
  constructor(public navCtrl: NavController,
    public httpRequest:HttpRequest) {
    let datee = new Date();
    datee.setDate(this.date.getDate()-28);
    let datestring='accounts/_all_docs?startkey="'+User.getusername()+'.date:'+datee.getFullYear()+(datee.getMonth()<9?'0':'')+(datee.getMonth()+1)+(datee.getDate()<10?'0':'')+datee.getDate()+',"&endkey="'+User.getusername()+'.date:'+this.date.getFullYear()+(this.date.getMonth()<9?'0':'')+(this.date.getMonth()+1)+(this.date.getDate()<10?'0':'')+this.date.getDate()+',"';
    let monthstring='accounts/_all_docs?startkey="'+User.getusername()+'.month:'+(this.date.getFullYear()-1)+(this.date.getMonth()<9?'0':'')+(this.date.getMonth()+1)+':,"&endkey="'+User.getusername()+'.month:'+this.date.getFullYear()+(this.date.getMonth()<9?'0':'')+(this.date.getMonth()+1)+':,"';
    console.log(monthstring);
    this.httpRequest.ibmGet(datestring).subscribe(res=>{
      console.log(res["rows"]);

      //        this.dayMoney=res["rows"].map(function (item){//console.log(item.id.split(":")[2]);
      //            return item.id.split(":")[2];});
      let j=0;
      for (var i = 0; i <28; i++) {
        if (res["rows"][j]&&(res["rows"][j].id.split(":")[1]==datee.getFullYear()+(datee.getMonth()<9?'0':'')+(datee.getMonth()+1)+(datee.getDate()<10?'0':'')+datee.getDate())) {
          this.dayMoney[i]=parseFloat(res["rows"][j].id.split(":")[2]);
          j++;
        }
        datee.setDate(datee.getDate()+1);
      }
      //this.dayMoney=[500, 891, 536, 456, 396, 479, 345,957, 1124, 955, 409, 711, 423, 258,654, 831, 626, 526, 736, 389, 425,757, 924, 835, 329, 621, 483, 408];
      this.weekMoney=[eval(this.dayMoney.slice(0,7).join("+")),eval(this.dayMoney.slice(7,14).join("+")),eval(this.dayMoney.slice(14,21).join("+")),eval(this.dayMoney.slice(21,28).join("+"))];
      console.log(this.dayMoney,this.weekMoney);
      this.ionViewDidLoad();
      });
    this.httpRequest.ibmGet(monthstring).subscribe(res=>{
      let j=0;//this.date.getMonth();
      for (var i = 0; i <12; i++) {
        if (res["rows"][j]&&(Number(res["rows"][j].id.split(":")[1].slice(4,6))==(i+this.date.getMonth())%12+1)) {
          console.log(this.monthMoney,res["rows"],res["rows"][j],res["rows"][j].id);
          this.monthMoney[i]=parseFloat(res["rows"][j].id.split(":")[2]);
          j++;
        }
      }
      console.log(this.monthMoney);
      this.ionViewDidLoad();
      });
    datee = new Date(this.date);
    for (var i = 27; i >= 0; i--) {
      datee.setDate(datee.getDate()-1);
      this.datedata[i]=datee.getMonth()+1+"."+datee.getDate();
      console.log(this.datedata[i],i);
    }
  };

}
