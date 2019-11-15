'use strict';

module.exports = app => {
    const controller = require('../controllers/appController');

    app.post("/chat/save", controller.save);

    app.get("/chat/login/:login/:password", controller.login);
    app.get("/chat/messages/:userId", controller.findAllMessageByUser);

    app.get("/chat/allusers", controller.findAllUsers);
    app.get("/chat/admin", controller.getAdmin);

    app.put("/chat/updatemessage/:id", controller.update);

    app.get("/chat", (req, res) => {
        res.json({ message: "Welcome to Chat Massage application." });
    });
};