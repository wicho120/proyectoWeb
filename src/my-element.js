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
        <section class="section_1_menu"></section>
        <section class="section_2_products"></section>
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
    }
    
    .section_1_menu{
        grid-area: section_1_menu;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
    }
    
    .section_2_products{
        grid-area: section_2;
        background: var(--color-principal);
        width: 80vw;
        height: 63em;
        display: flex;
        justify-content: center;
        align-items: center;
    `
  }
}

window.customElements.define('my-grid', MyGrid)
