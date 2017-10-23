import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private camera: Camera, public navCtrl: NavController) {
    initializeApp(FIREBASE_CONFIG)
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    const result =  this.camera.getPicture(options);

    const image = `data:image/jpeg;base64,${result}`;

    const pictures = storage().ref('pictures/myPhoto');
    pictures.putString(image, 'data_url')
  }

}
