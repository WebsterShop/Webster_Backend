Webster.CatalogProductsRoute = Webster.AbstractRoute.extend({
    setupController: function(controller){
        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'getAll'});
        console.log('catalog product route');
    }
});