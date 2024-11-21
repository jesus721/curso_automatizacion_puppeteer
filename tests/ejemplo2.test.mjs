import puppeteer from 'puppeteer'
import { expect } from 'chai'

/*
    NOTA IMPORTANTE:
        - Para ejecutar este archivo, se debe ejecutar el siguiente comando:  npx mocha tests/ejemplo2.test.mjs (o npm run ejemplo2)
        - Este archivo es una versión de ejemplo.test.js, pero en formato mjs
        - Para poder realizar el import en vez de require sin usar la extensión mjs, se debe de agregar al archivo package.json "type": "module"
*/

describe('Pruebas abriendo el navegador', () => {
    // 4ta. Sesión - Inicio
	let navegador, pagina
    
	before(async () => {  // Realizar antes de todo
		navegador = await puppeteer.launch({ headless: false })
		pagina = await navegador.newPage()
        console.log('Dispositivos: ', puppeteer.devices)
	})

	after(async () => {  // Realizar después de todo
		await pagina.close()
		await navegador.close()
	})

	beforeEach(async () => {  // Realizar antes de cada it
		await pagina.goto('http://example.com')
	})

	afterEach(async () => {  // Realizar después de cada it
		await new Promise((r) => setTimeout(r, 5000))
	})
    // 4ta. Sesión - Fin
    
	// 2da. Sesión
	/*it('1ra. Debe de abrir el navegador', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('http://example.com')
		await pagina.waitForSelector('h1')
		await navegador.close()
	})
	it('2da. Debe de abrir el navegador', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 27 })
		const pagina = await navegador.newPage()
		await pagina.goto('http://example.com')
		await pagina.waitForSelector('h1')
		await navegador.close()
	})
	it('3ra. Debe de abrir el navegador', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('http://example.com')
		await pagina.waitForSelector('h1')
		await navegador.close()
	})*/

	// 3ra. Sesión
	/*it('3ra. Sesión - 1er. Ejemplo', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('http://example.com')
		await pagina.waitForSelector('h1')
		await pagina.goto('https://dev.to/')
		await pagina.waitForSelector('#search-input')
		await pagina.goBack()
		await pagina.waitForSelector('h1')
		await pagina.goForward()
		await pagina.waitForSelector('#search-input')
		await navegador.close()
	})
	it('3ra. Sesión - 2do. Ejemplo', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('https://devexpress.github.io/testcafe/example/')
		await pagina.type('#developer-name', 'Detective John', { delay: 1000 })
		await pagina.click('#submit-button', { clickCount: 1 })
		const titulo = await pagina.title()
		const url = await pagina.url()
		console.log('Título:', titulo)
		console.log('URL:', url)
		await new Promise(r => setTimeout(r, 5000));
		await navegador.close()
	})
	it('3ra. Sesión - 3er. Ejemplo', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('http://example.com')
		const titulo = await pagina.title()
		const url = await pagina.url()
		const texto = await pagina.$eval('p', (elemento) => elemento.textContent)
		const htmlDiv = await pagina.$eval('body > div', (elemento) => elemento.innerHTML)
		const textoDiv = await pagina.$eval('body > div', (elemento) => elemento.textContent)
		console.log('Título:', titulo)
		console.log('URL:', url)
		console.log('Texto:', texto)
		console.log('Div HTML:', htmlDiv)
		console.log('Div Texto:', textoDiv)
		//await new Promise(r => setTimeout(r, 5000));
		await navegador.close()
	})*/

	// 4ta. Sesión
	/*it('4ta. Sesión - 1er. Ejemplo', async () => {
		const navegador = await puppeteer.launch({ headless: false })
		const pagina = await navegador.newPage()
		await pagina.goto('http://zero.webappsecurity.com/index.html')
		await pagina.waitForSelector('#searchTerm')
		await pagina.type('#searchTerm', 'Hola Mundo')
		await pagina.keyboard.press('Enter', { delay: 100 })
		await new Promise(r => setTimeout(r, 5000));
		await navegador.close()
	})
	it('4ta. Sesión - 2do. Ejemplo', async () => {
		//navegador = await puppeteer.launch({ headless: false });
		//pagina = await navegador.newPage();
		//await pagina.goto('http://example.com')
		const titulo = await pagina.title()
		expect(titulo).to.be.a('string') // Valida que sea un string
		expect(titulo).to.be.equal('Example Domain') // Valida que sea igual a 'Example Domain'
		expect(titulo.length).to.equal(14) // Valida que tenga 14 caracteres
		const url = await pagina.url()
		expect(url).to.include('example') // Valida que incluya 'example'
		const texto = await pagina.$eval(
			'p',
			(elemento) => elemento.textContent
		)
		//await new Promise(r => setTimeout(r, 5000));
		//await navegador.close()
	})
	it('4ta. Sesión - 3er. Ejemplo: Dimensiones del navegador', async () => {
        await pagina.setViewport({ width: 1920, height: 1080 })
        const titulo = await pagina.title()
		const url = await pagina.url()
		const texto = await pagina.$eval(
			'p',
			(elemento) => elemento.textContent
		)
		const htmlDiv = await pagina.$eval(
			'body > div',
			(elemento) => elemento.innerHTML
		)
		const textoDiv = await pagina.$eval(
			'body > div',
			(elemento) => elemento.textContent
		)
		console.log('Título:', titulo)
		console.log('URL:', url)
		console.log('Texto:', texto)
		console.log('Div HTML:', htmlDiv)
		console.log('Div Texto:', textoDiv)
	})*/
    /* No sirve, depreciado por Puppeteer la función de emular dispositivos
    it('4ta. Sesión - 4to. Ejemplo: Dimensiones del navegador tablet', async () => {
        const dispositivo = puppeteer.devices['iPad landscape']
        await pagina.emulate(dispositivo)
        await pagina.goto('http://example.com')
        const titulo = await pagina.title()
		const url = await pagina.url()
		console.log('Título:', titulo)
		console.log('URL:', url)
	})*/

})
