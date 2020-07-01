const tester = require('connection-tester')
const reg = new RegExp('https?:\/\/(.+)', 'gi')

function ct(url) {
  const regUrl = url.replace(reg,"$1")
  const test = []
  test.push(tester.test(regUrl, 80))
  if(!test[0].success) {
    test.push(tester.test(regUrl, 443))
  } else {
    return test[0]
  }

  if(!test[1].success) {
    return tester.test(regUrl, 8080)
  } else return test[1]

}

module.exports = (url) => new Promise((resolve) => {
  resolve(ct(url))
})