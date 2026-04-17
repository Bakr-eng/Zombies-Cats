const startBtn = document.getElementById("start");
const logoutBtn = document.getElementById("logout");

if (startBtn) {
    startBtn.addEventListener("click", function () {
        window.location.href = "PlayPage.html";
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}



