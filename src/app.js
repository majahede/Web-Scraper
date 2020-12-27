
import { LinkScraper } from './linkScraper.js'
import { CalendarScraper } from './calendar.js'
// import { scraper2 } from './linkScraper2.js'
/**
 * Starts the applikation.
 */
const main = async () => {
  // const url = process.argv[2]
  // get starting links
  const linkscraper = new LinkScraper()
  const startingLinks = await linkscraper.extractLinks('https://cscloud6-127.lnu.se/scraper-site-1/')
  console.log(startingLinks)

  // get calendar links
  const calendarLinks = await linkscraper.extractLinks(startingLinks[0])
  const personalCalendar = []
  calendarLinks.forEach(link => {
    // Get absolute path  for calendars, push to array
    personalCalendar.push(startingLinks[0] + link.substring(2))
  })
  console.log(personalCalendar)

  const calendarscraper = new CalendarScraper()
  const calendardays = await calendarscraper.extractLinks(personalCalendar[0])
  console.log(calendardays)
}

main()

/*
const personalCalendar = []
calendarLinks.forEach(link => {
// Get absolute path  for calendars, push to array
  personalCalendar.push(startingLinks[0] + link.substring(2))
})
console.log(personalCalendar)
const alldays = []
personalCalendar.forEach(async calendar => {
  const days = await calendarScraper(calendar)
  alldays.push(days)
  // console.log(await calendarScraper(calendar))
  console.log(alldays)
})
alldays.forEach(async day => {
  console.log(day)
}) */
