// Components
const TuotteetSivu = {
    render: () => {
        return `
        <header class="navbar upper-navbar">
        <div class="header-container">
            <nav class="menu">
                <li><a class="site-link current" href="#/">Tuotteet</a></li>
                <li><a class="site-link" href="#/yhteystiedot">Yrityksestä</a></li>
            </nav>
        </div>
        </header>
        <section class="section">
        <h2 class="otsikko">Tuotteet</h2>
        </section>
        `;
    }
  } 
  
const MessageForm = {
    render: () => {
      return `
      <div class="formin-tausta">
        <form class="gform" method="POST" action="https://script.google.com/macros/s/AKfycbyPACzMbLllY4o7PuntVAavJ7tasgSHNvQ39q7U/exec">
          <h3 class="Form-otsikko">Lähetä viesti</h3>
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

const YrityksestäSivu = {
    render: () => {
        return `
        <header class="navbar upper-navbar">
        <div class="header-container">
            <nav class="menu">
                <li><a class="site-link" href="#/">Tuotteet</a></li>
                <li><a class="site-link current" href="#/yhteystiedot">Yrityksestä</a></li>
            </nav>
        </div>
        </header>
        <section class="section">
        <h2 class="otsikko">Miten kaikki alkoi</h2>
        <div class="content-text">
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper mauris nulla, id dapibus ante lobortis non. Integer hendrerit turpis lectus, in congue metus volutpat nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam cursus convallis erat, a auctor augue euismod a. Duis accumsan sem et scelerisque dignissim. Integer dictum bibendum tellus, vel ullamcorper libero euismod tincidunt. Nunc mollis metus a lacus tristique, sed suscipit orci lobortis. Morbi et rhoncus mi. Fusce mi nunc, iaculis mollis arcu in, posuere condimentum neque. Proin vitae neque tempus, scelerisque tortor ut, convallis neque. Nam a feugiat nulla, feugiat volutpat nulla. Proin malesuada magna in ultricies accumsan. Etiam vitae tristique quam. Duis commodo condimentum enim, non euismod arcu. Suspendisse vitae arcu pulvinar, dictum orci non, venenatis urna. Proin vestibulum sodales odio in maximus.</p>
        </div>
        </section>
        ` + MessageForm.render();
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
