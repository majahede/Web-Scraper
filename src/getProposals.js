/*
export function getProposals () {
  const days = ['Friday', 'Saturday']
  const friday = ['The Flying Deuces', 18, 'Keep Your Seats, Please', 16, 18, 'A Day at the Races', 16
  ]
  const dinner = ['fri1416', 'fri1618', 'fri1820', 'sat1820', 'sat2022', 'sun1416', 'sun1618', 'sun1820', 'sun2022']

  const dinnertimes = dinner.map(a => a.substring(0, 5))
  let availableTable = []

  for (let i = 0; i < days.length; i++) {
    availableTable.push(dinnertimes.filter(word => word.includes(days[i].substring(1, 3))))
  }
  console.log(availableTable.flat())
}
*/
