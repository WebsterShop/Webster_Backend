Webster.StartRoute = Ember.Route.extend({
    setupController: function() {
        var _this = this;
        console.log('start route oida');

        // subscribe to authenticated event
        Ember.Instrumentation.subscribe("signal.connected", {
            before: function() {
                var transitionTarget = 'catalog';
                var params = null;
                if(Webster.Session.get('transition')){
                    transition = Webster.Session.get('transition');
                    transitionTarget = transition.targetName;
                    params = transition.params;
                    Webster.Session.set('transition', null);
                }
                console.log('before transition to ' + transitionTarget);
                if(!jQuery.isEmptyObject(params)){
                    _this.transitionTo(transitionTarget, params);
                } else {
                    _this.transitionTo(transitionTarget);
                }
            },
            after: function() {}
        });
    }
});