require('scripts/Classes/ReceiveMsg/*');

/**
 * The MessageProcessor processes all messages which come in. It determines which message type it is, creates the
 * determined Message Object, sets message content as properties and processes the message.
 *
 * @namespace EmberChat
 * @class MessageProcessor
 */
Webster.MessageProcessor = Ember.Object.create({

    /**
     * Process the given raw message
     *
     * @method processIncoming
     * @param {string} rawMessage
     * @returns {void}
     */
    processIncoming: function(rawMessage) {
        var messageContent = JSON.parse(rawMessage.data);

        var message = null;
        try{
            console.log('Receiving message: ' + JSON.stringify(messageContent));
            message = Webster.ReceiveMsg[messageContent.type].create(messageContent);
        }catch (e){
            Ember.warn("Unknown message type: " + messageContent.type);
        }
        if(message){
            message.process();
        }

    },

    /**
     * Process an outgoing message
     *
     * @method processOutgoing
     * @param {EmberChat.AbstractMessage} message
     */
    processOutgoing: function(message) {
        if(typeof message === 'object') {
            console.log('Sending message: ' + JSON.stringify(message));
            Webster.Socket.sendMessage(JSON.stringify(message));
        }
    }
});