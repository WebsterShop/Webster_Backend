Webster.CatalogProductRoute = Webster.AbstractRoute.extend({
    setupController: function(controller, model){
        var productId = model.id;
        if(productId){
            Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'get', 'content': {'product_id': productId}});
        } else {
            var products = Ember.A();
            products.addObject(Webster.Product.create());
            Webster.Session.set('productCollection', products);
        }
        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Category', 'action': 'getAll'});
        console.log('catalog product route');
    }
});