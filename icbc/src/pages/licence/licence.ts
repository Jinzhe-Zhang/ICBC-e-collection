import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequestOptions} from '@angular/http';
import {HttpRequest} from '../../object/httpRequest'
@Component({
    selector: 'page-licence',
    templateUrl: 'licence.html'
    })
export class LicencePage {
    constructor(public navCtrl: NavController,
        public httpRequest : HttpRequest) {
    }
}
