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
    if (links[0] === 'ok' || links[0] === 'OK') {
      links[0] = 'Friday'
    }
    if (links[1] === 'ok' || links[1] === 'OK') {
      links[1] = 'Saturday'
    }
    if (links[2] === 'ok' || links[2] === 'OK') {
      links[2] = 'Sunday'
    }
    const filteredlinks = links.filter(word => word.includes('day'))
    return filteredlinks
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
