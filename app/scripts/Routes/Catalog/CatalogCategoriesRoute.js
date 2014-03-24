//Webster.CatalogCategoriesRoute = Webster.AbstractRoute.extend({
//    setupController: function(controller, model){
//        var categoryId = model.id;
//        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Category', 'action': 'getAll', 'content': {'category_id': categoryId}});
//        Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'getAll', 'content': {'category_id': categoryId}});
//        console.log('catalog category route');
//    }
//});