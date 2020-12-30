import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/**
 * Get available movies.
 *
 */
export async function movies () {
  const response = await fetch('https://cscloud6-127.lnu.se/scraper-site-1/cinema')
  const text = await response.text()
  const dom = new JSDOM(text)
  const list = Array.from(dom.window.document.querySelectorAll('#movie > option'))
  const arrayOfmovies = []
  for (let i = 2; i <= list.length; i++) {
    const movie = dom.window.document.querySelector(`#movie > option:nth-child(${i})`).textContent
    arrayOfmovies.push(movie)
  }

  const availableday = ['05', '06']

  for (let i = 0; i < availableday.length; i++) { // for every available day
    for (let j = 0; j < arrayOfmovies.length; j++) { // get the movietimes for each movie
      const availableMovies = await fetch(`https://cscloud6-127.lnu.se/scraper-site-1/cinema/check?day=${availableday[i]}&movie=${'0' + (j + 1)}`)
      const movieTimes = await availableMovies.json()
      console.log(arrayOfmovies[j])
      const availableTimes = movieTimes.filter(movie => movie.status === 1)
      availableTimes.forEach(a => console.log(parseInt(a.time)))
    }
  }
}

// fetch? https://cscloud6-127.lnu.se/scraper-site-1/cinema/check?day=05&movie=01
