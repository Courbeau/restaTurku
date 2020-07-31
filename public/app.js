// Components
const TuotteetSivu = {
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
    render: () => {
        return `
        ${Yläpalkki.render("tuotteet")}
        <h2 class="tuotteet-otsikko">${window.tekstit[window.kieli].otsikko1}</h2>
        <section class="kaikki-tuotteet-container">
          ${window.tuotteet?.map(TuotteetSivu.renderTuote).join('')}
        </section>
        `;
    }
  } 

const TuoteSivu = (tuote) => {
  return {
    render: () => {
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
              <img class="tuote-kuva-popup" src="${tuote.kuvanNimi}">
          </div>
          <div class="popup-section2">
            <div class="tuote-kuvaus-popup">${tuote.tuotekuvaus[window.kieli]}</div>
            <div class="s-s-popups">
              <a class="soita-popup" href="tel:040-5245210"><img class="icon puhelin-icon" src="pictures/phone.png" alt="puhelinnumero"></a>
              <a class="s-posti-popup" href="mailto:info@restaturku.fi"><img class="icon s-posti-icon" src="pictures/mail.png" alt="s-posti"> </a>  
            </div>
            <div class="tuote-hinta-popup">${tuote.hinta}</div>

          </div>
          <a class="sulje-btn" href="#/">x</a>
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
      <script data-cfasync="false" type="text/javascript" src="form-submission-handler.js"></script>
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
          <h1 style="color:red">Error</h1>
          <p style="color:red">This is not a webpage that exsists on our website!!!</p>
        </section>
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
    //  Find the component based on the current path  
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
    // TODO: Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.render();
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);  
