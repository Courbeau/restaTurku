// Components
const HomeComponent = {
    render: () => {
        return `
        <section class="section">
        <h2 class="otsikko">Miten kaikki alkoi</h2>
        <div class="content-text">
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper mauris nulla, id dapibus ante lobortis non. Integer hendrerit turpis lectus, in congue metus volutpat nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam cursus convallis erat, a auctor augue euismod a. Duis accumsan sem et scelerisque dignissim. Integer dictum bibendum tellus, vel ullamcorper libero euismod tincidunt. Nunc mollis metus a lacus tristique, sed suscipit orci lobortis. Morbi et rhoncus mi. Fusce mi nunc, iaculis mollis arcu in, posuere condimentum neque. Proin vitae neque tempus, scelerisque tortor ut, convallis neque. Nam a feugiat nulla, feugiat volutpat nulla. Proin malesuada magna in ultricies accumsan. Etiam vitae tristique quam. Duis commodo condimentum enim, non euismod arcu. Suspendisse vitae arcu pulvinar, dictum orci non, venenatis urna. Proin vestibulum sodales odio in maximus.</p>
        </div>
        </section>
        `;
    }
  } 
  
  const Page1Component = {
    render: () => {
        return `
        <section class="section">
        <h2 class="otsikko">Tuotteet</h2>
        <div class="content-text">
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper mauris nulla, id dapibus ante lobortis non. Integer hendrerit turpis lectus, in congue metus volutpat nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam cursus convallis erat, a auctor augue euismod a. Duis accumsan sem et scelerisque dignissim. Integer dictum bibendum tellus, vel ullamcorper libero euismod tincidunt. Nunc mollis metus a lacus tristique, sed suscipit orci lobortis. Morbi et rhoncus mi. Fusce mi nunc, iaculis mollis arcu in, posuere condimentum neque. Proin vitae neque tempus, scelerisque tortor ut, convallis neque. Nam a feugiat nulla, feugiat volutpat nulla. Proin malesuada magna in ultricies accumsan. Etiam vitae tristique quam. Duis commodo condimentum enim, non euismod arcu. Suspendisse vitae arcu pulvinar, dictum orci non, venenatis urna. Proin vestibulum sodales odio in maximus.</p>
        </div>
        </section>
        `;
    }

  } 
  
  const Page2Component = {
    render: () => {
        return `
        <section class="section">
        <h2 class="otsikko">Yhteystiedot</h2>
        <div class="content-text">
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper mauris nulla, id dapibus ante lobortis non. Integer hendrerit turpis lectus, in congue metus volutpat nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam cursus convallis erat, a auctor augue euismod a. Duis accumsan sem et scelerisque dignissim. Integer dictum bibendum tellus, vel ullamcorper libero euismod tincidunt. Nunc mollis metus a lacus tristique, sed suscipit orci lobortis. Morbi et rhoncus mi. Fusce mi nunc, iaculis mollis arcu in, posuere condimentum neque. Proin vitae neque tempus, scelerisque tortor ut, convallis neque. Nam a feugiat nulla, feugiat volutpat nulla. Proin malesuada magna in ultricies accumsan. Etiam vitae tristique quam. Duis commodo condimentum enim, non euismod arcu. Suspendisse vitae arcu pulvinar, dictum orci non, venenatis urna. Proin vestibulum sodales odio in maximus.</p>
        </div>
        </section>
        `;
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
    { path: '/', component: HomeComponent, },
    { path: '/tuotteet', component: Page1Component, },
    { path: '/yhteystiedot', component: Page2Component, },
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
