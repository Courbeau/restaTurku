// Components
const TuotteetSivu = {
    karuselliRullaa: () => {
      var slideIndex = 0;
      function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) return;
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 3500);
      }
      showSlides();  
    },
    renderTuote: (tuote) => {
      return `
      <a href="#/tuotteet/${tuote.id}" class="tuote-container">
        <h3 class="tuote-nimi">${tuote.nimi[window.kieli]}</h3>
        <img class="tuote-kuva" src="${tuote.kuvanNimi}"/>
        <div class="tuote-hinta">${tuote.hinta}</div>
        <br>
        <div class="tuote-saatavuus">${tuote.tuotteenSaatavuus[window.kieli]}</div>
      </a>
      `
    },
    renderKaruselli: (slideIndex) => {
      return `<!-- Slideshow container -->
      <div class="slideshow-container">
  
          <div class="mySlides fade">
          <h3>${window.tekstit[window.kieli].carouselHoukutus1}</h3>
          </div>
      
          <div class="mySlides fade">
          <h3>${window.tekstit[window.kieli].carouselHoukutus2}</h3>
          </div>
      
          <div class="mySlides fade">
          <h3>${window.tekstit[window.kieli].carouselHoukutus3}</h3>
          </div>
      
      </div>
      <br>
      
      <!-- The dots/circles -->
      <div style="text-align:center">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
      </div>`
    },
    render: () => {
        setTimeout(TuotteetSivu.karuselliRullaa, 0);
        return `
        ${Yläpalkki.render("tuotteet")}
        ${TuotteetSivu.renderKaruselli(TuotteetSivu.slideIndex)}
        <h2 class="tuotteet-otsikko">${window.tekstit[window.kieli].otsikko1}</h2>
        <section class="kaikki-tuotteet-container">
          ${window.tuotteet?.map(TuotteetSivu.renderTuote).join('')}
        </section>
        `;
    }
  } 

  function magnify(imgID, zoom) {
var img, glass, w, h, bw;
img = document.getElementById(imgID);

/* Create magnifier glass: */
glass = document.createElement("DIV");
glass.setAttribute("class", "img-magnifier-glass");

/* Insert magnifier glass: */
img.parentElement.insertBefore(glass, img);

/* Set background properties for the magnifier glass: */
glass.style.backgroundImage = "url('" + img.src + "')";
glass.style.backgroundRepeat = "no-repeat";
glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
bw = 3;
w = glass.offsetWidth / 2;
h = glass.offsetHeight / 2;
glass.style.visibility = "hidden";

/* Execute a function when someone moves the magnifier glass over the image: */
glass.addEventListener("mousemove", moveMagnifier);
img.addEventListener("mousemove", moveMagnifier);

/*and also for touch screens:*/
glass.addEventListener("touchmove", moveMagnifier);
img.addEventListener("touchmove", moveMagnifier);
function moveMagnifier(e) {
var pos, x, y;
/* Prevent any other actions that may occur when moving over the image */
e.preventDefault();
/* Get the cursor's x and y positions: */
pos = getCursorPos(e);
x = pos.x;
y = pos.y;
glass.style.visibility = "visible";
/* Prevent the magnifier glass from being positioned outside the image: */
if (x > img.width - (w / zoom)) {
  x = img.width - (w / zoom);
  glass.style.visibility = "hidden";
} 
if (x < w / zoom) {
  x = w / zoom;
  glass.style.visibility = "hidden";
} 
if (y > img.height - (h / zoom)) {
  y = img.height - (h / zoom);
  glass.style.visibility = "hidden";
} 
if (y < h / zoom) {
  y = h / zoom;
  glass.style.visibility = "hidden";
} 
/* Set the position of the magnifier glass: */
glass.style.left = (x - w + 45) + "px";
glass.style.top = (y - h + 85) + "px";
/* Display what the magnifier glass "sees": */
glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
}

function getCursorPos(e) {
var a, x = 0, y = 0;
e = e || window.event;
/* Get the x and y positions of the image: */
a = img.getBoundingClientRect();
/* Calculate the cursor's x and y coordinates, relative to the image: */
x = e.pageX - a.left;
y = e.pageY - a.top;
/* Consider any page scrolling: */
x = x - window.pageXOffset;
y = y - window.pageYOffset;
return {x : x, y : y};
}
}


const TuoteSivu = (tuote) => {
  return {
    render: () => {
      setTimeout(() => {magnify("tuotteen-suurennuslasi", 3)}, 0)
      return `
        ${Yläpalkki.render("tuotteet")}
        <h2 class="tuotteet-otsikko">${window.tekstit[window.kieli].otsikko1}</h2>
        <section class="kaikki-tuotteet-container">
          ${window.tuotteet?.map(TuotteetSivu.renderTuote).join('')}
        </section>
        <div id="ostos-sivu" class="active"></div>
        <div id="popup" class="active">
          <div class="popup-section1">
          <h1 class="class-tuote-otsikko-popup">${tuote.nimi[window.kieli]}</h1>
          <div class="img-magnifier-content">
            <img id="tuotteen-suurennuslasi" class="tuote-kuva-popup" src="${tuote.kuvanNimi}">
          </div>
          </div>
          <div class="popup-section2">
            <div class="s-s-popups">
              <a class="soita-popup" href="tel:040-5245210"><img class="icon puhelin-icon" src="pictures/phone.png" alt="puhelinnumero"></a>
              <a class="s-posti-popup" href="mailto:info@restaturku.fi"><img class="icon s-posti-icon" src="pictures/mail.png" alt="s-posti"> </a>  
            </div>
            <div class="tuote-kuvaus-popup">${tuote.tuotekuvaus[window.kieli]}</div>
            <div class="tuote-hinta-popup">${tuote.hinta}</div>

          </div>
          <a class="sulje-btn" href="#/">&#10005;</a>
        </div>
        `;
    }
  }
}

const MessageForm = {
    render: () => {
      return `
      <div class="formin-tausta">
        <form class="gform" method="POST" action="https://script.google.com/macros/s/AKfycbyPACzMbLllY4o7PuntVAavJ7tasgSHNvQ39q7U/exec">
          <h3 class="Form-otsikko">${window.tekstit[window.kieli].formOtsikko}</h3>
          <hr class="form-hr">
          <div class="nimi-mail-box">
            <input type="text" id="name" name="name" required placeholder="${window.tekstit[window.kieli].formNimi}">
            <input id="email" name="email" type="email" required placeholder="${window.tekstit[window.kieli].formSposti}">
          </div>
          <br>
          <textarea id="message" name="message" required cols="20" rows="4" placeholder="${window.tekstit[window.kieli].formAsia}"></textarea>
          <input type="submit" class="button-success pure-button button-xlarge" value="${window.tekstit[window.kieli].formLähetäNappula}">              
          <!-- Kiitosviesti-->
          <div style="display:none" class="thankyou_message">
              <!-- Tätä viestiä voi kustomoida! -->
              <h2 class="kiitos-viesti">Kiitos että otitte yhteyttä meihin! Palaamme asiaan pian!</h2>
          </div>    
        </form>
      </div>
      `
    }
}

const Yläpalkki = {
  kieliVaihto: (event) => {
    const selecti = window.document.getElementsByClassName('kieli-valikko-selecti')[0];
    selecti.addEventListener('change', (event) => {
      window.kieli = event.target.value;
      window.localStorage.setItem('kieli', window.kieli);
      router();
    })
  },
  render: (sivu) => {
    setTimeout(Yläpalkki.kieliVaihto, 0);
    return `
    <header class="navbar upper-navbar">
        <div class="header-container">
            <nav class="menu">
                <li><a class="site-link ${sivu === "tuotteet" ? "current" : ""}" href="#/">${window.tekstit[window.kieli].sitelink1}</a></li>
                <li><a class="site-link ${sivu === "yrityksesta" ? "current" : ""}" href="#/yhteystiedot">${window.tekstit[window.kieli].sitelink2}</a></li>
                <li><form class="kieli-valikko">
                <select class="kieli-valikko-selecti">
                  <option value="FI" ${window.kieli === "FI" ? "selected" : ""}>Suomi</option>
                  <option value="SV" ${window.kieli === "SV" ? "selected" : ""}>Svenska</option>
                  <option value="EN" ${window.kieli === "EN" ? "selected" : ""}>English</option>
                </select>
              </form></li>
            </nav>
        </div>
        </header>
    `
  }

}

const YrityksestäSivu = {
    render: () => {
        return `
        ${Yläpalkki.render("yrityksesta")}
        <div class="koko-yrityksesta-sivu">
          <div class="yrityksesta-kuva"><p class="ekologiset-tuotteet">${window.tekstit[window.kieli].ekologisetTuotteet}</p></div>
          <div class="yrityksesta-sivu">
            <h2 class="yrityksesta-otsikko">${window.tekstit[window.kieli].otsikko2}</h2>
            <div class="content-text">
                <p class="text-osio">${window.tekstit[window.kieli].tarina}</p>
            </div>
            <div class="kaikki-iconsit-kaikki-muut">
              <div class="iconi-muu puhelin_y-tunnus">
                <a href="tel:040-5245210"><img class="icon puhelin-icon" src="pictures/phone.png" alt="puhelinnumero"><br>+358 40-5245210</a>
                <p class="y-tunnus">${window.tekstit[window.kieli].yritystunnus} 2239554-1</p>
              </div>
              <div class="iconi-muu s-posti&osite">
                <a href="mailto:info@restaturku.fi"><img class="icon s-posti-icon" src="pictures/mail.png" alt="s-posti"><br>info@restaturku.fi</a>
                <p class="Osoite">Ahertajantie 5, 15880 HOLLOLA</p>
              </div>
            </div>
            <h1 class="company-name">Resta Turku OY</h1>
            ` + MessageForm.render() + `
          </div>
        </div>`
          
    }

  } 
  
  const ErrorComponent = {
    render: () => {
      return `
        <section>
        ${Yläpalkki.render("")}
          <h1 class="tuotteet-otsikko" style="color:red">Error 404</h1>
          <p style="color:red; text-align:center; font-weight: bold;">This is not a webpage that exsists on our website!!!/Meillä ei ole tämän nimistä nettisivustoa!!!</p>
          <div style="font-size:10em; text-align:center">&#129298;</div>
        ´</section>
      `;
    }
  }


  // Routes 
const routes = [
    { path: '/', component: TuotteetSivu, },
    { path: '/yhteystiedot', component: YrityksestäSivu, },
  ];


  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path, routes) => {
    console.log(routes.find(r => {
      console.log(r.path, path, r.path === path);
      return r.path === path}))
    return routes.find(r => r.path === path) || undefined;
  }

  const addTuoteRoute = (path, tuote) => {
    routes.push( { path, component: TuoteSivu(tuote) } );
  };

  const router = () => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
    document.getElementById('app').innerHTML = component.render();
  };

  
  window.addEventListener('hashchange', router);
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 50);
  });
  window.addEventListener('load', router);  
