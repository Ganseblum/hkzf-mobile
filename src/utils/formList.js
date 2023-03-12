// export const formLsit = (list) => {
//   const cityNameList = []
//   const cityIndex = []
//   list.map(item => {
//     const Index = item.short.substring(0, 1)
//     if (cityIndex.indexOf(Index.toUpperCase()) < 1) {
//       cityIndex.push(Index.toUpperCase())
//     }
//     return cityIndex.sort()
//   })
//   return cityIndex
// }

export const formLsit = (list) => {
  const cityNameList = {}
  list.forEach(item => {
    const first = item.short.substr(0, 1).toUpperCase()
    if (cityNameList[first]) {
      cityNameList[first].push(item)
    } else {
      cityNameList[first] = [item]
    }
  })
  const cityIndex = Object.keys(cityNameList).sort()
  return { cityNameList, cityIndex }

}