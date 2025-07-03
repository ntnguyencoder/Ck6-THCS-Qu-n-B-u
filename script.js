const list = document.getElementById("student-list");
const searchInput = document.getElementById("search");

function renderList() {
  const data = JSON.parse(localStorage.getItem("ck6") || "[]");
  const keyword = searchInput.value.toLowerCase();
  list.innerHTML = "";

  data.filter(s =>
    s.name.toLowerCase().includes(keyword) ||
    s.hobby.toLowerCase().includes(keyword) ||
    s.role.toLowerCase().includes(keyword)
  ).forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${s.avatar}" width="40" style="vertical-align:middle;border-radius:50%">
      <strong>${s.name}</strong> (${s.age}t) - ${s.role}<br>
      ❤️ ${s.hobby} | ☎ ${s.phone}<br>
      📆 ${s.createdAt}<br>
      <a href="${s.social}" target="_blank">🔗 MXH</a>
    `;
    list.appendChild(li);
  });
}
searchInput.addEventListener("input", renderList);
renderList();
