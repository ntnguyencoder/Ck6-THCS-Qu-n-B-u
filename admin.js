const ADMIN_USER = "admin";
if (!localStorage.getItem("admin_pass")) {
  localStorage.setItem("admin_pass", "ck62025");
}

document.getElementById("login-form").onsubmit = function(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === ADMIN_USER && pass === localStorage.getItem("admin_pass")) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
  } else alert("Sai mật khẩu");
};

document.getElementById("add-form").onsubmit = function(e) {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem("ck6") || "[]");
  const newStudent = {
    name: name.value,
    age: age.value,
    hobby: hobby.value,
    role: role.value,
    phone: phone.value,
    social: social.value,
    avatar: avatar.value || randomChibi(),
    createdAt: new Date().toLocaleString()
  };
  data.push(newStudent);
  localStorage.setItem("ck6", JSON.stringify(data));
  alert("Đã thêm bạn mới");
  this.reset();
  renderList?.();
};

document.getElementById("change-pass-form").onsubmit = function(e) {
  e.preventDefault();
  const old = document.getElementById("old-pass").value;
  const newP = document.getElementById("new-pass").value;
  if (old === localStorage.getItem("admin_pass")) {
    localStorage.setItem("admin_pass", newP);
    alert("Đổi mật khẩu thành công");
    this.reset();
  } else alert("Sai mật khẩu cũ");
};
