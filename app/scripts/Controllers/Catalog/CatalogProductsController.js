Webster.CatalogProductsController = Ember.ObjectController.extend({
    products: function(){
        return Webster.Session.get('productCollection');
    }.property('Webster.Session.productCollection'),

    actions: {
        new: function(){
            this.transitionToRoute('catalog.product', null);
        }
    }
});