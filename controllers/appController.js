const ChatApplication = require("../models/appModel.js");

exports.save = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let message = {
        from: req.body.from,
        to: req.body.to,
        message: (req.body.message && req.body.message != "") ? req.body.message : "-",
        isFile: (req.body.image) ? true : false,
        image: (req.body.image) ? req.body.image : false,
        type: (req.body.type) ? req.body.type : false
    }
    ChatApplication.saveMessage(message, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the message."
            });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    ChatApplication.login(req.params.login, req.params.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.login}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.login
                });
            }
        } else res.send(data);
    });
};

exports.findAllMessageByUser = (req, res) => {
    ChatApplication.findMessagesById(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving messages."
            });
        else res.send(data);
    });
};

exports.findAllUsers = (req, res) => {
    ChatApplication.getAllusers((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAdmin = (req, res) => {
    ChatApplication.adminUser((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Admin.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Admin "
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ChatApplication.messageRead(
        req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};