let pets = []; // 8
let page = [];
const request = new XMLHttpRequest();
request.open('GET', './pages/pets.json');
request.onload = () => {console.log(request.response)};
fetch('./pages/pets.json').then(res => res.json()).then(list => {
  pets = list;

  createPets(pets);

  const card = document.querySelectorAll(".pet__card");
  card.forEach( b => b.addEventListener('click', (el) => {
      b.nextElementSibling.style.top = `50%`; 
      b.nextElementSibling.style.left = `50%`;
      document.querySelector(".b-popup").style.top = "0px";
    }));

  const closeBtn = document.querySelectorAll(".popUp__btn");
  closeBtn.forEach( b => b.addEventListener('click', () => {
    document.querySelector(".b-popup").style.top = "100%";
    b.parentNode.style.top = "200%";
  }));

  closeBtn.forEach( b => b.addEventListener("mouseover", (e) => {
    b.style.boxShadow = "0px 2px 35px 14px rgba(216, 216, 216, 0.644)";
  }));

  closeBtn.forEach( b => b.addEventListener("mouseleave", (e) => {
    b.style.boxShadow = "";
  }));

  const overlay = document.querySelector(".b-popup");
  overlay.addEventListener("click", () => {
    card.forEach( b => {
      b.nextElementSibling.style.top = `200%`; 
  })
    document.querySelector("#menu__toggle").checked = false;
    document.body.style.overflow = "";
    overlay.style.top = "100%";
    document.querySelector(".logo").style.position = "static";
    document.querySelector(".logo").style.top = "";
    document.querySelector(".logo").style.right = "";
  });

  overlay.addEventListener("mouseover", (e) => {
    closeBtn.forEach( b => {
      b.style.boxShadow = "0px 2px 35px 14px rgba(216, 216, 216, 0.644)";
    });
  });

  overlay.addEventListener("mouseleave", (e) => {
    closeBtn.forEach( b => {
      b.style.boxShadow = "";
    });
  });

  const menubtn = document.querySelector(".menu__btn");
  menubtn.addEventListener("click", () => {
    if (document.querySelector("#menu__toggle").checked == false) {
        document.querySelector(".b-popup").style.top = "0px";
        document.body.style.overflow = "hidden";
        document.querySelector(".logo").style.position = "absolute";
        document.querySelector(".logo").style.top = "0px";
        document.querySelector(".logo").style.right = "125px";
    } else {
        document.querySelector(".b-popup").style.top = "100%";
        document.body.style.overflow = "";
        document.querySelector(".logo").style.position = "static";
        document.querySelector(".logo").style.top = "";
        document.querySelector(".logo").style.right = "";
    }
  });

    let currentItem;
    let currentItem1;
    let currentItem2;
    let isEnabled = true;

    if (document.querySelector("body").offsetWidth > 1279) {
        currentItem = 4;
        currentItem1 = 0;
        currentItem2 = 2;

        card[currentItem].classList.add("active");
        card[currentItem1].classList.add("active");
        card[currentItem2].classList.add("active");
    } else if (document.querySelector("body").offsetWidth > 767) {
        currentItem = 4;
        currentItem1 = 0;

        card[currentItem].classList.add("active");
        card[currentItem1].classList.add("active");
    } else {
        currentItem = 4;

        card[currentItem].classList.add("active");
    }

    function changeCurrentItem() {
        let array = []
        let a;
        let len;

        if (document.querySelector("body").offsetWidth > 1279) {
            len = 3;
        } else if (document.querySelector("body").offsetWidth > 767) {
            len = 2;
        } else {
            len = 1;
        }

        for (let i = 0; array.length < len; i++) {
            a = Math.floor(Math.random() * card.length);
            if (a !== currentItem &&
                a !== currentItem1 &&
                a !== currentItem2 &&
                a !== array[0] &&
                a !== array[1]) {
                    array.push(a);
                }
        }
        currentItem = array[0];
        currentItem1 = array[1];
        currentItem2 = array[2];
        }

    function hideItem(direction) {
        isEnabled = false;
        if (document.querySelector("body").offsetWidth > 1279) {
            card[currentItem].classList.add(direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
            card[currentItem1].classList.add(direction);
            card[currentItem1].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
            card[currentItem2].classList.add(direction);
            card[currentItem2].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
        } else if (document.querySelector("body").offsetWidth > 767) {
            card[currentItem].classList.add(direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
            card[currentItem1].classList.add(direction);
            card[currentItem1].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
        } else {
            card[currentItem].classList.add(direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('active', direction);
            });
        }
    }

    function showItem(direction) {
        if (document.querySelector("body").offsetWidth > 1279) {
            card[currentItem].classList.add('next', direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
            card[currentItem1].classList.add('next', direction);
            card[currentItem1].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
            card[currentItem2].classList.add('next', direction);
            card[currentItem2].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
        } else if (document.querySelector("body").offsetWidth > 767) {
            card[currentItem].classList.add('next', direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
            card[currentItem1].classList.add('next', direction);
            card[currentItem1].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
        } else {
            card[currentItem].classList.add('next', direction);
            card[currentItem].addEventListener('animationend', function() {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
        }
    }

    function nextItem(n) {
        hideItem('from-left');
        changeCurrentItem();
        showItem('from-right');
    }
    
    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem();
        showItem('from-left');
    }

    document.querySelector('.slider__button.right').addEventListener('click', function() {
        if (isEnabled) {
            previousItem(currentItem);
        }
    });
    
    document.querySelector('.slider__button.left').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
    });
 
})

const createPets = (petsList) => {
  const elem = document.querySelector(".slider");
  elem.innerHTML += createElements(petsList);
}

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += ` <div class="pet__card">
                <img src=" ${ petsList[i].img } ">
                <h4 class="card__title">${ petsList[i].name }</h4>
                <button class="card__button">Learn more</button>
              </div>
              <div class="popUp"> 
                <div class="popUp__contain">
                    <img src=" ${ petsList[i].img } " class = "popUp__img">
                    <div class="popUp__inner">
                      <h2 class="popUp__title">${ petsList[i].name }</h2>
                      <h4 class="popUp__subtitle">${ petsList[i].type } - ${ petsList[i].breed }</h4>
                      <p class="popUp__description">${ petsList[i].description }</p>
                      <ul class="popUp__list">
                        <li><span class="popUp__list-item"><b>Age:</b>${ petsList[i].age }</span></li>
                        <li><span class="popUp__list-item"><b>Inoculations:</b> ${ petsList[i].inoculations } </span></li>
                        <li><span class="popUp__list-item"><b>Diseases:</b> ${ petsList[i].diseases } </span></li>
                        <li><sapn class="popUp__list-item"><b>Parasites:</b> ${ petsList[i].parasites } </sapn></li>
                      </ul>
                    </div>
                </div>
                <div class="popUp__btn"><img src="assets/close_popup.svg"></div>
              </div>`;
  }
  return str;
}

request.send();

