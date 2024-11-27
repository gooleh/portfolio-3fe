// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 구성 객체
const firebaseConfig = {
  apiKey: "AIzaSyAKqwZwyuSxGnZE8Dz3ULXR-A4qzrE1Qy8",
  authDomain: "portfolio-3fe.firebaseapp.com",
  projectId: "portfolio-3fe",
  storageBucket: "portfolio-3fe.appspot.com",
  messagingSenderId: "141528347975",
  appId: "1:141528347975:web:fc40fe2196246ab6934862",
  measurementId: "G-6TC95VZ936"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
const db = getFirestore(app);

export { db };
