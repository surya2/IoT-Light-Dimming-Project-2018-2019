import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, AngularFireAction } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})

export class ControlComponent implements OnInit {
  //Initialization Objects
  itemsRef: AngularFireObject<any>;
  items: AngularFireList<any[]>;
  objects: Observable<any[]>;
  objects1: Observable<any[]>;
  arrayOfObjects: Array<any[]>;
  num: number;
  title: string = '';
  num1: any;
  inputVal: any;
  newVal: number;
  nextVal;
  itemsR: AngularFireList<any[]>;
  item: AngularFireObject<any[]>;
  //service: AngularFireAction<any[]>;
  //text2 = (<HTMLInputElement>document.getElementById("2l")).value;
  //text3 = (<HTMLInputElement>document.getElementById("3l")).value;
  cornerBtnState: string;
  stripBtnState: string;
  cornerState: string;
  stripState: string;
  firstBtnState = 'ON+';
  secondBtnState = 'ON+';
  color1 = 'success';
  color2 = 'success';
  lowCap = false;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.object('HomeTheater/Controls');
    this.items = db.list('HomeTheater/Controls');

    this.objects = db.list('HomeTheater/Controls').valueChanges();
    this.objects1 = db.list('HomeTheater/Controls').valueChanges();


    //Snapshot - Objects Test
    this.item = db.object('HomeTheater/Controls');
    this.item.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key)
      console.log(action.payload.val())
      this.arrayOfObjects = action.payload.val();
    });

    //Snapshot - List Test
    this.itemsR = db.list('HomeTheater');
    this.itemsR.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          console.log(action.type);
          console.log(action.key);
          console.log(action.payload.val());
          
        });
      });
  }
  ngOnInit() {
    let element = <HTMLInputElement>document.getElementById("2l");
    this.cornerState = element.innerHTML;
    //this.cornerState = document.getElementById("2l").innerHTML;
    console.log(this.cornerState);
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
  //Up and Down Buttons
  down(){
    //this.newVal =  - 1;
    console.log(((document.getElementById('center') as HTMLInputElement).placeholder));
    this.inputVal = Number(((document.getElementById('center') as HTMLInputElement).placeholder));
    this.newVal = this.inputVal - 1;
    console.log(this.newVal);
    //this.onEnter(((document.getElementById(this.nextVal) as HTMLInputElement).value), id);
    ((document.getElementById('center') as HTMLInputElement).placeholder) = String(this.newVal);
    if(this.newVal > 100){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '100';
      this.newVal = 100;
    }
    if(this.newVal < 20){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '20';
      this.lowCap = true;
      this.delay(5000).then(any=>{
        this.lowCap = false;
      });
      this.newVal = 20;
    }
    this.itemsRef.update({ center: this.newVal });

    //console.log("Label id: " + document.getElementById('2l').innerHTML);
  }

  up(){
    //this.newVal =  - 1;
    console.log(((document.getElementById('center') as HTMLInputElement).placeholder));
    this.inputVal = Number(((document.getElementById('center') as HTMLInputElement).placeholder));
    this.newVal = this.inputVal + 1;
    console.log(this.newVal);
    //this.onEnter(((document.getElementById(this.nextVal) as HTMLInputElement).value), id);
    ((document.getElementById('center') as HTMLInputElement).placeholder) = String(this.newVal);
    if(this.newVal > 100){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '100';
      this.newVal = 100;
    }
    if(this.newVal < 0){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '0';
      this.newVal = 0;
    }
    this.itemsRef.update({ center: this.newVal });
  }
  elementId: string = '';
  cornerOnOff: string;
  stripOnOff: string;
  onoff(inner, id){
    console.log(inner);
    console.log(id);
    if(id == '2b'){
      //this.elementId = '2l';
      this.cornerOnOff = document.getElementById('2b').innerHTML;
      console.log(this.cornerOnOff);
      if(this.cornerOnOff == 'ON'){
        this.cornerOnOff = 'OFF';
        document.getElementById('2b').innerHTML = this.cornerOnOff;
        this.itemsRef.update({ corner: 'ON+' });
      }
      else if(this.cornerOnOff == 'OFF'){
        this.cornerOnOff = 'ON';
        document.getElementById('2b').innerHTML = this.cornerOnOff;
        this.itemsRef.update({ corner: 'OFF' });
      }
      console.log(this.cornerOnOff);
    }
    else if(id == '3b'){
      //this.elementId = '3l';
      this.stripOnOff = document.getElementById('3b').innerHTML;
      console.log(this.stripOnOff);
      if(this.stripOnOff == 'ON'){
        this.stripOnOff = 'OFF';
        document.getElementById('3b').innerHTML = this.stripOnOff;
        this.itemsRef.update({ strip: 'ON' });
      }
      else if(this.stripOnOff == 'OFF'){
        this.stripOnOff = 'ON+';
        document.getElementById('3b').innerHTML = this.stripOnOff;
        this.itemsRef.update({ strip: 'OFF' });
      }
      console.log(this.stripOnOff);
    }
  }

  onoffFirst(){
    if(this.firstBtnState == 'ON+'){
      this.firstBtnState = 'OFF';
      this.itemsRef.update({ corner: 'ON+' });
      this.color1 = 'danger';
    }
    else{
      this.firstBtnState = 'ON+';
      this.itemsRef.update({ corner: 'OFF' });
      this.color1 = 'success';
    }
  }
  onoffSecond(){
    if(this.secondBtnState == 'ON+'){
      this.secondBtnState = 'OFF';
      this.itemsRef.update({ strip: 'ON+' });
      this.color2 = 'danger';
    }
    else{
      this.secondBtnState = 'ON+';
      this.itemsRef.update({ strip: 'OFF' });
      this.color2 = 'success';
    }
  }

  //After you type something into the input box
  onEnter(control) {
    console.log(control);
    //console.log(id);
    this.num = Number(control);
    if(this.num > 100){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '100';
      this.num = 100;
      this.newVal = 100;
    }
    if(this.num < 20){
      ((document.getElementById('center') as HTMLInputElement).placeholder) = '20';
      this.num = 20;
      this.newVal = this.num;
    }
    /*else{
      ((document.getElementById(this.nextVal) as HTMLInputElement).value) = String(this.newVal);
    }*/
    this.next();
  }

  public next(){
    this.itemsRef.update({ center: this.num });
  }

  tablet: controls[] = [
    {
        id: 'one',
        caption: 'Center Lights',
        dim: true,
        labelid: '1l',
        btnid: '1b'
    },
    {
        id: 'two',
        caption: 'Corner Lights',
        dim: false,
        labelid: '2l',
        btnid: '2b'
    },
    {
        id: 'three',
        caption: 'Strip Lights',
        dim: false,
        labelid: '3l',
        btnid: '3b'
    }
  ];

}

interface controls {
  id: string;
  caption: string;
  dim: boolean;
  labelid: string;
  btnid: string;
}
