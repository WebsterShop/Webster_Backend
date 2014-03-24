require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents a conversation message
 *
 * @class Conversation
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
Webster.ReceiveMsg.ProductMessage = Webster.ReceiveMsg.Abstract.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var products = Ember.A();
        var content = this.get('content');
        for(var i=0; i < content.length; i++){
            var product = Webster.Product.create(content[i]);
            products.addObject(product);
        }
        Webster.Session.set('productCollection', products);

        return true;
    }
});