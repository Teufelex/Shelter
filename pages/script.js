let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {console.log(request.response)};
fetch('./pets.json').then(res => res.json()).then(list => {
  pets = list;

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  document.querySelector("#currentPage").innerText = (currentPage+1).toString();

  for (let i = 0; i < (fullPetsList.length / 6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      stepList.forEach((item, ind) => {
        if ( item.name === stepList[j].name && (ind !== j) ) {
          document.querySelector("#pets").children[(i * 6) + j].style.border = '5px solid red';
        }
      })
    }
  }

  const card = document.querySelectorAll(".pet__card");
  card.forEach( b => b.addEventListener('click', (el) => {
      b.nextElementSibling.style.top = `50%`; 
      b.nextElementSibling.style.left = `50%`;
      document.querySelector(".b-popup").style.top = "0px";
      document.querySelector(".header").style.zIndex = "1";
    }));

  const closeBtn = document.querySelectorAll(".popUp__btn");
  closeBtn.forEach( b => b.addEventListener('click', () => {
    document.querySelector(".b-popup").style.top = "100%";
    b.parentNode.style.top = "200%";
    document.querySelector(".header").style.zIndex = "3";
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
    document.querySelector(".logo__title").style.color = "#545454";
    document.querySelector(".logo__subtitle").style.color = "#292929";
    document.querySelector(".header").style.zIndex = "3";
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
        document.querySelector(".logo").style.top = "30px";
        document.querySelector(".logo").style.right = "125px";
        document.querySelector(".logo__title").style.color = "#F1CDB3";
        document.querySelector(".logo__subtitle").style.color = "#ffffff";
    } else {
        document.querySelector(".b-popup").style.top = "100%";
        document.body.style.overflow = "";
        document.querySelector(".logo").style.position = "static";
        document.querySelector(".logo").style.top = "";
        document.querySelector(".logo").style.right = "";
        document.querySelector(".logo__title").style.color = "#545454";
        document.querySelector(".logo__subtitle").style.color = "#292929";
    }
  });
})

const createPets = (petsList) => {
  const elem = document.querySelector("#pets");
  elem.innerHTML += createElements(petsList);
}

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += ` <div class="pet__card">
                <img src=" ../${ petsList[i].img } ">
                <h4 class="card__title">${ petsList[i].name }</h4>
                <button class="card__button">Learn more</button>
              </div>
              <div class="popUp"> 
                <div class="popUp__contain">
                    <img src="../${ petsList[i].img } " class = "popUp__img">
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
                <div class="popUp__btn"><img src="../assets/close_popup.svg"></div>
              </div>`;
  }
  return str;
}

request.send();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

let currentPage = 0;
document.querySelector("#prevPage").addEventListener('click', (e) => {
  if (document.querySelector("body").offsetWidth > 768) {
    if (currentPage > 0) {
      currentPage--;
      console.log(currentPage+1);
    }
    document.querySelector("#pets").style.top = `calc(0px - ${928 * currentPage}px)`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();
  } else {
    if (currentPage > 0) {
      currentPage--;
      console.log(currentPage+1);
    }
    document.querySelector("#pets").style.top = `calc(0px - ${1398 * currentPage}px)`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();
  }
  
  Block();
});

document.querySelector("#nextPage").addEventListener('click', (e) => {
  if (document.querySelector("body").offsetWidth > 768) {
    if (currentPage < (document.querySelector("#pets").offsetHeight / 928) - 1) {
      currentPage++;
      console.log(currentPage + 1);
    }

    document.querySelector("#pets").style.top = `calc(0px - ${928 * currentPage}px)`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();
  } else {
    if (currentPage < (document.querySelector("#pets").offsetHeight / 1398) - 1) {
      currentPage++;
      console.log(currentPage + 1);
    }

    document.querySelector("#pets").style.top = `calc(0px - ${1398 * currentPage}px)`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();
  }

  Block();
});

document.querySelector("#firstPage").addEventListener('click', (e) => {
  document.querySelector("#pets").style.top = 0;
  currentPage = 0;
  document.querySelector("#currentPage").innerText = (currentPage+1).toString();

  Block();
});

document.querySelector("#lastPage").addEventListener('click', (e) => {
  if (document.querySelector("body").offsetWidth > 1279) {
    let a = Math.round((document.querySelector("#pets").offsetHeight / 928) - 1);
    currentPage = a;
    
    document.querySelector("#pets").style.top = `calc(0px - ${928 * a}px)`;
    document.querySelector("#currentPage").innerText = (a + 1).toString();
  } else {
    let a = Math.round((document.querySelector("#pets").offsetHeight / 1398) - 1);
    currentPage = a;
    
    document.querySelector("#pets").style.top = `calc(0px - ${1398 * a}px)`;
    document.querySelector("#currentPage").innerText = (a + 1).toString();
  }
  document.querySelector("#nextPage").setAttribute("disabled", "disabled");
  document.querySelector("#lastPage").setAttribute("disabled", "disabled");
  document.querySelector("#prevPage").removeAttribute("disabled");
  document.querySelector("#firstPage").removeAttribute("disabled");
});

function Block() {
    if (document.querySelector("#currentPage").textContent == "1") {
      document.querySelector("#prevPage").setAttribute("disabled", "disabled");
      document.querySelector("#firstPage").setAttribute("disabled", "disabled");
      document.querySelector("#nextPage").removeAttribute("disabled");
      document.querySelector("#lastPage").removeAttribute("disabled");
  } else if (document.querySelector("body").offsetWidth > 767 
              && document.querySelector("body").offsetWidth < 1280
              && document.querySelector("#currentPage").innerText == "8") {
                document.querySelector("#nextPage").setAttribute("disabled", "disabled");
                document.querySelector("#lastPage").setAttribute("disabled", "disabled");
                document.querySelector("#prevPage").removeAttribute("disabled");
                document.querySelector("#firstPage").removeAttribute("disabled");
  } else if (document.querySelector("body").offsetWidth > 319 
              && document.querySelector("body").offsetWidth < 768
              && document.querySelector("#currentPage").innerText == "16") {
                document.querySelector("#nextPage").setAttribute("disabled", "disabled");
                document.querySelector("#lastPage").setAttribute("disabled", "disabled");
                document.querySelector("#prevPage").removeAttribute("disabled");
                document.querySelector("#firstPage").removeAttribute("disabled");
  } else if (document.querySelector("body").offsetWidth > 1279 
              && document.querySelector("#currentPage").textContent == "6") {
                document.querySelector("#nextPage").setAttribute("disabled", "disabled");
                document.querySelector("#lastPage").setAttribute("disabled", "disabled");
                document.querySelector("#prevPage").removeAttribute("disabled");
                document.querySelector("#firstPage").removeAttribute("disabled");
  } else {
      document.querySelector("#prevPage").removeAttribute("disabled");
      document.querySelector("#firstPage").removeAttribute("disabled");
      document.querySelector("#nextPage").removeAttribute("disabled");
      document.querySelector("#lastPage").removeAttribute("disabled");
  }
}


//(fullPetsList / itemsPerPage)

// let itemsPerPage = 8;

// const checkItemsPerPage = () => {
//   if (document.querySelector("body").offsetWidth > 768 && document.querySelector("body").offsetWidth < 1280) {
//     itemsPerPage = 6;
//   }
// }
