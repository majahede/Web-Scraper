import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom


/**
 * Extracts links from page.
 *
 * @param {string} url - the page to extract links from
 */
export async function movies () {
  const response = await fetch('https://cscloud6-127.lnu.se/scraper-site-1/cinema')
  const text = await response.text()
  const dom = new JSDOM(text)
  const links = Array.from(dom.window.document.querySelectorAll('#message'))
  return links.childNodes
}
