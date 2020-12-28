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
  const list = Array.from(dom.window.document.querySelectorAll('#movie > option'))
  const arrayOfmovies = []
  for (let i = 2; i <= list.length; i++) {
    const movie = dom.window.document.querySelector(`#movie > option:nth-child(${i})`).textContent
    arrayOfmovies.push(movie)
  }

  console.log(arrayOfmovies)

  const questions = await fetch('https://cscloud6-127.lnu.se/scraper-site-1/cinema/check?day=05&movie=01')
  const question = await questions.json()
  console.log(question)
  console.log(question[0].time)
}

// fetch? https://cscloud6-127.lnu.se/scraper-site-1/cinema/check?day=05&movie=01