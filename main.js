const playerName = document.querySelector(".player-name span");
const wrongTries = document.querySelector(".wrongs span");
const divContainer = document.querySelectorAll(".game-body .row > div");
const imgs = document.querySelectorAll(".img");
let openImg = [];
const congratsMsg = document.querySelector(".congrats");
const faildMsg = document.querySelector(".fail");
let numOfDone = 0;
let numOfTries = 15;
const successOne = document.getElementById("suc1");
const successTwo = document.getElementById("suc2");
const fail = document.getElementById("fail");

// to change images place every load;

function changeImgPlace() {
  for (let i = 0; i < divContainer.length; i++) {
    let randomNum = Math.floor(Math.random() * divContainer.length);
    divContainer[i].style.order = randomNum;
  }
}

// when we click on the img;
for (let i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener("click", function () {
    if (openImg.length < 2) {
      openImg.push(imgs[i]);
      imgs[i].classList.add("active");
      if (openImg.length == 2) {
        if (
          openImg[0].getAttribute("data-img") ==
            openImg[1].getAttribute("data-img") &&
          openImg[0].id != openImg[1].id
        ) {
          setTimeout(() => {
            openImg[0].style.visibility = "hidden";
            openImg[1].style.visibility = "hidden";
            successOne.play();
            numOfDone += 2;
            if (numOfDone == 20) {
              setTimeout(() => {
                successTwo.play();
                congratsMsg.style.display = "flex";
              }, 1000);
            }
            openImg.length = 0;
          }, 300);
        } else if (openImg[0].id == openImg[1].id) {
          openImg.length = 1;
        } else {
          setTimeout(function () {
            openImg[0].classList.remove("active");
            openImg[1].classList.remove("active");
            wrongTries.innerHTML = parseFloat(wrongTries.innerHTML) + 1;
            if (parseFloat(wrongTries.innerHTML) >= numOfTries) {
              fail.play();
              faildMsg.style.display = "flex";
              openImg[0].classList.add("active");
              openImg[1].classList.add("active");
            }
            openImg.length = 0;
          }, 900);
        }
      }
    }
  });
}

let promp = prompt("Enter your name");

window.onload = () => {
  if (promp) {
    playerName.innerHTML = promp;
  } else {
    playerName.innerHTML = "unKnown";
  }
  alert(`Note: You have ${numOfTries} tries`);
  changeImgPlace();
};
