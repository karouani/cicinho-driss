const sql = require('./dbconnection');
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

const ChatApplication = function() {};

ChatApplication.saveMessage = (data, result) => {
    var message = {
        from_id: data.from,
        to_id: data.to,
        messages: data.message,
        is_read: 0
    };

    sql.query("INSERT INTO messages SET ?", message, (err, res) => {
        if (err) {
            console.log("error INSERT INTO messages: ", err);
            result(err, null);
            return;
        }

        if (data.isFile) {
            const image = {
                content: data.image,
                type: data.type
            }

            sql.query("INSERT INTO files SET ?", image, (err1, res1) => {
                if (err1) {
                    console.log("error INSERT INTO files : ", err1);
                    result(err1, null);
                    return;
                }

                message.image = image;
                id_message = res.insertId;

                const assoc = {
                    id_file: res1.insertId,
                    id_message: id_message
                };

                sql.query("INSERT INTO msg_file SET ?", assoc, (err2, res2) => {
                    if (err1) {
                        msg_file
                        console.log("error INSERT INTO msg_file : ", err2);
                        result(err2, null);
                        return;
                    }

                    message.assoc = assoc;
                    result(null, { data: data });
                });
            });
        } else {
            console.log("created messages: ", { id: res.insertId, ...data });
            result(null, data);
        }
    });
};

ChatApplication.login = (login, password, result) => {
    sql.query(`SELECT * FROM user WHERE login = '${login}' AND password = '${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

ChatApplication.findMessagesById = (user_id, result) => {
    sql.query(
        `SELECT m.*, REPLACE(CAST(m.messages AS CHAR(10000) CHARACTER SET utf8), 'undefined', 'NULL') as messages,TO_BASE64(f.content) as content, f.type FROM messages as m
        left outer join msg_file as mf ON mf.id_message = m.id
        left outer join files as f ON f.id = mf.id_file
        WHERE m.to_id = '${user_id}' OR m.from_id = ${user_id}
        ORDER BY m.date_update ASC`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, res);
        });
};

ChatApplication.getAllusers = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

ChatApplication.getAllusersAsync = async () => {
    return await query("SELECT * FROM user");
};

ChatApplication.adminUser = (result) => {
    sql.query(`SELECT * FROM user WHERE role = 'admin'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};


ChatApplication.adminUserAsync = async () => {
    return await query(`SELECT * FROM user WHERE role = 'admin'`);
};

ChatApplication.messageRead = (id, result) => {
    sql.query(
        "UPDATE messages SET is_read = 1 WHERE id = ?", [id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated messages: ", { id: id });
            result(null, { id: id });
        }
    );
};


module.exports = ChatApplication;