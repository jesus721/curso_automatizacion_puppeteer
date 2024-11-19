const puppeteer = require('puppeteer')

async function pruebaNavegador() {
	const navegador = await puppeteer.launch({ headless: false, slowMo: 500 })
	const pagina = await navegador.newPage()
	await pagina.goto('http://example.com')
	await pagina.waitForSelector('h1')
	await navegador.close()
}

pruebaNavegador()
