const puppeteer = require('puppeteer')

describe('Prueba abriendo el navegador en la página de Soriana y dando clic a "Folletos"', () => {
	const sitio = 'https://www.soriana.com/'
	const selectorImgOfertas =
		'#maincontent > div.folletos-page.container > div.d-flex.justify-content-sm-center.tabs-content.text-center > div:nth-child(1) > img'

	it('Debe de usar el texto de "Folletos"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		await pagina.goto(sitio)
        await pagina.waitForSelector('body > div.page > header > nav > div.hideHeaderFolderNav.scroll-menu-responsive > ul > li > ul > li:nth-child(3) > a')
		await pagina.evaluate(() => {
			const enlaces = Array.from(document.querySelectorAll('a'))
			const enlace = enlaces.find((a) => a.textContent.trim() === 'Folletos')
			if (enlace) {
				enlace.click()
			}
		})
		await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})

	it('Debe de usar el selector css de "Folletos"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		const selectorCSSEnl = 'body > div.page > header > nav > div.hideHeaderFolderNav.scroll-menu-responsive > ul > li > ul > li:nth-child(3) > a'
		await pagina.goto(sitio)
		await pagina.waitForSelector(selectorCSSEnl)
		await pagina.click(selectorCSSEnl)
		await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})

	it('Debe de usar el xpath de "Folletos"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		await pagina.goto(sitio)
        const xpathEnlFolletos = '::-p-xpath(/html/body/div[4]/header/nav/div[2]/ul/li/ul/li[3]/a)'
		await pagina.waitForSelector(xpathEnlFolletos)
        await pagina.locator(xpathEnlFolletos).click()
        await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})
})
