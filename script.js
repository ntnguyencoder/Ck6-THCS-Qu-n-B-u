import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { randomChibi } from './assets/avatars/avatars.js';

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

const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const loginForm = document.getElementById("login-form");
const addForm = document.getElementById("add-form");
const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search");
const logoutBtn = document.getElementById("logout");
const adminPanel = document.getElementById("admin-panel");

const ADMIN = {
  main: { username: "admin", password: "ck62025" },
  sub: { username: "phuadmin", password: "phu2025" }
};

let currentUser = null;

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const user = loginForm.username.value;
  const pass = loginForm.password.value;
  if (
    (user === ADMIN.main.username && pass === ADMIN.main.password) ||
    (user === ADMIN.sub.username && pass === ADMIN.sub.password)
  ) {
    currentUser = user;
    loginScreen.classList.add("hidden");
    adminPanel.classList.remove("hidden");
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

logoutBtn.onclick = () => {
  currentUser = null;
  adminPanel.classList.add("hidden");
  loginScreen.classList.remove("hidden");
};

function renderStudent(id, data) {
  const li = document.createElement("li");
  li.className = "student-card";
  li.innerHTML = `
    <img class="avatar" src="${data.avatar || randomChibi()}" alt="avatar">
    <div>
      <h3>${data.name} (${data.age})</h3>
      <p>🎓 ${data.role}</p>
      <p>🎂 ${data.dob || "Không rõ"}</p>
      <p>📞 ${data.phone}</p>
      <p>🔗 <a href="${data.social}" target="_blank">${data.social}</a></p>
      <p>❤️ ${data.hobby}</p>
      <p>🕒 Thêm: ${data.createdAt}</p>
      ${currentUser === ADMIN.main.username ? `<button onclick="deleteStudent('${id}')">❌ Xóa</button>` : ""}
    </div>
  `;
  studentList.appendChild(li);
}

function fetchStudents() {
  onValue(ref(db, "students"), (snapshot) => {
    studentList.innerHTML = "";
    const data = snapshot.val();
    if (data) {
      Object.keys(data)
        .sort((a, b) => new Date(data[b].createdAt) - new Date(data[a].createdAt))
        .forEach((id) => {
          renderStudent(id, data[id]);
        });
    }
  });
}

addForm.onsubmit = (e) => {
  e.preventDefault();
  if (!currentUser) return;
  const student = {
    name: addForm.name.value,
    age: addForm.age.value,
    role: addForm.role.value,
    hobby: addForm.hobby.value,
    phone: addForm.phone.value,
    social: addForm.social.value,
    dob: addForm.dob.value,
    avatar: addForm.avatar.value || randomChibi(),
    createdAt: new Date().toISOString()
  };
  const newRef = push(ref(db, "students"));
  set(newRef, student).then(() => {
    addForm.reset();
  });
};

searchInput.oninput = function () {
  const keyword = this.value.toLowerCase();
  Array.from(studentList.children).forEach((li) => {
    li.style.display = li.innerText.toLowerCase().includes(keyword) ? "block" : "none";
  });
};

fetchStudents(); // Danh sách luôn hiển thị với mọi người
