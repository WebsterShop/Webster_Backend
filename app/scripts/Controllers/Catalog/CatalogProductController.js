Webster.CatalogProductController = Ember.ObjectController.extend({
    product: function(){
        if(Webster.Session.get('productCollection')){
            return Webster.Session.get('productCollection').objectAt(0);
        }
    }.property('Webster.Session.productCollection'),

    isEditing: false,

    actions: {
        edit: function(){
            this.set('isEditing', true);
        },
        save: function(){
            Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'save', 'content': {
                'id': this.get('product').id,
                'name': this.get('product').name,
                'description': this.get('product').description,
                'price': this.get('product').price,
                'inventory': this.get('product').inventory,
                'image': this.get('product').image
            }});
            this.set('isEditing', false);
        }
    }
});