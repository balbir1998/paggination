const title = document.querySelector(".title h1")
const parentEl = document.querySelector(".followers")
const followersConatiner = document.querySelector(".container");
const btnConatainer = document.querySelector(".btn-container");

let startIdx = 0;
const itemCount = 10;

window.addEventListener("DOMContentLoaded", function () {
    title.innerText = "Pagination";
    parentEl.classList.add("loaded");
});

fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
    .then(res => res.json())
    .then(data => {
        renderFollowers(data);
        btnConatainer.addEventListener("click", function (e) {
            if (e.target === e.currentTarget) {
                return;
            }
            const btnList = [...btnConatainer.children];

            if (e.target.classList.contains("page-btn")) {
                btnList.find(el => el.classList.remove("active"));
                e.target.classList.add("active");
                startIdx = parseInt(e.target.id) * itemCount;
                renderFollowers(data);
                return;
            }

            if (e.target.classList.contains("prev-btn")) {
                startIdx = parseInt(btnList.find(btn => btn.classList.contains("active"))?.id) - 1;
                btnList.find(el => el.classList.remove("active"));
                if (startIdx < 0) {
                    startIdx = 9;
                }
                btnList.find(el => {
                    if (parseInt(el.id) === startIdx) el.classList.add("active");
                });
                renderFollowers(data);
                return;
            }

            if (e.target.classList.contains("next-btn")) {
                startIdx = parseInt(btnList.find(btn => btn.classList.contains("active"))?.id) + 1;
                btnList.find(el => el.classList.remove("active"));
                if (startIdx > 9) {
                    startIdx = 0;
                }
                btnList.find(el => {
                    if (parseInt(el.id) === startIdx) el.classList.add("active");
                });
                renderFollowers(data);
                return;
            }
        });
    })
    .catch(err => console.log(err));

function renderFollowers(data) {
    const followers = data.slice(startIdx, startIdx + itemCount);
    let cardHTML = "";
    followers.forEach(person => {
        const { avatar_url, login, html_url } = person;
        cardHTML += `
                <div class="card">
                    <img src="${avatar_url}" alt="image">
                    <h4>${login}</h4>
                    <a href="${html_url}" target="_blank">View Profile</a>
                </div>`;
    });
    followersConatiner.innerHTML = cardHTML;
    startIdx = 0;
}