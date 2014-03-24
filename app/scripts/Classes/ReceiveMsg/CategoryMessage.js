require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents a conversation message
 *
 * @class Conversation
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
Webster.ReceiveMsg.CategoryMessage = Webster.ReceiveMsg.Abstract.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {

        var categories = Ember.A();
        var content = this.get('content');

        if(content.length == 1){
            Webster.Session.set('category', Webster.Category.create(content[0]));
            return true;
        }

        for(var i=0; i < content.length; i++){
            var category = Webster.Category.create(content[i]);
            categories.addObject(category);
        }
        Webster.Session.set('categoryCollection', categories);

        return true;
    }
});