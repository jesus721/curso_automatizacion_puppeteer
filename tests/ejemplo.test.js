const puppeteer = require('puppeteer')

describe('Pruebas abriendo el navegador', () => {
	it('1ra. Debe de abrir el navegador', async () => {
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
	})
})
