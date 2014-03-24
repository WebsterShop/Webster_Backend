Webster.CatalogProductsController = Ember.ArrayController.extend({
    products: function(){
        return Webster.Session.get('productCollection');
    }.property('Webster.Session.productCollection')
});