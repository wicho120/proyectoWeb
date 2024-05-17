import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

const getData = async()=>{
  let res = await fetch("http://localhost:5501/camiseta?id=1")
  let data = await res.json();
  let dataUpdate = data.map(val =>{
      return {
          name: val.nombre,
          img: val.imagen,
          price: val.precio,
          id: val.id 
      }
  })
  return dataUpdate
}


export class Mysection1 extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
          <div class="my-section-1-container">
            <article class="section_1_menu_title">
                <h1>CampusShop</h1>
            </article>

            <article class="section_1_menu_categories">
                <p><a>Todos los productos</a></p>
                <p><a>Abrigos</a></p>
                <p><a>Camisetas</a></p>
                <p><a>Pantalones</a></p>
            </article>

            <article class="section_1_menu_carrito">
                <p><img src = "public/carrito-compra.svg"></img></p>
            </article>

            <article class="section_1_menu_firma">
                <p>® 2024 Camper</p>
            </article>
          </div>
    `
  }

  static get styles() {


    return css`
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
    `
  }
}

export class Mysection2 extends LitElement {
  constructor() {
    super();
    this.data;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getData();
  }

  async getData() {
    try {
      let res = await fetch("http://localhost:5501/camiseta?id=1");
      let data = await res.json();
      this.data = data.map(val => ({
        name: val.nombre,
        img: val.imagen,
        price: val.precio,
        id: val.id
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async render() {
    this.data = await getData();
    this.requestUpdate();
    return html`
      <section class="section_2_products">
        <article class="section_2_products_box">

            <div id="contenedor" class="section_2_box_1">
                <img src = "${this.data[0].img}"alt="">
                <div class="info_products">
                    <div>
                        <p>${this.data[0].name}</p>
                        <p>${this.data[0].price}</p>
                    </div>
                    <div>
                        <button>Añadir</button>
                    </div>
                </div>
            </div>
        </article>
      </section>
    `
  }

  static get styles() {


    return css`
      .section_2_products_box{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas: 
        "section_2_box_1"
        ;
        width: 90em;
        height: 60em;
        background: gray;
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
    
    
      .section_2_box_1{
        grid-area: section_2_box_1;
      }
    `
  }
}

window.customElements.define('my-section-1', Mysection1)
window.customElements.define('my-section-2', Mysection2)
