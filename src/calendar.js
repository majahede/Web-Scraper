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
   * Extracts the available days from a calendar.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {Array} - The available days.
   */
  async extractDays (url) {
    const text = await this._getText(url)

    const dom = new JSDOM(text)

    const days = Array.from(dom.window.document.querySelectorAll('body > table > tbody > tr > td'))
      .map(e => e.textContent)
    if (days[0].toLowerCase() === 'ok') {
      days[0] = 'Friday'
    }
    if (days[1].toLowerCase() === 'ok') {
      days[1] = 'Saturday'
    }
    if (days[2].toLowerCase() === 'ok') {
      days[2] = 'Sunday'
    }
    const filteredDays = days.filter(word => word.includes('day'))
    return filteredDays
  }

  /**
   * Gets the days that are available to all calendars in an array.
   *
   * @param {Array} calendars - Links to calendars.
   * @returns {Array} The days that are available for everyone.
   */
  async getAvailableDays (calendars) {
    const days = []
    for (let i = 0; i < calendars.length; i++) {
      const calendarDays = await this.extractDays(calendars[i])
      days.push(calendarDays)
    }
    const daysFlatened = days.flat()

    // Check which days are avaialable for everyone.
    const filteredDays = daysFlatened.filter(day => this.countOccurrences(daysFlatened, day) === calendars.length)
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
   * Check how many times a value of an array occurs.
   *
   * @param {Array} array - The array to analyze.
   * @param {string} value - The value to count the occurancy of.
   * @returns {Array} - The occurances of the values in the Array.
   */
  countOccurrences (array, value) {
    return array.reduce((a, v) => (v === value ? a + 1 : a), 0)
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
