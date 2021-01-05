
export function proposal (days, movies, showtimes, tables) {
  const moviesNumbered = {}
  for (let i = 0; i < movies.length; i++) {
    moviesNumbered['0' + (i + 1)] = movies[i]
  }

  const reservations = []
  for (let i = 0; i < tables.length; i++) {
    reservations[i] = {
      day: tables[i].substring(0, 3),
      time: tables[i].substring(3, 5)
    }
  }

  console.log(days)
  console.log(moviesNumbered)
  console.log(showtimes)
  console.log(reservations)
}

/*
console.log(parseInt(showtimes[0].time))
const str = 'Friday'

if (str.toLowerCase() === 'friday') {
console.log('yes')
}

*/
