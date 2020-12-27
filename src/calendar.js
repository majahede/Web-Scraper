import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
// const url = 'https://cscloud6-127.lnu.se/scraper-site-1/'

/**
 * Extracts links from page.
 *
 * @param {string} url - the page to extract links from
 */
export async function calendarScraper (calendar) {
  let days = ''
  const response = await fetch(calendar)
  const text = await response.text()
  const dom = new JSDOM(text)
  const links = Array.from(dom.window.document.querySelectorAll('body > table > thead > tr > th, body > table > tbody > tr > td'))
  for (let i = 0; i < links.length; i++) {
    days = links[i].textContent
    console.log(days)
  }
  return await days
}
