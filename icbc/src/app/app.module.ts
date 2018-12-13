import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { CarddetailPage } from '../pages/carddetail/carddetail';
import { CardPage } from '../pages/card/card';
import { ActivitydetailPage } from '../pages/activitydetail/activitydetail';
import { AddcardPage } from '../pages/addcard/addcard';
import { ChangeInformationPage } from '../pages/changeInformation/changeInformation';
import { AccountPage } from '../pages/account/account';
import { TransactionPage } from '../pages/transaction/transaction';
import { LicencePage } from '../pages/licence/licence';

import { SearchPage } from '../pages/search/search';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ReceivingPage } from '../pages/receiving/receiving';
import { ActivitiesPage } from '../pages/activities/activities';
import { WelcomePage } from '../pages/welcome/welcome';
import { PayPage } from '../pages/pay/pay';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';

import {HttpRequest} from '../object/httpRequest'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    MyApp,
    CarddetailPage,
    CardPage,
    ActivitydetailPage,
    AddcardPage,
    ChangeInformationPage,
    AccountPage,
    TransactionPage,
    LicencePage,
    RegisterPage,
    LoginPage,
    ReceivingPage,
    ActivitiesPage,
    WelcomePage,
    PayPage,
    MePage,
    SearchPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarddetailPage,
    CardPage,
    ActivitydetailPage,
    AddcardPage,
    ChangeInformationPage,
    AccountPage,
    TransactionPage,
    LicencePage,
    RegisterPage,
    LoginPage,
    ReceivingPage,
    ActivitiesPage,
    WelcomePage,
    PayPage,
    MePage,
    SearchPage,
    TabsPage
  ],
  providers: [
    Camera,
    StatusBar,
    HttpRequest,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}