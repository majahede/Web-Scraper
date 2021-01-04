import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
/**
 * Log in to page.
 *
 */
export async function login () {
  const data = new URLSearchParams({
    username: 'zeke',
    password: 'coys',
    submit: 'login'
  })

  const url = 'https://cscloud6-127.lnu.se/scraper-site-1/dinner/'

  const response = await fetch(url)
  const text = await response.text()
  const dom = new JSDOM(text)
  const form = dom.window.document.querySelector('body > div > form')

  const login = await fetch(`${url}${form.action}`, {
    method: 'post',
    redirect: 'manual',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'same-origin'
  })

  const getURL = await fetch(`${url}${form.action}`, {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const bookingURL = getURL.url

  const headers = login.headers
  const cookieheader = headers.get('Set-Cookie')
  const splitedcookie = cookieheader.split(';')
  const cookie = splitedcookie[0]

  const booking = await fetch(bookingURL, {
    headers: {
      cookie: cookie
    }
  })
  const availableTables = []
  const bookingtext = await booking.text()
  const domm = new JSDOM(bookingtext)
  const dine = Array.from(domm.window.document.querySelectorAll('input[type=radio]'))
  dine.forEach(a => availableTables.push(a.value))
  console.log(availableTables[0])
}
