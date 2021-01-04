import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/**
 * Encapsulates a calendar scraper.
 *
 * @class
 */
export class CalendarScraper {
  /**
   * Extracts the links on a web page.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {string[]} The unique and absolute links.
   */
  async extractDays (url) {
    const text = await this._getText(url)

    const dom = new JSDOM(text)

    const days = Array.from(dom.window.document.querySelectorAll('body > table > tbody > tr > td'))
      .map(e => e.textContent)
    if (days[0] === 'ok' || days[0] === 'OK' || days[0] === 'oK') {
      days[0] = 'Friday'
    }
    if (days[1] === 'ok' || days[1] === 'OK' || days[1] === 'oK') {
      days[1] = 'Saturday'
    }
    if (days[2] === 'ok' || days[2] === 'OK' || days[2] === 'oK') {
      days[2] = 'Sunday'
    }
    const filteredDays = days.filter(word => word.includes('day'))
    return filteredDays
  }

  /**
   * Extracts the links on a web page.
   *
   * @param {Array} calendars - An array of links to calendars.
   * @returns {string[]} The days that are available for everyone.
   */
  async getAvailableDays (calendars) {
    const days = []
    for (let i = 0; i < calendars.length; i++) {
      const calendarDays = await this.extractDays(calendars[i])
      days.push(calendarDays)
    }
    const daysFlatened = days.flat()

    /**
     * Check how many times a value of an array occurs.
     *
     * @param {Array} arr - The array to analyze.
     * @param {string} value - The value to count the occurancy of.
     * @returns {string[]} - The occurances of the values in the Array.
     */
    const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a), 0)

    // Check which days are avaialable for everyone.
    const filteredDays = daysFlatened.filter(day => countOccurrences(daysFlatened, day) === calendars.length)
    const availableDays = [...new Set(filteredDays)]
    const daysNumbered = {}
    for (let i = 0; i < availableDays.length; i++) {
      if (availableDays[i] === 'Friday') {
        daysNumbered[availableDays[i]] = '05'
      } else if (availableDays[i] === 'Saturday') {
        daysNumbered[availableDays[i]] = '06'
      } else if (availableDays[i] === 'Sunday') {
        daysNumbered[availableDays[i]] = '07'
      }
    }
    return daysNumbered
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
