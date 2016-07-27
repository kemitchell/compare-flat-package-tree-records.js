var semver = require('semver')

module.exports = function (first, second) {
  if (first.name < second.name) return -1
  else if (first.name > second.name) return 1
  else return semver.compare(first.version, second.version)
}
