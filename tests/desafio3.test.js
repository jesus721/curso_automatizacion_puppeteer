const puppeteer = require('puppeteer')
const expect = require('chai').expect;

describe('Pruebas abriendo el navegador en la página de Soriana y para validar el carrito de compras', () => {
    let navegador, pagina
    var precio, precioCarrito

    before(async () => {
        navegador = await puppeteer.launch({ headless: false, slowMo: 100 })
        pagina = await navegador.newPage()
        await pagina.goto('https://www.soriana.com/ofertas/')
        await pagina.setViewport({ width: 1024, height: 768 })
    })

    after(async () => {
        await new Promise(r => setTimeout(r, 2000));
        await pagina.close()
        await navegador.close()
    })

    it('Debe ingresar el código postal', async () => {
        var elemento = '#begin-header > div.hide-cod-pos.width-cp.order-cp.spacing-cp.col.col-12.col-lg-auto.col-sm-auto.mr-lg-3.order-xs-5.order-sm-1.order-lg-2.pr-2.hideHeaderFolderNav > a'
        await pagina.waitForSelector(elemento)
        await pagina.click(elemento)
        elemento = '#confirm-location-step-1 > div > button.btn.continue-postal-code-btn.js-continue-postal-code-btn'
        await pagina.waitForSelector(elemento)
        await pagina.click(elemento)
        elemento = '#selected-store-check-0692'
        await pagina.waitForSelector(elemento)
        await pagina.click(elemento)
        elemento = '#pickuppcshadow > button.btn.btn-primary.btn-modal-direction.px-0.py-1.ml-2.js-select-store-modal'
        await pagina.waitForSelector(elemento)
        await pagina.click(elemento)
    })

    it('Debe recuperar el precio del articulo', async () => {
        await pagina.waitForSelector('#maincontent > div > div > div.plp > div.row > div.product-grid__container.col-sm-12.col-lg-9.product-recommendations.mb-5 > div > div:nth-child(3)')
        precio = await pagina.evaluate(() => {
            const precio = document.querySelector('#maincontent > div > div > div.plp > div.row > div.product-grid__container.col-sm-12.col-lg-9.product-recommendations.mb-5 > div > div:nth-child(3) > div.product > div.product-tile.plp.d-flex.flex-row.flex-wrap.w-100.position-relative.js-product-card > div.tile-body.product-tile--body.w-100.p-0 > div.price.product-tile--price.p-0.border-x-1.pb-1 > div > div > div.d-flex.flex-column.flex-lg-row.price-content.mx-0 > div.sales.d-flex.align-items-center.flex-row-reverse.align-self-start.align-self-lg-end.size-price-content.special-price-badge.d-flex.discountPrice.oldDiscountPrice.null > span > span').textContent
            return precio.trim()
        })
        console.log('Precio:', precio);
    })

    it('Debe agregar el articulo al carrito de compras', async () => {
        const contenedor = '#maincontent > div > div > div.plp > div.row > div.product-grid__container.col-sm-12.col-lg-9.product-recommendations.mb-5 > div > div:nth-child(3) > div.product > div.product-tile.plp.d-flex.flex-row.flex-wrap.w-100.position-relative.js-product-card > div.tile-body.product-tile--body.w-100.p-0 > div.cart-and-ipay > div > div.w-100.container-add-to-cart-remaster.d-flex.flex-column-disabled.flex-lg-row-disabled.btn-add-to-cart--wrapper'
        const boton = '#addUpdateProductGtm'
        await pagina.waitForSelector(contenedor)
        const botonEnContenedor = await pagina.$(`${contenedor} ${boton}`)
        if(botonEnContenedor) {
            await botonEnContenedor.click()
        //     console.log('Hizo clic en el botón')
        // } else {
        //     console.log('No encontró el botón')
        }
    })

    it('Debe recuperar el precio del carrito de compras', async () => {
        await pagina.waitForSelector('#begin-header > div:nth-child(8) > div > div.minicart-total.button-minicart > div.button-Cart-Button > a > span.hide-number-car.minicart-total > span')
        precioCarrito = await pagina.evaluate(() => {
            const precioCarrito = document.querySelector('#begin-header > div:nth-child(8) > div > div.minicart-total.button-minicart > div.button-Cart-Button > a > span.hide-number-car.minicart-total > span').textContent
            return precioCarrito.trim()
        })
        console.log('Precio carrito:', precioCarrito);
    })

    it('Debe validar que el precio del carrito sea igual al precio del articulo', async () => {
        expect(precio).to.be.equal(precioCarrito)
    })
})