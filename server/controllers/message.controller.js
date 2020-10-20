const Message = require("../models/message.model");

class MessageController {
    create(req, res) {
        const newMessage = new Message(req.body);
        newMessage.save()
            .then( () => res.json(newMessage) )
            .catch( errors => res.json(errors) );
    }
    getAll(req, res) {
        Message.find().sort("created_at")
            .then( message => res.json(message) )
            .catch( errors => res.json(errors) );
    }
    getOne(req, res) {
        Message.findOne({_id: req.params._id})
            .then( message => res.json(message) )
            .catch( errors => res.json(errors) );
    }
    update(req, res) {
        Message.findByIdAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
    remove(req, res) {
        Message.findByIdAndRemove({_id: req.params._id})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
}

module.exports = new MessageController();
