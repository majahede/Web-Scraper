import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
// const url = 'https://cscloud6-127.lnu.se/scraper-site-1/'

/**
 * Extracts links from page.
 *
 * @param {string} url - the page to extract links from
 */
export async function scraper2 (url) {
  const response = await fetch(url)
  const text = await response.text()
  const dom = new JSDOM(text)
  const links = Array.from(dom.window.document.querySelectorAll('a[href^="http://"], a[href^="https://"], a[href^="./"]'))
  return links.forEach(element => element.href)
}
