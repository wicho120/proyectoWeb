import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

const getData = async(types) => {

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


const getDataByiD = async(id) => {
      let types = "";
      if(id[1] == "A"){
        types = "abrigo";
      }
      if(id[1] == "P"){
        types = "pantalon";
      }
      if(id[1] == "C"){
        types = "camiseta";
      }

      let res = await fetch(`http://localhost:5501/${types}?id=${id}`)
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

export class Mysection1 extends LitElement {
  constructor() {
    super();
    this.data = [];
    this.dataAll = [];
    this.types="abrigo";
    this.cart = [];
    this.typeCart = ""
  }

  async handleMyEvent(e){
    this.typeCart = "";
    if(e.target.textContent === "Abrigos"){
      this.types = "abrigo";
    } if (e.target.textContent === "Camisetas"){
      this.types = "camiseta";
    } if (e.target.textContent === "Pantalones"){
      this.types = "pantalon";
    } if (e.target.textContent === "Todos los productos"){
      this.types = "todos";
    }

    let allProducts = ["abrigo", "camiseta", "pantalon"];
    
    if (this.types === "todos"){
      this.data.splice(1, this.data.length)

      allProducts.forEach(async element => {
        this.dataUpdate = await getData(element);
        this.dataUpdate.forEach(async element2 => {
           this.data.push(await element2);
           this.requestUpdate();  
        })
      }); 
      this.data.shift();
    } else {
      this.data = await getData(this.types)
      this.requestUpdate();
    } 
  }

  handleMyCart(e){
    this.typeCart = "cart";
    this.requestUpdate();
    
  }

  async handleMyButton(e){
    let container = e.target.parentNode;
    let containerC = container.className.split("$");
  
    let id = containerC[1]

    let dataGot = await getDataByiD(id);
    let [cartData] = dataGot;

    this.cart.push(cartData);
    console.log(this.cart)
    this.requestUpdate();

  }

  async handleMyButtonDel(e){
    let container = e.target.parentNode;
    let containerC = container.className.split("$");
    
    let index = containerC[0];
    let id = containerC[1]

    let copyCart = this.cart;
    
    copyCart.map(val => {

      if(String(val.id) === id.slice(0,2)){
        console.log("Hola")
        this.cart.splice(copyCart.indexOf(val), 1)
      }
    })
    console.log(this.cart);
    this.requestUpdate();

  }




  async connectedCallback() {
    super.connectedCallback();
    this.data = await getData(this.types);
    this.requestUpdate();
  }

  render() {

    if(this.typeCart != "cart"){
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
                  <p><img src = "public/carrito-compra.svg" @click=${this.handleMyCart}></p>
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
                          <div class = "${this.types}$${datas.id} " >
                              <button @click=${this.handleMyButton}>Añadir</button>
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

    }else{
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
                <p><img src = "public/carrito-compra.svg" @click=${this.handleMyCart}></p>
            </article>
  
            <article class="section_1_menu_firma">
                <p>® 2024 Camper</p>
            </article>
          </div>
        </section>
        <section class="section_2_products">
          <div class="container">
            <article class="section_2_products_box">
                ${this.cart.map(datas => html`
                  <div id="contenedor">
                    <img src = "${datas.img}"alt="">
                    <div class="info_products">
                        <div>
                            <p>${datas.name}</p>
                            <p>${datas.price}</p>
                        </div>
                        <div class = "${datas.name}$${datas.id} " >
                            <button @click=${this.handleMyButtonDel}>Eliminar</button>
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

