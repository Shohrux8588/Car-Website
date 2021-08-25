window.addEventListener("DOMContentLoaded", () => {
  // ---------------------Creating global variables-------------------------------------

  const loader = document.querySelector(".load");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabContents = document.querySelectorAll(".tabcontent");
  const modal = document.querySelector(".modal");
  const modalClose = modal.querySelector(".modal__close");
  const feedbackBtns = document.querySelectorAll("[data-modal='modal']");

  // -------------------------------Loader---------------------------------------------------

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }, 2000);

  //--------------     ---------------Tabs-----------------------------------------------------

  function hideTabContent() {
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
    tabContents.forEach((tabContent) => {
      tabContent.style.display = "none";
    });
  }
  function showTabContent(i) {
    tabContents[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent(0);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      hideTabContent();
      showTabContent(index);
    });
  });

  //--------------- ----------------Modal-----------------------------------------------

  function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "visible";
  }

  const modalTimer = setTimeout(showModal, 7000);

  modalClose.addEventListener("click", closeModal);

  feedbackBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  });

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }

  window.addEventListener("scroll", showMyModalByScroll);

  //-------------------------------Data-------------------------------------------

  const interval = setInterval(() => {
    const deadline = new Date("2021-12-31");
    const difference = Date.parse(deadline) - Date.parse(new Date());
    if (difference <= 0) clearInterval(interval);
    const time = {
      days: (days = Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: (hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )),
      minutes: (minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      )),
      seconds: (seconds = Math.floor((difference % (1000 * 60)) / 1000)),
    };

    function setTime(selector, time) {
      document.querySelector(`#${selector}`).innerHTML = time;
    }

    for (let key of Object.keys(time)) {
      setTime(key, time[key]);
    }
  }, 1000);

  // ----------------------------------Classes-------------------------------------
  class Card {
    constructor(src, alt, title, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
    }
    render() {
      let element = document.createElement("div");
      element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> $</div>
            </div>
          </div>`;

      this.parentSelector.append(element);
    }
  }

  new Card(
    "img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    `The 2021 Mercedes-Benz C-Class finishes in the top half of our 
  luxury small car rankings. It's powerful and upscale, but it has so-so handli...`,
    199000,
    ".menu__field .container"
  ).render();

  new Card(
    "img/tabs/4.jpg",
    "elite",
    "2021 Mercedes-Benz CLA-Class",
    `The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant interior, and easy-to-use tech features, but it also has a firm ride and a ..`,
    299000,
    ".menu__field .container"
  ).render();

  new Card(
    "img/tabs/2.jpg",
    "post",
    "2021 Mercedes-Benz SCLA-Class",
    `The German luxury car-manufacturer has been around for more than a century, having elegantly drifted rough curves of automobile.`,
    399000,
    ".menu__field .container"
  ).render();

  // -------------------------------------------easy way of Slides-------------------------------------------------

  // const slides = document.querySelectorAll(".offer__slide"),
  //   previousBtn = document.querySelector(".offer__slider-prev"),
  //   nextBtn = document.querySelector(".offer__slider-next"),
  //   currentNumber = document.querySelector("#current"),
  //   totalNumber = document.querySelector("#total");

  // let slideIndex = 0;
  // totalNumber.innerHTML = slides.length;
  // showSlide(slideIndex);
  // function showSlide() {
  //   if (slideIndex < 0) slideIndex = slides.length - 1;
  //   let index = slideIndex % slides.length;
  //   slides.forEach((slide) => (slide.style.display = "none"));
  //   currentNumber.innerHTML = index + 1;
  //   slides[index].style.display = "block";
  // }
  // previousBtn.addEventListener("click", () => {
  //   slideIndex--;
  //   showSlide(slideIndex);
  // });
  // nextBtn.addEventListener("click", () => {
  //   slideIndex++;
  //   showSlide(slideIndex);
  // });
  // ------------------------------------The next way of Slides------------------------------------------------
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    previousBtn = document.querySelector(".offer__slider-prev"),
    nextBtn = document.querySelector(".offer__slider-next"),
    currentNumber = document.querySelector("#current"),
    totalNumber = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-field");
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  //-----------------------------------------Dots slider---------------------------------------
  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];
  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transform: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }

  //------------------------------------slider--------------------------------------
  let slidesIndex = 0,
    offset = 0;
  totalNumber.innerHTML = slides.length;

  function showSlideNumber() {
    if (slidesIndex < 0) slidesIndex = slides.length - 1;
    index = (slidesIndex % slides.length) + 1;
    currentNumber.innerHTML = index;
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[index - 1].style.opacity = "1";
  }
  showSlideNumber();
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  nextBtn.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    slidesIndex++;
    showSlideNumber();
  });

  previousBtn.addEventListener("click", () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    slidesIndex--;
    showSlideNumber();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      offset = +width.slice(0, width.length - 2) * index;
      slidesField.style.transform = `translateX(-${offset}px)`;
      slidesIndex = index;
      showSlideNumber();
    });
  });
});
