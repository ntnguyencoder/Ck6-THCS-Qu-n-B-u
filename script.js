import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoFW_IusPuqae34sAJwkik2Kw5_Set7yI",
  authDomain: "lop-ck6-2152011.firebaseapp.com",
  databaseURL: "https://lop-ck6-2152011-default-rtdb.firebaseio.com",
  projectId: "lop-ck6-2152011",
  storageBucket: "lop-ck6-2152011.appspot.com",
  messagingSenderId: "1000732989006",
  appId: "1:1000732989006:web:77710d262533fcacbf151f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const loginForm = document.getElementById("login-form");
const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const logoutBtn = document.getElementById("logout");
const welcomeMsg = document.getElementById("welcome-msg");
const addForm = document.getElementById("add-form");
const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search");
const adminPanel = document.getElementById("admin-panel");
const subadminList = document.getElementById("subadmin-list");
const subadminForm = document.getElementById("add-subadmin-form");

const MAIN_ADMIN = { username: "admin", password: "ck62025" };

let currentUser = null;
let isMainAdmin = false;

fetchStudents();

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const user = loginForm.username.value;
  const pass = loginForm.password.value;

  if (user === MAIN_ADMIN.username && pass === MAIN_ADMIN.password) {
    currentUser = user;
    isMainAdmin = true;
    showAdminUI();
  } else {
    onValue(ref(db, "subAdmins"), (snap) => {
      const list = snap.val() || {};
      if (list[user] && list[user].password === pass) {
        currentUser = user;
        isMainAdmin = false;
        showAdminUI();
      } else {
        alert("Sai thông tin đăng nhập");
      }
    }, { onlyOnce: true });
  }
};

function showAdminUI() {
  loginScreen.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  addForm.classList.remove("hidden");
  welcomeMsg.textContent = `👋 Xin chào ${currentUser}${isMainAdmin ? " 👑 (Admin chính)" : ""}`;
  if (isMainAdmin) adminPanel.classList.remove("hidden");
  fetchStudents();
  fetchSubAdmins();
}

logoutBtn.onclick = () => location.reload();

function fetchStudents() {
  onValue(ref(db, "students"), (snap) => {
    studentList.innerHTML = "";
    const data = snap.val() || {};
    Object.keys(data).forEach((id) => {
      const student = data[id];
      const li = document.createElement("li");
      li.className = "student-card";
      li.innerHTML = `
        <img class="avatar" src="${student.avatar || defaultAvatar()}">
        <div>
          <h3>${student.name} (${student.age})</h3>
          <p>🎓 ${student.role}</p>
          <p>🎂 ${student.dob}</p>
          <p>📞 ${student.phone}</p>
          <p>🔗 <a href="${student.social}" target="_blank">${student.social}</a></p>
          <p>❤️ ${student.hobby}</p>
          <p>🕒 Thêm: ${student.createdAt}</p>
          ${isMainAdmin ? `<button onclick="deleteStudent('${id}')">❌ Xoá</button>` : ""}
        </div>
      `;
      studentList.appendChild(li);
    });
  });
}

addForm.onsubmit = (e) => {
  e.preventDefault();
  const data = {
    name: addForm.name.value,
    age: addForm.age.value,
    role: addForm.role.value,
    hobby: addForm.hobby.value,
    phone: addForm.phone.value,
    social: addForm.social.value,
    dob: addForm.dob.value,
    avatar: addForm.avatar.value || defaultAvatar(),
    createdAt: new Date().toISOString()
  };
  const newRef = push(ref(db, "students"));
  set(newRef, data).then(() => addForm.reset());
};

window.deleteStudent = (id) => {
  if (confirm("Bạn chắc chắn muốn xoá thành viên này?")) {
    remove(ref(db, "students/" + id));
  }
};

function fetchSubAdmins() {
  onValue(ref(db, "subAdmins"), (snap) => {
    const data = snap.val() || {};
    subadminList.innerHTML = "";
    Object.keys(data).forEach((u) => {
      const li = document.createElement("li");
      li.innerHTML = isMainAdmin ? `${u} <button onclick="deleteSubAdmin('${u}')">❌</button>` : `${u}`;
      subadminList.appendChild(li);
    });
  });
}

subadminForm.onsubmit = (e) => {
  e.preventDefault();
  const user = subadminForm.username.value;
  const pass = subadminForm.password.value;
  set(ref(db, "subAdmins/" + user), { password: pass }).then(() => subadminForm.reset());
};

window.deleteSubAdmin = (user) => {
  if (confirm("Xoá admin phụ này?")) {
    remove(ref(db, "subAdmins/" + user));
  }
};

searchInput.oninput = function () {
  const keyword = this.value.toLowerCase();
  Array.from(studentList.children).forEach((li) => {
    li.style.display = li.innerText.toLowerCase().includes(keyword) ? "block" : "none";
  });
};

function defaultAvatar() {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`;
}
