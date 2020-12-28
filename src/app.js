
import { LinkScraper } from './linkScraper.js'
import { CalendarScraper } from './calendar.js'
import { movies } from './movies.js'

// import { scraper2 } from './linkScraper2.js'
/**
 * Starts the applikation.
 */
const main = async () => {
  // const url = process.argv[2]
  // get starting links
  const linkscraper = new LinkScraper()
  const startingLinks = await linkscraper.extractLinks('https://cscloud6-127.lnu.se/scraper-site-1/')
  console.log('Scraping links...OK')

  // get calendar links
  const calendarLinks = await linkscraper.extractLinks(startingLinks[0])
  const personalCalendar = [] // links to calendars
  calendarLinks.forEach(link => {
    // Get absolute path  for calendars, push to array
    personalCalendar.push(startingLinks[0] + link.substring(2))
  })
  const days = []
  const calendarscraper = new CalendarScraper()
  for (let i = 0; i < personalCalendar.length; i++) {
    const calendardays = await calendarscraper.extractLinks(personalCalendar[i])
    days.push(calendardays)
  }
  const daysFlatened = days.flat()
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
  const filteredDays = daysFlatened.filter(day => countOccurrences(daysFlatened, day) === personalCalendar.length)
  const availableDays = [...new Set(filteredDays)]
  console.log('Scraping available days...OK')
}

main()
