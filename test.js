var tape = require('tape')
var compare = require('./')

tape('different packages', function (test) {
  test.equal(
    compare(
      {name: 'a', version: '1.0.0'},
      {name: 'b', version: '1.0.0'}
    ),
    -1
  )
  test.equal(
    compare(
      {name: 'b', version: '1.0.0'},
      {name: 'a', version: '1.0.0'}
    ),
    1
  )
  test.end()
})

tape('same package, different versions', function (test) {
  test.equal(
    compare(
      {name: 'a', version: '1.0.0'},
      {name: 'a', version: '2.0.0'}
    ),
    -1
  )
  test.equal(
    compare(
      {name: 'a', version: '2.0.0'},
      {name: 'a', version: '1.0.0'}
    ),
    1
  )
  test.end()
})

tape('same package and version', function (test) {
  test.equal(
    compare(
      {name: 'a', version: '1.0.0'},
      {name: 'a', version: '1.0.0'}
    ),
    0
  )
  test.end()
})

tape('URL version', function (test) {
  test.deepEqual(
    compare(
      {name: 'a', version: 'git://git@github.com:example/example.git'},
      {name: 'a', version: '2.0.0'}
    ),
    1
  )
  test.deepEqual(
    compare(
      {name: 'a', version: '2.0.0'},
      {name: 'a', version: 'git://git@github.com:example/example.git'}
    ),
    -1
  )
  test.end()
})

tape('URL versions', function (test) {
  test.deepEqual(
    compare(
      {name: 'a', version: 'git://git@github.com:example/A.git'},
      {name: 'a', version: 'git://git@github.com:example/B.git'}
    ),
    -1
  )
  test.deepEqual(
    compare(
      {name: 'a', version: 'git://git@github.com:example/B.git'},
      {name: 'a', version: 'git://git@github.com:example/A.git'}
    ),
    1
  )
  test.deepEqual(
    compare(
      {name: 'a', version: 'git://git@github.com:example/A.git'},
      {name: 'a', version: 'git://git@github.com:example/A.git'}
    ),
    0
  )
  test.end()
})
