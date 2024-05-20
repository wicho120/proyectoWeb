import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */




export class MyGrid extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
    <main>
        <section class="section_1_menu"><my-section-1></my-section-1></section>
        <section class="section_2_products"><my-section-2></my-section-2></section>
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
    `
  }
}

window.customElements.define('my-grid', MyGrid)
