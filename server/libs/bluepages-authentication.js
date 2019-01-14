exports.bluepagesAuthentication = function(req, bluegroup, callback) {
  var ldap = require('ldapjs')
  var inBluegroup = require('./bluegroup-authorization').inBluegroup

  var client = ldap.createClient({
    url: 'ldaps://bluepages.ibm.com',
  })

  var searchopts = {
    filter: '(mail=' + req.body.username + ')',
    scope: 'sub',
  }

  // search for user in through ldap
  client.search('ou=bluepages,o=ibm.com', searchopts, function(err, result) {
    var dn
    var user

    result.on('searchEntry', function(entry) {
      dn = entry.object.dn
      user = entry.object
    })

    result.on('end', function(result) {
      if (dn) {
        client.bind(dn, req.body.password, function(err, result) {
          if (err) {
            callback(401)
          } else {
            // regenerate session when signing in to prevent fixation
            req.session.regenerate(function() {
              // check if user is in this bluegroup
              inBluegroup(bluegroup, req.body.username, function(data) {
                if (data) {
                  // store the user in session
                  callback(user)
                } else {
                  // not in this bluegroup
                  callback(401)
                }
              })
            })
          }
        })
      } else {
        callback(404)
      }
    })
  })
}
