const Channel = require("../models/channel.model");

class ChannelController {
    create(req, res) {
        const newChannel = new Channel(req.body);
        newChannel.messages = [];
        newChannel.members = [req.body.creator_id];

        newChannel.save()
            .then( () => res.json(newChannel) )
            .catch( errors => res.json(errors) );
    }
    getAll(req, res) {
        Channel.find()
            .then( channel => res.json(channel) )
            .catch( errors => res.json(errors) );
    }
    getOne(req, res) {
        Channel.findOne({_id: req.params._id})
            .then( channel => res.json(channel) )
            .catch( errors => res.json(errors) );
    }
    update(req, res) {
        Channel.findByIdAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
    remove(req, res) {
        Channel.findByIdAndRemove({_id: req.params._id})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
    addMessage(req, res) {
        Channel.findByIdAndUpdate({_id: req.params._id}, {$push: {messages: req.body}})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
    removeMessage(req, res) {
        Channel.findByIdAndUpdate({_id: req.params._id}, {$pull: {messages: {_id: req.body.message_id} }})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
    addMember(req, res) {
        Channel.findByIdAndUpdate({_id: req.params._id}, {$push: {members: req.body._id}})
            .then( () => res.json({msg: "ok"}) )
            .catch( errors => res.json(errors) );
    }
}

module.exports = new ChannelController();