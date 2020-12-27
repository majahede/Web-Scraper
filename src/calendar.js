import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
// const url = 'https://cscloud6-127.lnu.se/scraper-site-1/'

/**
 * Encapsulates a calendar scraper.
 */
export class CalendarScraper {
  /**
   * Extracts the links on a web page.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {string[]} The unique and absolute links.
   */
  async extractLinks (url) {
    const text = await this._getText(url)

    const dom = new JSDOM(text)

    const links = Array.from(dom.window.document.querySelectorAll('body > table > tbody > tr > td'))
      .map(e => e.textContent)

    return links
  }

  /**
   * Gets the plain text from an URL.
   *
   * @param {string} url - URL to get text content from.
   * @returns {string} The content as plain text.
   */
  async _getText (url) {
    const response = await fetch(url)
    return response.text()
  }
}

/**
 * Extracts links from page.
 *
 * @param {string} calendar - the page to extract links from
 *
 */
/*
export async function calendarScraper (calendar) {
  let days = []
  const response = await fetch(calendar)
  const text = await response.text()
  const dom = new JSDOM(text)
  const links = Array.from(dom.window.document.querySelectorAll('body > table > tbody > tr > td'))
  for (let i = 0; i < links.length; i++) {
    days.push(links[i].textContent)
  }
  return days
}
*/
