
import { scraper } from './linkScraper.js'
import { calendarScraper } from './calendar.js'
// import { scraper2 } from './linkScraper2.js'

const main = async () => {
  const url = process.argv[2]
  const startingLinks = await scraper('https://cscloud6-127.lnu.se/scraper-site-1/')
  console.log(startingLinks)
  const calendarLinks = await scraper(startingLinks[0])
  const personalCalendar = []
  calendarLinks.forEach(link => {
  // Get absolute path  for calendars, push to array
    personalCalendar.push(startingLinks[0] + link.substring(2))
  })
  console.log(personalCalendar)
  personalCalendar.forEach(async calendar => {
    await calendarScraper(calendar)
  })
}

main()
