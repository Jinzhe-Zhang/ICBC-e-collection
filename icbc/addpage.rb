begin
$moduletext="";
$LOAD_PATH[0, 0] = File.join(File.dirname(__FILE__), '..', 'lib')
str=gets
str=str[0..-2]
begin
Dir.mkdir('src/pages/'+str)
rescue Exception => e
end

file=File.open('src/pages/'+str+'/'+str+'.ts','w')
file.write(
   'import { Component } from \'@angular/core\';
import { NavController } from \'ionic-angular\';
import {RequestOptions} from \'@angular/http\';
import {HttpRequest} from \'../../object/httpRequest\'
@Component({
  selector: \'page-'+str+'\',
  templateUrl: \''+str+'.html\'
})
export class '+str.capitalize+'Page {
  private contentt : any = {app_id:1,method:"method"};
  private text : any;
  constructor(public navCtrl: NavController,
    public httpRequest : HttpRequest) {
  }
  ionViewDidLoad() {
   this.httpRequest.httpPost(\'java\',this.contentt).toPromise().then(response => {
        console.log(response);
        this.text = response;
      }); 
  };
  }
' )
file.close
file=File.open('src/pages/'+str+'/'+str+'.html','w')
file.write(
'<ion-header>
  <ion-navbar>
    <ion-title>
      '+str.capitalize+'
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
{{text ? text.app_id :\'Loading...\'}}

</ion-content>
'
)
file.close
file=File.open('src/pages/'+str+'/'+str+'.scss','w')
file.write(
   'page-'+str+' {

}

' )
file.close
file=File.open('src/app/app.module.ts','r')
    file.each { |line| print  line 
        if line == "    MyApp,\n"
            $moduletext+=line+"    "+str.capitalize+"Page,\n";
        elsif line == "import { MyApp } from './app.component';\n"
            $moduletext+=line+"import { "+str.capitalize+"Page } from '../pages/"+str+"/"+str+"';\n";
        elsif line == "import { "+str.capitalize+"Page } from '../pages/"+str+"/"+str+"';\n" || line == "    "+str.capitalize+"Page,\n"
        else
        $moduletext+=line;
        end}
file.close
file=File.open('src/app/app.module.ts','w')
file.write($moduletext)
file.close
rescue Exception => e
    
    puts e.backtrace.inspect
    puts e.message
end
    system "pause"