const startBtn = document.getElementById("start");
if (startBtn) {
    startBtn.addEventListener("click", function () {
        window.location.href = "PlayPage.html";
    });
}

const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}



