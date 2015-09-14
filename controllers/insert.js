
var r = require('rethinkdb');

module.exports = function (req, res, next) {

        // 處理 post 過來的資料
        var name = req.body.name || 'NO_NAME';
        var msg = req.body.msg || 'NO_MSG';
	var iso = new Date().toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);

        // 將資料存入 db 內
        r.table('people').insert({
            name: name,
            msg: msg,
            date: iso[1] + " " + iso[2]
        }, { returnChanges: true }).run(global.connection, function (err, doc) {

            if(err){
                console.log(err);
                process.exit();
            }

            return res.status(204).send();
        });

};
