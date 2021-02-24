import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import {firebaseConfig} from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();
