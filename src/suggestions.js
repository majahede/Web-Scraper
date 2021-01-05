
/**
 * Gives suggestions from available days, showtimes and available tables.
 *
 * @param {Array} days - Available days.
 * @param {Array} movies - The movies shown at the cinema.
 * @param {Array} showtimes - Showtimes at the cinema.
 * @param {Array} tables - Available tables at the restaurant.
 */
export function suggestions (days, movies, showtimes, tables) {
  // Set number for each movie.
  const moviesNumbered = {}
  for (let i = 0; i < movies.length; i++) {
    moviesNumbered['0' + (i + 1)] = movies[i]
  }
  // Turn string of available table to an object.
  const reservations = []
  for (let i = 0; i < tables.length; i++) {
    reservations[i] = {
      day: tables[i].substring(0, 3),
      time: tables[i].substring(3, 5)
    }
  }

  // Get suggestions.
  for (const availableDay in days) {
    const availableTables = reservations.filter(table => table.day.substring(1, 3) === availableDay.substring(1, 3))
    showtimes.forEach(show => {
      if (show.day === days[availableDay]) {
        availableTables.forEach(table => {
          if (parseInt(table.time) >= parseInt(show.time) + 2) {
            console.log(`* On ${availableDay}, "${moviesNumbered[show.movie]}" begins at ${show.time}, and there is a free table to book between ${table.time}:00-${parseInt(table.time) + 2}:00.`)
          }
        })
      }
    })
  }
}
