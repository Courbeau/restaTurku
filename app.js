// Components

const TuoteluokatSivu = {
  render: () => {
      setTimeout(TuotteetSivu.karuselliRullaa, 0);
      return `
      ${Yläpalkki.render("tuotteet")}
      <div class="tuoteluokat-holder">
        <a href="#/tuotteetsivu/1"><img src="pictures/kuokka.png"><p>${window.tekstit[window.kieli].tuoteluokka1}</p></a>
        <a href="#/tuotteetsivu/2"><img src="pictures/kuokka.png"><p>${window.tekstit[window.kieli].tuoteluokka2}</p></a>
        <a href="#/tuotteetsivu/3"><img src="pictures/lapio.png"><br><p>${window.tekstit[window.kieli].tuoteluokka3}</p></a>
        <a href="#/tuotteetsivu/4"><img src="pictures/lapio.png"><p>${window.tekstit[window.kieli].tuoteluokka4}</p></a>
        <a href="#/tuotteetsivu/5"><img src="pictures/lapio.png"><p>${window.tekstit[window.kieli].tuoteluokka5}</p></a>
        <a href="#/tuotteetsivu/6"><img src="pictures/pizzalapiot1.jpg"><br><p>${window.tekstit[window.kieli].tuoteluokka6}</p></a>
        <a href="#/tuotteetsivu/7"><img src="pictures/lapio.png"><br><p>${window.tekstit[window.kieli].tuoteluokka7}</p></a>
      </div>
      `;
  }
} 

const renderTuoteKuva = (kuva) => {
  return `<img class="tuote-kuva" src="${kuva}"/>`
}

const renderTuote = (tuote) => {
  return `
  <div class="tuote-container">
    <h3 class="tuote-nimi">${tuote.nimi[window.kieli]}</h3>
    <div class="tuote-kuvat-frame">
      <div class="tuote-kuvat">
      ${tuote.kuvat.map(kuva => renderTuoteKuva(kuva)).join("\n")}
      </div>
    </div>
    <span class="tuote-kuvaus">${tuote.tuotekuvaus[window.kieli]}</span>
    <br>
  </div>
  `
}

const TuotteetSivu = (tuoteLuokka) => {
  return {
    render: () => {
        const tuotteet = (window.tuotteet ?? []).filter(tuote => tuote.luokka === tuoteLuokka);
        return `
        ${Yläpalkki.render("tuotteet")}
        <section class="kaikki-tuotteet-container">
          ${tuotteet.map(renderTuote).join('')}
        </section>
        `;
    }
  }};

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
            
          </div>
          <a class="sulje-btn" href="#/">&#10005;</a>
        </div>
        `;
    }
  }
}

const Yläpalkki = {
  render: (sivu) => {
    return `
    <header class="navbar upper-navbar">
        <div class="header-container">
            <nav class="menu">
                <li><a class="site-link ${sivu === "tuotteet" ? "current" : ""}" href="#/">${window.tekstit[window.kieli].sitelink1}</a></li>
                <li><a class="site-link ${sivu === "yrityksesta" ? "current" : ""}" href="#/yhteystiedot">${window.tekstit[window.kieli].sitelink2}</a></li>
                <li><a class="site-link" href="tel:040-5245210"><img title="Soita" class="icon-navbar puhelin-icon" src="pictures/phone.png" alt="puhelinnumero"></a></li>
                <li><a class="site-link" href="mailto:info@restaturku.fi"><img title="Lähetä sähköposti" class="icon-navbar s-posti-icon" src="pictures/mail.png" alt="s-posti"> </a></li>
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
                <a href="https://maps.google.com/?q=Ahertajantie 5, 15880 HOLLOLA&t=m" target="_blank">
                <address class="Osoite">Ahertajantie 5, 15880 HOLLOLA</address>
                </a>
              </div>
            </div>
            <h1 class="company-name">Resta Turku OY</h1>
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
    { path: '/', component: TuotteetSivu("pizza_välineet"), },
    { path: '/yhteystiedot', component: YrityksestäSivu, },
  ];


  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path, routes) => {
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
