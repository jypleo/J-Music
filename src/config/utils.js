function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}
export default {
  getRandElmentFromArry(list, count) {
    const res = []
    let num = 0
    for (let i = 0; i < count; i++) {
      num = randomNum(0, list.length - 1)
      res.push(list[num])
      list.splice(num, 1)
    }
    return res
  },
  getShuffleArry(oldArr) {
    const newArr = []
    let num = 0
    for (let i = 0; i < oldArr.length; i++) {
      num = randomNum(0, oldArr.length - 1)
      newArr.push(oldArr[num])
      oldArr.splice(num, 1)
    }
    return newArr
  }
}
