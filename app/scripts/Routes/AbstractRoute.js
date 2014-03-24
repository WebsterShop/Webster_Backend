Webster.AbstractRoute = Ember.Route.extend({
    beforeModel: function(transition){
        if(!Webster.Socket.get('online')){
            console.log('not online, going back to start');
            transition.abort;
            Webster.Session.set('transition', transition);
            this.transitionTo('start');
        }
    }
});