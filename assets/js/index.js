window.onload = function () {
  $(".tour-slider").slick({
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".owl-stage-section").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true,
    slidesToShow: 22,
    slidesToScroll: 1,
    pauseOnHover: false,
  });

  $(".owl-stage-reviews").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true,
    slidesToShow: 15,
    slidesToScroll: 1,
    pauseOnHover: false,
  });

  $(".owl-stage-component").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".owl-prev").click(function () {
    $(".owl-stage-component").slick("slickPrev");
  });

  $(".owl-next").click(function () {
    $(".owl-stage-component").slick("slickNext");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("open");
  const closeButton = document.getElementById("close");

  openButton.addEventListener("click", function () {
    openButton.classList.remove("active");
    closeButton.classList.remove("close");
  });

  closeButton.addEventListener("click", function () {
    closeButton.classList.remove("close");
    openButton.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("open");

  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("close");

  button.addEventListener("click", function () {});
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleSubmenuLinks = document.querySelectorAll(".toggleSubmenu");

  toggleSubmenuLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const submenu = this.nextElementSibling;

      if (submenu.style.display === "block") {
        submenu.style.display = "none";
      } else {
        submenu.style.display = "block";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Store original z-index values
  var originalZIndexes = {
    topBar: document.querySelector(".qodef-top-bar").style.zIndex,
  };

  function setZIndexes(value) {
    document.querySelector(".qodef-top-bar").style.zIndex = value;
  }

  // Search opener click event
  document
    .querySelector(".qodef-search-opener")
    .addEventListener("click", function () {
      const container = document.getElementById("search-form-container");
      container.classList.add("show");
      setZIndexes("-1");
    });

  // Close icon click event
  document.querySelector(".close-icon").addEventListener("click", function () {
    const container = document.getElementById("search-form-container");
    container.classList.remove("show");
    setZIndexes("");
  });

  // Search form container click event
  document
    .getElementById("search-form-container")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        this.classList.remove("show");
        setZIndexes("");
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".qodef-progress-bar");

  progressBars.forEach((bar) => {
    const progressBarContent = bar.querySelector(".qodef-pb-content");
    const percentage = progressBarContent.getAttribute("data-percentage");

    progressBarContent.style.width = "0%";
    progressBarContent.style.animation = `fillProgress 3s forwards`;

    requestAnimationFrame(() => {
      progressBarContent.style.width = percentage + "%";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var opener = document.querySelector(".qodef-login-opener");
  var holder = document.querySelector(".qodef-login-register-holder");

  // Initially hide the holder
  holder.style.display = "none";

  opener.addEventListener("click", function (event) {
    event.preventDefault();
    toggleHolder();
  });

  function toggleHolder() {
    if (
      holder.style.display === "none" ||
      !holder.classList.contains("opened")
    ) {
      holder.style.display = "block";
      holder.classList.add("opened");
    } else {
      holder.style.display = "none";
      holder.classList.remove("opened");
    }
  }

  document.addEventListener("click", function (event) {
    var close = holder;

    if (event.target === close) {
      close.classList.remove("opened");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const menuOpener = document.querySelector(".qodef-side-menu-button-opener");
  const slidingMenu = document.querySelector(".qodef-side-menu");
  const closeMenuButton = document.querySelector(".qodef-close-side-menu");

  menuOpener.addEventListener("click", function () {
    slidingMenu.classList.toggle("show");
  });

  closeMenuButton.addEventListener("click", function () {
    slidingMenu.classList.remove("show");
  });

  document.addEventListener("click", function (event) {
    if (
      !slidingMenu.contains(event.target) &&
      !menuOpener.contains(event.target)
    ) {
      slidingMenu.classList.remove("show");

      slidingMenu.style.animation = "fade-in 0.5s forwards";

      setTimeout(() => {
        slidingMenu.style.animation = "";
      }, 500);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item-has-children");

  menuItems.forEach(function (menuItem) {
    const secondDiv = menuItem.querySelector(".second");

    menuItem.addEventListener("mouseenter", function () {
      closeAllDropdowns();
      secondDiv.classList.add("show");
    });

    menuItem.addEventListener("mouseleave", function () {
      secondDiv.classList.remove("show");
    });
  });

  function closeAllDropdowns() {
    menuItems.forEach(function (item) {
      const secondDiv = item.querySelector(".second");
      secondDiv.classList.remove("show");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var backToTopButton = document.getElementById("qodef-back-to-top");

  var header = document.querySelector("header");
  var headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      backToTopButton.classList.add("on");
    } else {
      backToTopButton.classList.remove("on");
    }
  });

  backToTopButton.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

$(".wpml-ls-legacy-dropdown").hover(
  function () {
    $(this).find(".wpml-ls-sub-menu").css("display", "block");
  },
  function () {
    $(this).find(".wpml-ls-sub-menu").css("display", "none");
  }
);
