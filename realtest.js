const NP = require('./testClass')

const np = new NP()

console.log(np.init(12).plus(22,33,44).times(10,10,10).plus(1,10,100).divide(100,10).round(1).plus(0.5).round(0).divide(1000000).valueOf())