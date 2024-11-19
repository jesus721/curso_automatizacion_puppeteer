const puppeteer = require('puppeteer')

describe('Prueba abriendo el navegador en la página de Mercado Libre y dando clic a "Ofertas"', () => {
	const sitio = 'https://www.mercadolibre.com.mx/'
	const selectorImgOfertas =
		'#\\:R16\\: > div.andes-carousel-snapped__controls-wrapper > div > div > div.andes-carousel-snapped__slide.andes-carousel-snapped__slide--active > div > img'

	it('Debe de usar el texto de "Ofertas"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		const textoEnl = 'Ofertas'
		await pagina.goto(sitio)
		/*
		await pagina.waitForSelector('body > header > div > div.nav-area.nav-bottom-area.nav-center-area > div > ul')
		await pagina.click('body > header > div > div.nav-area.nav-bottom-area.nav-center-area > div > ul > li:nth-child(2) > a')
		await pagina.waitForSelector('#\\:R16\\: > div.andes-carousel-snapped__controls-wrapper > div > div > div.andes-carousel-snapped__slide.andes-carousel-snapped__slide--active > div > img')
		*/
		//await pagina.waitForSelector('body > header > div > div.nav-area.nav-bottom-area.nav-center-area > div > ul > li:nth-child(2) > a')

		await pagina.evaluate((textoEnl) => {
			const enlaces = Array.from(document.querySelectorAll('a'))
			console.log('Arreglo de enlaces: ', enlaces)

			const enlace = enlaces.find((a) => a.textContent.includes(textoEnl))
			if (enlace) {
				enlace.click()
			}
			console.log('¿Encontró el enlace para las ofertas? ', enlace)
		}, textoEnl)

		await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})

	it('Debe de usar el texto de "Ofertas"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		await pagina.goto(sitio)

		await pagina.evaluate(() => {
			const enlaces = Array.from(document.querySelectorAll('a'))
			const enlace = enlaces.find((a) => a.textContent.trim() === 'Ofertas')
			if (enlace) {
				enlace.click()
			}
		})

		await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})

	it('Debe de usar el selector css de "Ofertas"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		const selectorCSSEnl = 'body > header > div > div.nav-area.nav-bottom-area.nav-center-area > div > ul > li:nth-child(2) > a'
		await pagina.goto(sitio)
		await pagina.waitForSelector(selectorCSSEnl)
		await pagina.click(selectorCSSEnl)
		await pagina.waitForSelector(selectorImgOfertas)
		await navegador.close()
	})

	it('Debe de usar el xpath de "Ofertas"', async () => {
		const navegador = await puppeteer.launch({ headless: false, slowMo: 0 })
		const pagina = await navegador.newPage()
		await pagina.goto(sitio)
		var i = 0;
		console.log(++i,' Entro!!');
		
		// Esperar a que el elemento esté visible
		const xpathEnlOfertas = '/html/body/header/div/div[5]/div/ul/li[2]/a'
		console.log(++i,' Entro!!');
		await pagina.waitForSelector(xpathEnlOfertas, { visible: true })

		console.log(++i,' Entro!!');
		// Hacer clic en el enlace de "Ofertas"
		const[enlaceOfertas] = await pagina.$x(xpathEnlOfertas)
		if (enlaceOfertas) {
			await enlaceOfertas.click()
		} else {
			console.error('No se encontró el enlace de "Ofertas"')
		}

		//await pagina.waitForSelector('body > header > div > div.nav-area.nav-bottom-area.nav-center-area > div > ul > li:nth-child(2) > a')
		console.log(++i,' Entro!!');
		//await pagina.locator('/html/body/header/div/div[5]/div/ul/li[2]/a').click()
		console.log(++i,' Entro!!');
		await pagina.waitForSelector(selectorImgOfertas)
		//console.log(++i,' Entro!!');
		await navegador.close()
	})
})
