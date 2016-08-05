var semver = require('semver')

module.exports = function (first, second) {
  // Compare package names as strings.
  if (first.name < second.name) {
    return -1
  } else if (first.name > second.name) {
    return 1
  // The package names are the same.
  } else {
    var firstVersion = first.version
    var secondVersion = second.version
    var firstSemVer = isSemVer(firstVersion)
    var secondSemVer = isSemVer(secondVersion)
    // When both have SemVer versions, compare versions.
    if (firstSemVer && secondSemVer) {
      return semver.compare(first.version, second.version)
    // Rank URL versions before SemVer versions.
    } else if (firstSemVer && !secondSemVer) {
      return -1
    } else if (!firstSemVer && secondSemVer) {
      return 1
    // When both have URL versions, compare as strings.
    } else {
      if (firstVersion < secondVersion) {
        return -1
      } else if (firstVersion > secondVersion) {
        return 1
      } else {
        return 0
      }
    }
  }
}

function isSemVer (version) {
  return semver.valid(version) !== null
}
