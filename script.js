function renderList() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const data = JSON.parse(localStorage.getItem("ck6") || "[]");
  const listEl = document.getElementById("student-list");
  listEl.innerHTML = "";

  data
    .filter(student =>
      student.name.toLowerCase().includes(keyword) ||
      student.role.toLowerCase().includes(keyword) ||
      student.hobby.toLowerCase().includes(keyword)
    )
    .forEach(student => {
      const li = document.createElement("li");
      li.className = "student-card";
      li.innerHTML = `
        <img src="${student.avatar}" alt="avatar" class="avatar">
        <div>
          <h3>${student.name} (${student.role})</h3>
          <p>Tuổi: ${student.age}</p>
          <p>Sở thích: ${student.hobby}</p>
          <p>Điện thoại: ${student.phone}</p>
          <a href="${student.social}" target="_blank">MXH cá nhân</a>
          <p><small>${student.createdAt}</small></p>
        </div>
      `;
      listEl.appendChild(li);
    });
}

// Khi trang tải, hiển thị danh sách
window.onload = () => {
  renderList();

  // Giao tiếp giữa admin.html và index.html qua localStorage
  window.addEventListener("storage", (e) => {
    if (e.key === "ck6") renderList();
  });
};

// Tìm kiếm theo từ khóa
document.getElementById("search").addEventListener("input", renderList);
