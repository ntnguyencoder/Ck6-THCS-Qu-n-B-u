document.getElementById("forgot-form").onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById("recovery-email").value;
  const code = Math.floor(100000 + Math.random() * 900000);
  alert("Mã khôi phục là: " + code + " (gửi giả lập)");

  // Đổi mật khẩu tạm thời
  localStorage.setItem("admin_pass", code.toString());
  alert("Mật khẩu admin tạm thời đã được đặt thành: " + code);
};
