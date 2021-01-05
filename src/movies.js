import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/**
 * Encapsulates a movie showtimes scraper.
 *
 * @class
 */
export class MovieScraper {
  /**
   * Extract list of movies shown at the cinema.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {Array} - An array of movies shown at the cinema.
   */
  async extractMovies (url) {
    const response = await fetch(url)
    const text = await response.text()
    const dom = new JSDOM(text)
    const list = Array.from(dom.window.document.querySelectorAll('#movie > option'))
    const arrayOfMovies = []

    for (let i = 2; i <= list.length; i++) {
      const movie = dom.window.document.querySelector(`#movie > option:nth-child(${i})`).textContent
      arrayOfMovies.push(movie)
    }
    return arrayOfMovies
  }

  /**
   * Gets information about the available movies at the cinema.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @param {object} days - The object of available days.
   * @param {Array} movies - The movies shown at the cinema.
   * @returns {Array} - Information about the available movies.
   */
  async getShowtimes (url, days, movies) {
    const showTimes = []
    const dayNumbers = Object.keys(days).map(key => days[key])
    let movieInfo = []

    for (let i = 0; i < dayNumbers.length; i++) { // for every available day
      for (let j = 0; j < movies.length; j++) { // get the movietimes for each movie
        const availableMovies = await fetch(`${url}/check?day=${dayNumbers[i]}&movie=${'0' + (j + 1)}`)
        movieInfo = await availableMovies.json()
        const availableTimes = movieInfo.filter(movie => movie.status === 1)
        showTimes.push(availableTimes)
      }
    }
    return showTimes.flat()
  }
}
