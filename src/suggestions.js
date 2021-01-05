
export function suggestions (days, movies, showtimes, tables) {
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

  for (const availableDay in days) {
    const availableTables = reservations.filter(table => table.day.substring(1, 3) === availableDay.substring(1, 3))
    showtimes.forEach(show => {
      if (show.day === days[availableDay]) {
        availableTables.forEach(table => {
          if (parseInt(table.time) >= parseInt(show.time) + 2) {
            console.log(`* On ${availableDay} "${moviesNumbered[show.movie]}" begins at ${show.time} and there is a free table to book between ${table.time}:00-${parseInt(table.time) + 2}:00.`)
          }
        })
      }
    })
  }
}
