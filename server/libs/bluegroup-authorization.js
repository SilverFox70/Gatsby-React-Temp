exports.inBluegroup = function(grpName, email, callback) {
  var request = require('request')
  var qs = require('querystring')
  var xml2js = require('xml2js')
  var BLUEPAGES_URL = 'https://bluepages.ibm.com/tools/groups/groupsxml.wss?'

  var params = {
    task: 'inAGroup',
    group: grpName,
    email: email,
  }

  request(
    {
      url: BLUEPAGES_URL + qs.stringify(params),
    },
    function(error, response, body) {
      if (error) {
        return error
      } else {
        var parser = new xml2js.Parser({ explicitArray: false })
        parser.parseString(body, function(err, result) {
          // result.group.rc will be '0' (a String) if person is a member of the group
          if (err) {
            // pass the error to the callback
            callback(err)
          }
          // no error, pass data
          callback(result.group.rc === '0')
        })
      }
    }
  )
}
