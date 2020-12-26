import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
// const url = 'https://cscloud6-127.lnu.se/scraper-site-1/'

/**
 * Scrapes links from page.
 */
export async function scraper () {
  const response = await fetch(process.argv[2])
  const text = await response.text()
  const dom = new JSDOM(text)
  const links = Array.from(dom.window.document.querySelectorAll('a[href^="http://"], a[href^="https://"]'))
    .map(aElement => aElement.href)
  console.log(links)
}
