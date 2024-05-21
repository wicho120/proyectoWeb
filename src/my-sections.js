import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'


  const getData = async(types) => {

    if(types != "todos"){
      let res = await fetch(`http://localhost:5501/${types}`)
      let data = await res.json();
      let dataUpdate = data.map(val =>{
        return {
            name: val.nombre,
            img: val.imagen,
            price: val.precio,
            id: val.id   
        }
        
      })
      return dataUpdate;
    } 
    else {
      let allProducts = ["abrigo", "camiseta", "pantalon"];
      
      let datos = allProducts.map(async element => {
        let res = await fetch(`http://localhost:5501/${element}`)
        let data = await res.json();
        let dataUpdate = data.map(async val =>{
          return{
              name: val.nombre,
              img: val.imagen,
              price: val.precio,
              id: val.id
            }
          
          })
        return dataUpdate;
        })
      console.log(datos);
      return datos;
    }
  }

export class Mysection1 extends LitElement {
  constructor() {
    super();
    this.data;
    this.types="abrigo";
  }

  static properties={
    data: { type: Array },
  }

  async handleMyEvent(e){
    
    if(e.target.textContent === "Abrigos"){
      this.types = "abrigo";
    } if (e.target.textContent === "Camisetas"){
      this.types = "camiseta";
    } if (e.target.textContent === "Pantalones"){
      this.types = "pantalon";
    } if (e.target.textContent === "Todos los productos"){
      this.types = "todos";
    }
    this.data = await getData(this.types);
    this.requestUpdate();
    console.log(this.data)
  }

  async connectedCallback() {
    super.connectedCallback();
    this.data = await getData(this.types);

  }

  render() {
    return html`

    <main>
        <section class="section_1_menu">
          <div class="my-section-1-container">
            <article class="section_1_menu_title">
                <h1>CampusShop</h1>
            </article>

            <article class="section_1_menu_categories">
                <p><button @click=${this.handleMyEvent}>Todos los productos</button></p>
                <p><button @click=${this.handleMyEvent}>Abrigos</button></p>
                <p><button @click=${this.handleMyEvent}>Camisetas</button></p>
                <p><button @click=${this.handleMyEvent}>Pantalones</button></p>
            </article>

            <article class="section_1_menu_carrito">
                <p><img src = "public/carrito-compra.svg"></img></p>
            </article>

            <article class="section_1_menu_firma">
                <p>® 2024 Camper</p>
            </article>
          </div>
        </section>


        <section class="section_2_products">
          <div class="container">
            <article class="section_2_products_box">
                ${this.data.map(datas => html`
                  <div id="contenedor">
                    <img src = "${datas.img}"alt="">
                    <div class="info_products">
                        <div>
                            <p>${datas.name}</p>
                            <p>${datas.price}</p>
                        </div>
                        <div>
                            <button>Añadir</button>
                        </div>
                    </div>
                  </div>
                  `
                )}
            </article>
          </div>
        </section>
    </main>
          
    `
  }


  static get styles() {


    return css`

    main{
      display: grid;
      grid-template-rows: repeat(1, 1fr);
      grid-template-columns: 1fr 4fr;
      grid-template-areas: 
          "section_1_menu section_2"
          "section_1_menu section_2"
      ;
      background: gray;
      height: 100vh;
      width: 100vw;
  }
  
  .section_1_menu{
      grid-area: section_1_menu;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      height: 100vh;
  }
  
  .section_2_products{
      grid-area: section_2;
      background: var(--color-principal);
      width: 100%;
      height: 100%;
  }

  .my-section-1-container{
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

  }

  .section_1_menu article p,a{
        font-size: 1.5em;
        text-decoration: none;
        color: var(--color-bone);
  }

  .section_1_menu_carrito img{
      width: 2.5em;
      height: 2.5em;
  }
    
  .section_1_menu_title h1{
      font-size: 2.5em;
      color: var(--color-bone);
  }
    
    .section_1_menu_firma p{
      font-size: 1em;
    }

    .container{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    .section_2_products_box{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 95%;
      height: 95%;
      background: #E3DAC9;
      border-radius: 2em;
      align-items: center;
      justify-items: center;
      overflow-y: scroll;
    }

    .section_2_products_box #contenedor{
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 20vw;
      height: 40vh;
      background: orange;;
      margin-bottom: 5em;
      margin-top: 5em;
      border-radius: 1em;
    }
  
    .section_2_products_box img{
      width: 20vw;
      height: 30vh;
      object-fit: contain;
    }
    `
  }
}

window.customElements.define('my-section-1', Mysection1)

