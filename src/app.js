
import { LinkScraper } from './linkScraper.js'
import { CalendarScraper } from './calendar.js'
import { MovieScraper } from './movies.js'
import { dinnerReservation } from './dinnerReservation.js'
import { suggestions } from './suggestions.js'

/**
 * Starts the application.
 */
const main = async () => {
  try {
    const url = process.argv[2]

    // Get links to the calendar, the cinema and the dinner reservation.
    const linkscraper = new LinkScraper()
    const startingLinks = await linkscraper.extractLinks(url)
    console.log('Scraping links...OK')

    // Get links to calendars.
    const calendarLinks = await linkscraper.extractLinks(startingLinks[0])
    const personalCalendar = [] // links to calendars
    calendarLinks.forEach(link => {
      // Get absolute path  for calendars and push to array.
      personalCalendar.push(startingLinks[0] + link.substring(2))
    })

    const calendarscraper = new CalendarScraper()
    const availableDays = await calendarscraper.getAvailableDays(personalCalendar)
    console.log('Scraping available days...OK')

    // Get movies and available showTimes
    const moviescraper = new MovieScraper()
    const movies = await moviescraper.extractMovies(startingLinks[1])
    const showtimes = await moviescraper.getShowtimes(startingLinks[1], availableDays, movies)
    console.log('Scraping showtimes...OK')

    const tables = await dinnerReservation(startingLinks[2])
    console.log('Scraping possible reservations...OK')

    console.log('\nSuggestions\n=========== ')
    suggestions(availableDays, movies, showtimes, tables)
  } catch (error) {
    console.error(error.message)
  }
}

main()
