// Components
const TuotteetSivu = {
    renderTuote: (tuote) => {
      return `
      <a onClick="toggle()" class="tuote-container">
        <h3 class="tuote-nimi">${tuote.nimi[window.kieli]}</h3>
        <img class="tuote-kuva" src="${tuote.kuvanNimi}"/>
        <div class="tuote-pisteet">${tuote.pisteet[window.kieli]}</div>
        <div class="tuote-kuvaus">${tuote.tuotekuvaus[window.kieli]}</div>
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
        <div id="ostos-sivu"></div>
        <div id="popup">
          <a class="sulje-btn" onclick="toggle()">Sulje</a>
        </div>

        `;
    }
  } 

  function toggle() {
    var blur = document.getElementById("ostos-sivu");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  }

const MessageForm = {
    render: () => {
      return `
      <div class="formin-tausta">
        <form class="gform" method="POST" action="https://script.google.com/macros/s/AKfycbyPACzMbLllY4o7PuntVAavJ7tasgSHNvQ39q7U/exec">
          <h3 class="Form-otsikko">Lähetä meille viestiä</h3>
          <hr class="form-hr">
          <div class="nimi-mail-box">
            <input type="text" id="name" name="name" required placeholder="Nimi/nimimerkki">
            <input id="email" name="email" type="email" required placeholder="esim.@email.com">
          </div>
          <br>
          <textarea id="message" name="message" required cols="20" rows="4" placeholder="Tervehdys minulla olisi asiaa..."></textarea>
          <input type="submit" class="button-success pure-button button-xlarge" value="Lähetä">              
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
                <li><a class="site-link ${sivu === "tuotteet" ? "current" : ""}" href="#/">Tuotteet</a></li>
                <li><a class="site-link ${sivu === "yrityksesta" ? "current" : ""}" href="#/yhteystiedot">Yrityksestä</a></li>
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
          <div class="yrityksesta-kuva"><p class="ekologiset-tuotteet">-Meiltä 100% ekologiset tuotteet!-</p></div>
          <div class="yrityksesta-sivu">
            <h2 class="yrityksesta-otsikko">MITEN KAIKKI ALKOI</h2>
            <div class="content-text">
                <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper mauris nulla, id dapibus ante lobortis non. Integer hendrerit turpis lectus, in congue metus volutpat nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam cursus convallis erat, a auctor augue euismod a. Duis accumsan sem et scelerisque dignissim. Integer dictum bibendum tellus, vel ullamcorper libero euismod tincidunt. Nunc mollis metus a lacus tristique, sed suscipit orci lobortis. Morbi et rhoncus mi. Fusce mi nunc, iaculis mollis arcu in, posuere condimentum neque. Proin vitae neque tempus, scelerisque tortor ut, convallis neque. Nam a feugiat nulla, feugiat volutpat nulla. Proin malesuada magna in ultricies accumsan. Etiam vitae tristique quam. Duis commodo condimentum enim, non euismod arcu. Suspendisse vitae arcu pulvinar, dictum orci non, venenatis urna. Proin vestibulum sodales odio in maximus.</p>
            </div>
            <div class="kaikki-iconsit-kaikki-muut">
              <div class="iconi-muu puhelin_y-tunnus">
                <a href="tel:000000000"><img class="icon puhelin-icon" src="pictures/phone.png" alt="puhelinnumero"><br>+00000000</a>
                <p class="y-tunnus">Y-tunnus: 2239554-1</p>
              </div>
              <div class="iconi-muu s-posti&osite">
                <a href="mailto:john@example.com"><img class="icon s-posti-icon" src="pictures/mail.png" alt="s-posti"><br>esimerkki@erno.fi</a>
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
  const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;




  const router = () => {
    //  Find the component based on the current path  
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
    // TODO: Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.render();
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);  
