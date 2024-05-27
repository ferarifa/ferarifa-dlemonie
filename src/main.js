import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  
    /**
     * Initiate  glightbox 
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }
  
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  
    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    });
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    $(document).ready(function() {
      $('.carousel').carousel();
    });
  
    $(function() {
      $( "#button" ).click(function() {
        $( "#button" ).addClass( "onclic", 250, validate);
      });
    
      function validate() {
        setTimeout(function() {
          $( "#button" ).removeClass( "onclic" );
          $( "#button" ).addClass( "validate", 450, callback );
        }, 2250 );
      }
        function callback() {
          setTimeout(function() {
            $( "#button" ).removeClass( "validate" );
          }, 1250 );
        }
      });
  
      $(document).ready(function() {
        $('.collapse').on('show.bs.collapse', function() {
          $(this).prev('.card-header').addClass('active');
        });
        $('.collapse').on('hide.bs.collapse', function() {
          $(this).prev('.card-header').removeClass('active');
        });
      });
  
      $(document).ready(function(){
        $('#myCarousel').carousel();
      });
  
  })()

  /**
     * image rincian
     */
var imgElement = document.getElementById('dlemonie');
var imgElement = document.getElementById('rajanie');
var imgElement = document.getElementById('lemonieskin');
var imgElement = document.getElementById('lemonieglow');
var imgElement = document.getElementById('rhannie');
var imgElement = document.getElementById('apelsilaxing');
var imgElement = document.getElementById('cl-emonie');
var imgElement = document.getElementById('bodyserum-lemonieskin');
var imgElement = document.getElementById('cushion-lemonieskin');
var imgElement = document.getElementById('bbcream-lemonieskin');
var imgElement = document.getElementById('jalamonie');
var imgElement = document.getElementById('chiaseed');
var imgElement = document.getElementById('peelingspray-bylemonieskin');
var imgElement = document.getElementById('serumluxury-bylemonieskin');
var imgElement = document.getElementById('himalayansaltfine');
var imgElement = document.getElementById('creambrightening');
var imgElement = document.getElementById('magicsoap');
var imgElement = document.getElementById('jellyserum');
var imgElement = document.getElementById('sunscreensansuyu');

var dlemonieImg = document.getElementById('dlemonie');
var rajanieImg = document.getElementById('rajanie');
var lemonieskinImg = document.getElementById('lemonieskin');
var lemonieglowImg = document.getElementById('lemonieglow');
var rhannieImg = document.getElementById('rhannie');
var apelsilaxingImg = document.getElementById('apelsilaxing');
var cLemonieImg = document.getElementById('cl-emonie');
var bodyserumLemonieskinImg = document.getElementById('bodyserum-lemonieskin');
var cushionLemonieskinImg = document.getElementById('cushion-lemonieskin');
var bbcreamLemonieskinImg = document.getElementById('bbcream-lemonieskin');
var jalamonieImg = document.getElementById('jalamonie');
var chiaseedImg = document.getElementById('chiaseed');
var peelingsprayLemonieskinImg = document.getElementById('peelingspray-bylemonieskin');
var serumluxuryLemonieskinImg = document.getElementById('serumluxury-bylemonieskin');
var himalayansaltfineImg = document.getElementById('himalayansaltfine');
var creambrighteningImg = document.getElementById('creambrightening');
var magicsoapImg = document.getElementById('magicsoap');
var sunscreensansuyuImg = document.getElementById('sunscreensansuyu');
var jellyserumImg = document.getElementById('jellyserum');

var dlemonieUrl = dlemonieImg.getAttribute('src');
var rajanieUrl = rajanieImg.getAttribute('src');
var lemonieskinUrl = lemonieskinImg.getAttribute('src');
var lemonieglowUrl = lemonieglowImg.getAttribute('src');
var rhannieUrl = rhannieImg.getAttribute('src');
var apelsilaxingUrl = apelsilaxingImg.getAttribute('src');
var cLemonieUrl = cLemonieImg.getAttribute('src');
var bodyserumLemonieskinUrl = bodyserumLemonieskinImg.getAttribute('src');
var cushionLemonieskinUrl = cushionLemonieskinImg.getAttribute('src');
var bbcreamLemonieskinUrl = bbcreamLemonieskinImg.getAttribute('src');
var jalamonieUrl = jalamonieImg.getAttribute('src');
var chiaseedUrl = chiaseedImg.getAttribute('src');
var peelingsprayLemonieskinUrl = peelingsprayLemonieskinImg.getAttribute('src');
var serumluxuryLemonieskinUrl = serumluxuryLemonieskinImg.getAttribute('src');
var himalayansaltfineUrl = himalayansaltfineImg.getAttribute('src');
var creambrighteningUrl = creambrighteningImg.getAttribute('src');
var magicsoapUrl = magicsoapImg.getAttribute('src');
var sunscreensansuyuUrl = sunscreensansuyuImg.getAttribute('src');
var jellyserumUrl =jellyserumImg.getAttribute('src');

console.log(dlemonieUrl);
console.log(rajanieUrl);
console.log(lemonieskinUrl);
console.log(lemonieglowUrl);
console.log(rhannieUrl);
console.log(apelsilaxingUrl);
console.log(cLemonieUrl);
console.log(bodyserumLemonieskinUrl);
console.log(cushionLemonieskinUrl);
console.log(bbcreamLemonieskinUrl);
console.log(jalamonieUrl);
console.log(chiaseedUrl);
console.log(peelingsprayLemonieskinUrl);
console.log(serumluxuryLemonieskinUrl);
console.log(himalayansaltfineUrl);
console.log(creambrighteningUrl);
console.log(magicsoapUrl);
console.log(sunscreensansuyuUrl);
console.log(jellyserumUrl);
