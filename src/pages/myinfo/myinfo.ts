import { Component, ViewChild , Inject} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, AlertController, Loading, LoadingController, Content  } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { MyCommunityModifyPage } from '../community/my/my-community-modify/my-community-modify';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';
import { DOCUMENT } from '@angular/common';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';
import { SkinDiagnoseMoisturePage } from '../skin-diagnose-moisture/skin-diagnose-moisture';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture';
import { SettingPage } from './setting/setting';

/**
 * Generated class for the MyinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})

export class MyinfoPage {


     page = "0";
     skinQnaData: any;
     beautyNoteData: any;
     @ViewChild(Slides) slides: Slides;
     jwtHelper: JwtHelper = new JwtHelper();
      id: any;
      mode: any;
      public loadProgress: number = 0;
      valueday = { "day": "1" }
      @ViewChild('lineCanvas') lineCanvas;
      @ViewChild('lineCanvas2') lineCanvas2;
      //문진표
      all_moisture_score: number = 0;
      all_oil_score: number = 0;
      all_first_moisture_score: number = 0;
      all_first_oil_score: number = 0;

      skinScoreData: any;
      circle_moisture: any;
      circle_oil: any;

      pre_circle_moisture: any;
      pre_circle_oil: any;

      chartDateData = [];
      chartOilData = [];
      chartMoistureData = [];
      array1 = [];
      chartDateData2: Array<any>;
      lineChart: any;
      segment_status: any;
      segment_moisture: any;

      carezoneData: any;
      missionData: any;
      loading: Loading;
      userData: any;
      nickname: string;
      currentDate: Date = new Date();
      today: any = new Date().toISOString();
      new: Array<boolean> = new Array<boolean>();
      recruiting: Array<boolean> = new Array<boolean>();
      mdchuchun: Array<boolean> = new Array<boolean>();
      ingmdchuchun: Array<boolean> = new Array<boolean>();
      ingapproaching: Array<boolean> = new Array<boolean>();
      approaching: Array<boolean> = new Array<boolean>();
      endrecruit: Array<boolean> = new Array<boolean>();
      missionCounter: Array<any> = new Array<any>();
      missionCounter2: Array<any> = new Array<any>();
      endcarezoneData: Array<any> = new Array<any>();
      d5: Array<any> = new Array<any>();
      d4: Array<any> = new Array<any>();
      d3: Array<any> = new Array<any>();
      d2: Array<any> = new Array<any>();
      d1: Array<any> = new Array<any>();
      endmission: Array<any> = new Array<any>();
      ingmissionCounter: any;

      thumb_image: any;
      ingBtn: any = false;
      profileimg_url: any;
      imagePath: any;
      from: any;
      origindday: any;
      dday: Array<any> = new Array<any>();


      percent: Array<any> = new Array<any>();


      //mission 정보
      carezone_id: Array<any> = new Array<any>();
      title: Array<any> = new Array<any>();
      maxmember: Array<any> = new Array<any>();
      body: Array<any> = new Array<any>();

      endcarezone_id: Array<any> = new Array<any>();
      endtitle: Array<any> = new Array<any>();
      endmaxmember: Array<any> = new Array<any>();
      endbody: Array<any> = new Array<any>();

      skinbtnYear = format(this.today, 'YYYY');
      skinbtnMonth = format(this.today, 'MM');
      @ViewChild(Content) content: Content;
      skin_diagnose_first_check = false;
      communityEditorBeautyLoadData: any;


      constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider, public modalCtrl: ModalController, public alertCtrl: AlertController,
                  public auth: AuthService, @Inject(DOCUMENT) document, private loadingCtrl: LoadingController) {
      this.segment_moisture = "수분"

      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad MyPage');
        this.id = this.navParams.get('id');
        this.mode = this.navParams.get('mode');
        this.showLoading();
        setTimeout(() => {
        this.selectedTab(1);
      }, 500)
        setTimeout(() => {
        this.selectedTab(0);
      }, 500)
  }

      public selectclick() {
        console.log('ionViewDidLoad selectclick');
        this.lineChart.update();
      }

      ionViewCanEnter() {
        this.loadItems();
      }

      ionViewWillLeave(){

      }


      ionViewWillEnter() {
        this.skinQnaLoad();
        this.beautyNoteLoad();
        this.communityEditorBeautyLoad();
        this.carezoneData = this.roadcareZone();


        // let tabs = document.querySelectorAll('.tabbar');
        // if (tabs !== null) {
        //   Object.keys(tabs).map((key) => {
        //     //tabs[ key ].style.transform = 'translateY(0)';
        //     tabs[key].style.display = 'none';
        //   });
        // }
      }

      public setting_page(){
        this.nav.push(SettingPage);
      }

      ngOnInit(){
      this.slides.autoHeight = true;
      }

      ngAfterViewInit() {
      this.slides.autoHeight = true;
      }


      public skin_first_check() {
        this.auth.getUserStoragediagnose_first_check().then(items => {
          this.skin_diagnose_first_check = items;
          // console.log("skin_diagnose_first_check========" + this.skin_diagnose_first_check);
          //console.log("items" + items);
        });
      }

      public skin_measure() {
        // let alert = this.alertCtrl.create({
        //   cssClass: 'push_alert',
        //   title: "plinic",
        //   message: "준비중입니다.",
        //   buttons: [{
        //     text: '확인'
        //   }]
        // });
        // alert.present();
        if (this.skin_diagnose_first_check) {
          let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage);
          myModal.present();
        }
        else {
          let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage);
          myModal.present();
        }
      }


      public communityEditorBeautyLoad() {
        this.images.communityEditorBeautyLoad().subscribe(data => {
          this.communityEditorBeautyLoadData = data;
        });
      }

      public mission_start(id) {
        //console.log(id);
        //console.log("missiondata" + this.missionData.missionID);

        if (this.missionData === null || this.missionData === undefined) {
          //this.nav.push(CareZoneMissionIngPage);
          this.nav.push(CareZoneMissionStartPage, { _id: id });
        } else if (id === this.missionData.missionID) {
          this.nav.push(CareZoneMissionIngPage, { _id: id });

        } else {
          this.nav.push(CareZoneMissionStartPage, { _id: id });
        }
      }

      public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
        return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
      }

      public roadcareZone() {
        //this.showLoading();
        this.images.carezoneRoad().subscribe(data => {

          if (data !== '') {
            for (let i = 0; i < data.length; i++) {

              // if (new Date(data[i].endmission) > this.currentDate) {
              // console.log("날짜 계산 하자");

              this.endcarezone_id[i] = data[i]._id;
              this.title[i] = data[i].title;
              this.maxmember[i] = data[i].maxmember;
              this.body[i] = data[i].body;



              this.images.missionCount(data[i]._id).subscribe(data2 => {
                this.missionCounter[i] = data2;
              });
              data[i].startmission = new Date(data[i].startmission);
              this.endmission[i] = new Date(data[i].endmission);
              // console.log("end Date : " + data[i].endmission);
              this.new[i] = false;
              this.recruiting[i] = false;
              this.mdchuchun[i] = false;
              this.approaching[i] = false;
              this.endrecruit[i] = false;
              this.d5[i] = false;
              this.d4[i] = false;
              this.d3[i] = false;
              this.d2[i] = false;
              this.d1[i] = false;

              // this.endmission[i] = false;
              // this.dday = this.diffdate(this.currentDate, data[i].startmission);
              // this.dday = parseFloat(this.dday);
              //console.log(this.dday);
              if (this.diffdate(this.currentDate, data[i].startmission) < -10) {
                this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                this.dday[i] = (parseInt(this.origindday)+2);
                this.new[i] = true;
                this.recruiting[i] = true;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d5[i] = true;
              } else if (this.diffdate(this.currentDate, data[i].startmission) < -7) {
                this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                this.dday[i] = (parseInt(this.origindday)+2);
                this.new[i] = false;
                this.recruiting[i] = true;
                this.mdchuchun[i] = true;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d5[i] = true;
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -6 && this.diffdate(this.currentDate, data[i].startmission) < -5) {
                this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                this.dday[i] = (parseInt(this.origindday)+2);
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d5[i] = true;
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -5 && this.diffdate(this.currentDate, data[i].startmission) < -4) {
                this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                this.dday[i] = (parseInt(this.origindday)+2);
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d4[i] = true;
                this.d3[i] = false;
                this.d2[i] = false;
                this.d1[i] = false;
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -4 && this.diffdate(this.currentDate, data[i].startmission) < -3) {
                this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                this.dday[i] = (parseInt(this.origindday)+2);
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d3[i] = true;
                this.d2[i] = false;
                this.d1[i] = false;
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) < -2) {
                // this.origindday = this.diffdate(this.currentDate, data[i].startmission);
                // this.dday[i] = parseFloat(this.origindday);
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d3[i] = false;
                this.d2[i] = true;
                this.d1[i] = false;
                this.images.missionCount(data[i]._id).subscribe(data2 => {
                  this.missionCounter2[i] = data2;
                  this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
                  //console.log(this.percent[i])

                  if(this.percent[i] <= 50){
                    this.ingmdchuchun[i] = true;
                    this.ingapproaching[i] = false;
                  }
                  if(this.percent[i] > 50){
                    this.ingmdchuchun[i] = false;
                    this.ingapproaching[i] = true;
                  }
                });
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -2 && this.diffdate(this.currentDate, data[i].startmission) < -1) {
                //console.log("D-111111111");
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
                this.d3[i] = false;
                this.d2[i] = false;
                this.d1[i] = true;
                this.images.missionCount(data[i]._id).subscribe(data2 => {
                  this.missionCounter2[i] = data2;
                  //console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
                  //console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
                  this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
                  //console.log(this.percent[i])

                  if(this.percent[i] <= 50){
                    //console.log("MD추천");
                    this.ingmdchuchun[i] = true;
                    this.ingapproaching[i] = false;
                  }
                  if(this.percent[i] > 50){
                    //console.log("마감임박");
                    this.ingmdchuchun[i] = false;
                    this.ingapproaching[i] = true;
                  }
                });
              } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) <= 0) {
               // console.log("모집중 ");
               this.d1[i] = true;
                this.images.missionCount(data[i]._id).subscribe(data2 => {
                  this.missionCounter2[i] = data2;
                  // console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
                  // console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
                  this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
                  // console.log(this.percent[i])

                  if(this.percent[i] <= 50){
                    // console.log("MD추천");
                    this.ingmdchuchun[i] = true;
                    this.ingapproaching[i] = false;
                  }
                  if(this.percent[i] > 50){
                    // console.log("마감임박");
                    this.ingmdchuchun[i] = false;
                    this.ingapproaching[i] = true;
                  }
                });

              } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0) {
                // console.log("진행중 + 모집마감 ");
                this.new[i] = false;
                this.recruiting[i] = false;
                this.mdchuchun[i] = false;
                this.approaching[i] = true;
                this.endrecruit[i] = true;
              } else {
                this.new[i] = false;
                this.recruiting[i] = true;
                this.mdchuchun[i] = false;
                this.approaching[i] = false;
                this.endrecruit[i] = false;
              }

              this.endcarezoneData = data[i];
              // }


            }
            this.carezoneData = data;
            setTimeout(() => {
              this.loading.dismiss();
            }, 1000);
          } else {
            this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
          }
        });

      }

      //20190617 미션 참여중인지 체크 하기
      public chkmission(email) {
        // this.showLoading();
        //console.log("chkBtn" + this.chkBtn);
        this.images.chkMission(email).subscribe(data => {

          if (data !== '' || data !== null) {
            //this.chkBtn = true;
            this.missionData = data;
            //this.endDate = data.endmission.substr(0, 10);
            //console.log(JSON.stringify(data));
            // this.loading.dismiss();
          } else if (data === '' || data === null || data === undefined) {
            //this.chkBtn = false;
          } else {
            this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
          }
        });

      }

      //20190618 진행 중인 미션 체크 하기
      public chkIngmission(email) {
        // this.showLoading();
        //console.log("chkBtn" + this.chkBtn);




        this.images.chkMission(email).subscribe(data => {

          if (data !== null) {
            //this.chkBtn = true;
            this.missionData = data;
            // console.log("미션데이터 : " + JSON.stringify(this.missionData));
            console.log("미션데이터 : " + this.missionData.missionID);
            // this.images.missionCount(this.missionData.missionID).subscribe(data2 => {
            //   this.ingmissionCounter = data2;
            // });
            this.ingBtn = true;
            //this.endDate = data.endmission.substr(0, 10);
            //console.log(JSON.stringify(data));
            // this.loading.dismiss();
          } else if (data === '' || data === null || data === undefined) {
            this.ingBtn = false;
            //this.chkBtn = false;
          } else {
            this.ingBtn = false;
            this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
          }
        });
      }

      public community_qna_modify(id) {
        this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });
      }
      public community_modify(id) {
        this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });

      }


      selectedTab(tab){
        this.slides.slideTo(tab);

        console.log('  this.slides.slideTo(tab)==================='+   this.slides.slideTo(tab));
      }


      slideChanged($event) {
        this.showLoading();
        this.content.scrollToTop();
        this.page = $event._snapIndex.toString();
        console.log(this.page);

        if(this.page!=='0' && this.page!=='1' && this.page!=='2'){
          setTimeout(() => {
          this.slides.slideTo(0, 0);
      }, 100)
      }
    }


    public beautyNoteLoad() {
      this.images.beautyNoteLoad().subscribe(data => {
        this.beautyNoteData = data;
      });
    }

    public skinQnaLoad() {
      this.images.skinQnaLoad().subscribe(data => {
        this.skinQnaData = data;
      });
    }

    segmentChanged(ev: any) {
      if (ev.value === '수분') {
        // console.log('Segment changed111111111==============', ev.value);
        this.segment_status == true;
        document.getElementById("moisture").style.display = "block";
        document.getElementById("oil").style.display = "none";
      }
      else {
        // console.log('Segment changed2222222222==============', ev.value);
        this.segment_status == false;
        document.getElementById("oil").style.display = "block";
        document.getElementById("moisture").style.display = "none";
      }
    }
    yearmonthselect(e) {
      var year = e.substr(0, 4);
      var month = e.substr(5, 2);
      var date = year + "-" + month;
      console.log(this.skinScoreData);
      this.chartDateData = [];
      this.chartOilData = [];
      this.chartMoistureData = [];
      for (let i = 0; i < this.skinScoreData.score.length; i++) {
        if (this.skinScoreData.score[i].saveDate.indexOf(date) !== -1) {
          this.chartDateData.push(this.skinScoreData.score[i].saveDate.substr(5, 5));
          this.chartOilData.push(this.skinScoreData.score[i].oil);
          this.chartMoistureData.push(this.skinScoreData.score[i].moisture);
        }
      }
      console.log("데이터 길이 : " + this.chartDateData.length)
      if (this.chartDateData.length > 0) {
        this.lineCanvas.data.labels = this.chartDateData;
        this.lineCanvas2.data.labels = this.chartDateData;
        this.lineCanvas.data.datasets[0].data = this.chartMoistureData;
        this.lineCanvas2.data.datasets[0].data = this.chartOilData;
        this.lineCanvas.update();
        this.lineCanvas2.update();

        console.log(this.chartDateData);
        console.log(this.chartMoistureData);
        console.log(this.chartOilData);
      } else {
        setTimeout(() => {
        this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
        }, 3000)
      }

      // console.log("yearmonthselect===============" + e);
    }

    ionViewDidEnter() {
      // console.log('ionViewDidLoad SkinChartPage');
      // console.log('all_moisture_score=====================' + this.all_moisture_score);
      document.getElementById("moisture").style.display = "block";
      document.getElementById("oil").style.display = "none";


      this.today = format(this.today, 'DD');

      this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {


        type: 'line',
        data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
          labels: this.chartDateData,
          datasets: [{
            // label: format(this.today, 'MM/DD', '유분'),
            label: '내 수분 점수',
            fill: false,
            lineTension: 0,
            backgroundColor: "#368AFF",
            borderColor: "#368AFF",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#368AFF",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5, //클릭시 원크기
            pointHoverBackgroundColor: "#368AFF",
            pointHoverBorderColor: "#368AFF",
            pointHoverBorderWidth: 2, //데이터 호버크기
            pointRadius: 3,  //데이터 포인트크기
            pointHitRadius: 100,
            // data: [this.data1, this.data2, this.data3, this.data4],
            data: this.chartMoistureData,
            spanGaps: false,
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            label: '20대 평균 수분 점수',
            fill: false,
            lineTension: 0,
            backgroundColor: "#00C6ED",
            borderColor: "#00C6ED",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#00C6ED",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#00C6ED",
            pointHoverBorderColor: "#00C6ED",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 20,
            data: [
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              //DB데이터 출력

            ],
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          }],
        },
        options: {
          animation: {
            duration: 3000 // general animation time
          },
          responsive: true,
          legend: {
            display: false,     //라벨표시
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }]
          },
          // plugins: {
          //     labels: {
          //           render: this.percentage,
          //           precision: 0,
          //           fontSize: 15,
          //           fontStyle: 'normal',
          //           textShadow: true,
          //           showActualPercentages: true
          //       }
          //   }
        }
      });

      this.lineCanvas2 = new Chart(this.lineCanvas2.nativeElement, {


        type: 'line',
        data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
          labels: this.chartDateData,
          datasets: [{
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
            label: '내 유분 점수',
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#368AFF",
            borderColor: "#368AFF",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#368AFF",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#368AFF",
            pointHoverBorderColor: "#368AFF",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.chartOilData,
            spanGaps: false,
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            label: '20대 평균 유분 점수',
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#00C6ED",
            borderColor: "#00C6ED",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#00C6ED",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#00C6ED",
            pointHoverBorderColor: "#00C6ED",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [
              // this.all_moisture_score='' ?  this.all_oil_score+10 : this.all_first_oil_score+10,
              // this.all_moisture_score='' ?  this.all_oil_score+10 : this.all_first_oil_score+10,
            ],
            spanGaps: false,
          }],
        },
        options: {
          animation: {
            duration: 3000 // general animation time
          },
          responsive: true,
          legend: {
            display: false,     //라벨표시
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }]
          },
          // plugins: {
          //     labels: {
          //           render: this.percentage,
          //           precision: 0,
          //           fontSize: 15,
          //           fontStyle: 'normal',
          //           textShadow: true,
          //           showActualPercentages: true
          //       }
          //   }
        }
      });

      ////처음 진입시 현재 월로 조회 되도록
      this.skinbtnYear = format(new Date(), 'YYYY');
      this.skinbtnMonth = format(new Date(), 'MM');
      var e = this.skinbtnYear + "년" + this.skinbtnMonth;
      this.yearmonthselect(e);
    }


      public loadItems() {
        this.auth.getUserStorage().then(items => {

          if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
            this.userData = {
              accessToken: items.accessToken,
              id: items.id,
              age_range: items.age_range,
              birthday: items.birthday,
              email: items.email,
              gender: items.gender,
              nickname: items.nickname,
              profile_image: items.profile_image,
              thumbnail_image: items.thumbnail_image,
              from: items.from,
            };
            if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
              //this.thumb_image = false;
            } else {
              //this.thumb_image = true;
            }
          } else {
            this.userData = {
              accessToken: items.accessToken,
              id: items.id,
              age_range: items.age_range,
              birthday: items.birthday,
              email: this.jwtHelper.decodeToken(items).email,
              gender: items.gender,
              nickname: this.jwtHelper.decodeToken(items).name,
              profile_image: items.profile_image,
              thumbnail_image: items.thumbnail_image,
              from: 'plinic',
            };
          }
          this.auth.getSkinScore(this.userData.email).subscribe(items => {
            this.skinScoreData = items;
            // let array1 = [];
            for (let i = 0; i < items.score.length; i++) {
              // this.chartDateData.push({date : items.score[i].saveDate.substr(0,10) });
              // this.chartOilData.push({oil : items.score[i].oil});
              // this.chartMoistureData.push({moisture : items.score[i].moisture});

              // this.chartDateData2.push({date : items.score[i].saveDate.substr(0,10) });
              this.chartDateData.push(items.score[i].saveDate.substr(0, 10));
              this.chartOilData.push(items.score[i].oil);
              this.chartMoistureData.push(items.score[i].moisture);
              // console.log(this.chartDateData);
              // console.log(this.chartOilData);
              // console.log(this.chartMoistureData);
            }

            // console.log(this.array1);

            if (items !== '') {
              console.log("abcsdasd");
              var i = (parseInt(this.skinScoreData.score.length) - 1);
              // console.log("ii" + i);
              var k = (parseInt(this.skinScoreData.score.length) - 2);
              // console.log("kk" + i);

              if (i >= 0) {
                this.circle_moisture = this.skinScoreData.score[i].moisture;
                this.circle_oil = this.skinScoreData.score[i].oil;
              }
              if (k >= 0) {
                this.pre_circle_moisture = this.skinScoreData.score[k].moisture;
                this.pre_circle_oil = this.skinScoreData.score[k].oil;
              }
              // console.log("this.circle_moisture" + this.circle_moisture);

              // console.log("moisture:::::::" + this.skinScoreData.score[i].moisture);
              // console.log("oil:::::::" + this.skinScoreData.score[i].oil);
              // console.log("oil:::::::" + (parseInt(this.skinScoreData.score.length) - 1));
            }
          });
          // this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
          // this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
        });
      }


      showLoading() {
        this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          duration: 100,
          cssClass: 'sk-rotating-plane'
        });
        this.loading.present();
        setTimeout(() => {
          this.loading.dismiss();
        }, 1000);
      }

      showAlert(text) {
        let alert = this.alertCtrl.create({
          cssClass: 'push_alert',
          title: 'Plinic',
          message: text,
          buttons: ['OK']
        });
        alert.present();
      }

      showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
          cssClass: 'push_alert',
          title: 'Plinic',
          message: text,
          buttons: ['OK']
        });
        alert.present();
      }

      monthdate: any[] = [
        {
          "day": "2019년1월"
        },
        {
          "day": "2019년2월"
        },
        {
          "day": "2019년3월"
        },
        {
          "day": "2019년4월"
        },
        {
          "day": "2019년5월"
        },
        {
          "day": "2019년6월"
        },
        {
          "day": "2019년7월"
        },
        {
          "day": "2019년8월"
        },
        {
          "day": "2019년9월"
        },
        {
          "day": "2019년10월"
        },
        {
          "day": "2019년11월"
        },
        {
          "day": "2019년12월"
        }
      ];

      monthdate2: any[] = [
        {
          "day": "1월"
        },
        {
          "day": "2월"
        },
        {
          "day": "3월"
        },
        {
          "day": "4월"
        },
        {
          "day": "5월"
        },
        {
          "day": "6월"
        },
        {
          "day": "7월"
        },
        {
          "day": "8월"
        },
        {
          "day": "9월"
        },
        {
          "day": "10월"
        },
        {
          "day": "11월"
        },
        {
          "day": "12월"
        }
      ];

    }
