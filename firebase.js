// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoFW_IusPuqae34sAJwkik2Kw5_Set7yI",
  authDomain: "lop-ck6-2152011.firebaseapp.com",
  databaseURL: "https://lop-ck6-2152011-default-rtdb.firebaseio.com",
  projectId: "lop-ck6-2152011",
  storageBucket: "lop-ck6-2152011.appspot.com",
  messagingSenderId: "1000732989006",
  appId: "1:1000732989006:web:77710d262533fcacbf151f",
  measurementId: "G-HM12QDKV0T"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, push, onValue, update, remove };
