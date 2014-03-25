Webster.CatalogProductRoute = Webster.AbstractRoute.extend({
    setupController: function(controller, model){
        var productId = model.id;
        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'get', 'content': {'product_id': productId}});
        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Category', 'action': 'getAll'});
        console.log('catalog product route');
    }
});