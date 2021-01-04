
import { LinkScraper } from './linkScraper.js'
import { CalendarScraper } from './calendar.js'
import { MovieScraper } from './movies.js'
import { login } from './login.js'
// import { getProposals } from './getProposals.js'

// import { scraper2 } from './linkScraper2.js'
/**
 * Starts the applikation.
 */
const main = async () => {
  // const url = process.argv[2]

  // get links to the calendar, the cinema and the dinner reservation.
  const linkscraper = new LinkScraper()
  const startingLinks = await linkscraper.extractLinks('https://cscloud6-127.lnu.se/scraper-site-2/')
  console.log('Scraping links...OK')

  // get links to calendars.
  const calendarLinks = await linkscraper.extractLinks(startingLinks[0])
  const personalCalendar = [] // links to calendars
  calendarLinks.forEach(link => {
    // Get absolute path  for calendars, push to array
    personalCalendar.push(startingLinks[0] + link.substring(2))
  })

  const calendarscraper = new CalendarScraper()
  const availableDays = await calendarscraper.getAvailableDays(personalCalendar) //
  console.log('Scraping available days...OK')
  console.log(availableDays)

  const moviescraper = new MovieScraper()

  const movies = await moviescraper.extractMovies(startingLinks[1])
  const showtimes = await moviescraper.getShowtimes(startingLinks[1], availableDays, movies)
  console.log(showtimes)
  await login()
}

main()
