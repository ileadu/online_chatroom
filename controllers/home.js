
var r = require('rethinkdb');

module.exports = function (req, res, next) {
    var interfaces = require('os').networkInterfaces();
    var ip = '';
    for (var intf in interfaces) {
        for (var param in interfaces[intf]) {
            var val = interfaces[intf][param];
            if (val.family === 'IPv4' && !val.internal) {
                ip = val.address;
		break;
            }
        }
        if (ip !== '')
            break;
    }
    r.table('people')
        .orderBy(r.asc('date'))
        .run(global.connection, function (err, cursor){

            if(err){
                console.log(err);
                process.exit();
            }

            cursor.toArray(function (err, docs){

                if(err){
                    console.log(err);
                    process.exit();
                }

                return res.render('index', { people: docs, ip: ip });
            });
    });
};


