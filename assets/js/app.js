// =================== ****************** ================== // 
// Template Name: Jackpot
// Description:  Jackpot Html Template
// Version: 1.0.0

// =================== ****************** ================== // 

var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  // ==========================================================
  // Detect mobile device and add class "is-mobile" to </body>
  // ==========================================================

  // Detect mobile device (Do not remove!!!)
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;
  var Scrollbar = window.Scrollbar;
  // Add class "is-mobile" to </body>

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.preloader();
      Init.header();
      Init.achivementCountdown();
      Init.smoothScrollbar();
      Init.slick();
      Init.countdownInit(".countdown", "2024/12/01");
      Init.filterSearch();
      Init.wow();
      Init.filterToggle();
      Init.formValidation();
      Init.contactForm();
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    // Preloader
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2000);
    },

    // Header 
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },

    // Smooth Scrollbar
    smoothScrollbar: function () {
      if ($("body").hasClass("tt-smooth-scroll")) {
        // Not for mobile devices!
        if (!isMobile) {
          class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
            static pluginName = 'anchor';
            onHashChange = () => {
              $('.header-menu').animate({ height: 'toggle' });
              this.jumpToHash(window.location.hash);
            };
            jumpToHash = (hash) => {
              if (!hash) {
                return;
              }
              const { scrollbar } = this;
              scrollbar.containerEl.scrollTop = 0;
              const target = document.querySelector(hash);
              if (target) {
                scrollbar.scrollIntoView(target, {
                  offsetTop: parseFloat(target.getAttribute('data-offset')) || 0 // Change to set default offset
                });
              }
            };
            onInit() {
              this.jumpToHash(window.location.hash);
              window.addEventListener('hashchange', this.onHashChange);
            };
            onDestory() {
              window.removeEventListener('hashchange', this.onHashChange);
            };
          };
    
          // usage
          Scrollbar.use(AnchorPlugin);
          const scrollbar = Scrollbar.init(document.querySelector("#scroll-container"), {
            damping: 0.1,
            renderByPixel: true,
            continuousScrolling: true,
            // alwaysShowTracks: true
          });
    
          $("input[type=number]").on("focus", function () {
            $(this).on("wheel", function (e) {
              e.stopPropagation();
            });
          });
    
          // Back to Top button functionality
          const backToTopButton = document.getElementById('back-to-top');
    
          // Show or hide the button based on scroll position
          scrollbar.addListener(({ offset }) => {
            if (offset.y > 300) {
              backToTopButton.style.display = 'block';
            } else {
              backToTopButton.style.display = 'none';
            }
          });
    
          // Scroll to top when the button is clicked
          backToTopButton.addEventListener('click', () => {
            scrollbar.scrollTo(0, 0, 500); // Smooth scroll to top over 500ms
          });
        }
      }
    },

    // Slick Slider
    slick: function () {
      if ($(".testimonials-slider.slider-rightSlider").length) {
        $(".testimonials-slider.slider-rightSlider").slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          arrows: false,
          swipe: false,
          slidesToShow: 3,
          cssEase: 'linear',
          pauseOnFocus: false,
          pauseOnHover: false,
          rtl: true,

          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1,
              },
            },

          ],
        });
      };
      if ($(".testimonials-slider.slider-leftSlider").length) {
        $(".testimonials-slider.slider-leftSlider").slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          arrows: false,
          swipe: false,
          slidesToShow: 3,
          cssEase: 'linear',
          pauseOnFocus: false,
          pauseOnHover: false,
          ltr: true,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1,
              },
            },

          ],
        });
      };
      if ($(".brand-slider.slider-rightSlider").length) {
        $(".brand-slider.slider-rightSlider").slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          arrows: false,
          swipe: false,
          slidesToShow: 5,
          cssEase: 'linear',
          pauseOnFocus: false,
          pauseOnHover: false,
          rtl: true,

          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      };
      if ($(".brand-slider.slider-leftSlider").length) {
        $(".brand-slider.slider-leftSlider").slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          arrows: false,
          swipe: false,
          slidesToShow: 5,
          cssEase: 'linear',
          pauseOnFocus: false,
          pauseOnHover: false,
          ltr: true,
          responsive: [

            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 4,
              },
            },

            {
              breakpoint: 576,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      };

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickPrev");
      });

      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickNext");
      });
    },

    // Countdown Timer
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              '<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Mins</h6></li>\
              <li><h2>%S</h2><h6>Secs</h6></li>'
            )
          );
        });
      }
    },

    // Achivement Counter 
    achivementCountdown: function () {
      var section = document.querySelector(".achievement-section");
      var hasEntered = false;
      if (!section) return;

      var initAnimate = window.scrollY + window.innerHeight >= section.offsetTop;
      if (initAnimate && !hasEntered) {
        alert('asdsa'); // This alert confirms the initial animation trigger
        hasEntered = true;
        counterActivate();
      }

      function checkScroll() {
        var shouldAnimate = window.scrollY + window.innerHeight >= section.offsetTop;
        console.log(window.scrollY + window.innerHeight + ' ' + section.offsetTop);

        if (shouldAnimate && !hasEntered) {
          hasEntered = true;
          counterActivate();
        }
      }

      window.addEventListener("scroll", checkScroll);
    },
    counterActivate: function () {
      $(".achievement-wrapper .achievement-block .counter-number").each(function () {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text()
            },
            {
              duration: 4000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now), 3);
              }
            }
          );
      });
    },

    // Blog Search Toggle 
    filterSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blogs-block").filter(function () {
            var hasMatch = $(this).find(".blog-title").text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },

    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: true,
          live: true,
        });
        wow.init();
      }
    },

    // Filter Toggle Button
    filterToggle: function () {
      if ($('.filter-block').length) {
        $(".filter-block .title").on("click", function (e) {
          var count = $(this).data('count');
          if ($('.filter-block.box-' + count + ' .content-block').is(':visible')) {
            $('.filter-block.box-' + count + ' i').removeClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' i').addClass('fa-plus');
            $('.filter-block.box-' + count + ' .content-block').hide('slow');

          } else {
            $('.filter-block.box-' + count + ' i').removeClass('fa-plus');
            $('.filter-block.box-' + count + ' i').addClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' .content-block').show('slow');
          }
        })
      }
    },

    // Form Validation
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },

    // Contact Form
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>Email Sent Successfully</h4>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>There is an error</h4>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return false;
        }
      });
    },
  };
  
  
  
  document.querySelectorAll(".show-hide-home").forEach((item) => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        let answer = this.nextElementSibling;
        let arrow = this.querySelector("img");

        if (answer.style.display === "block") {
            answer.style.display = "none";
            arrow.classList.remove("active");
        } else {
            document.querySelectorAll(".sliding-div").forEach((div) => (div.style.display = "none"));
            document.querySelectorAll(".ques img").forEach((img) => img.classList.remove("active"));
            answer.style.display = "block";
            arrow.classList.add("active");
        }
    });
});


  Init.i();
  
})(window, document, jQuery);



const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 20 },
  { minDegree: 31, maxDegree: 90, value: 10 },
  { minDegree: 91, maxDegree: 150, value: 1000 },
  { minDegree: 151, maxDegree: 210, value: 500 },
  { minDegree: 211, maxDegree: 270, value: 100 },
  { minDegree: 271, maxDegree: 330, value: 50 },
  { minDegree: 331, maxDegree: 360, value: 20 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8A2BE2", // Violet
  "#4B0082", // Indigo
  "#0000FF", // Blue
  "#008000", // Green
  "#FFFF00", // Yellow
  "#FFA500", // Orange
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [10, 20, 50, 100, 500, 1000],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});