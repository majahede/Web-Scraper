import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/**
 * Encapsulates a link scraper.
 */
export class LinkScraper {
  /**
   * Extracts the links on a web page.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {string[]} The unique and absolute links.
   */
  async extractLinks (url) {
    const text = await this._getText(url)

    const dom = new JSDOM(text)

    const links = Array.from(dom.window.document.querySelectorAll('a'))
      .map(aElement => aElement.href)
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
