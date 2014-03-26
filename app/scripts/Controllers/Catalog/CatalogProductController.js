Webster.CatalogProductController = Ember.ObjectController.extend({
    product: function(){
        if(Webster.Session.get('productCollection')){
            return Webster.Session.get('productCollection').objectAt(0);
        }
    }.property('Webster.Session.productCollection'),

    categories: function(){
        var categories = Webster.Session.get('categoryCollection');
        var product = this.get('product');
        if(categories && product){
            for(i = 0; i < categories.length; i++){
                if(jQuery.inArray(product.id, categories[i].products) >= 0){
                    categories[i].checked = true;
                } else {
                    categories[i].checked = false;
                }
            }
            return categories;
        }
    }.property('Webster.Session.categoryCollection'),

    actions: {
        save: function(){
            var categories = Webster.Session.get('categoryCollection');
            var productId = this.get('product').id;

            for(i = 0; i < categories.length; i++){
                var productIds = categories[i].products;

                if(categories[i].checked){
                    productIds.push(productId);
                } else {
                    for(j = 0; j < productIds.length; j++){
                        if(productIds[j] == productId){
                            productIds.splice(j, 1);
                        }
                    }
                }
                categories[i].products = jQuery.unique(productIds);
                Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Category', 'action': 'save', 'content': {
                    'id': categories[i].id,
                    'name': categories[i].name,
                    'products': categories[i].products,
                    'active': categories[i].active
                }});
            }

            Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'save', 'content': {
                'id': this.get('product').id,
                'name': this.get('product').name,
                'description': this.get('product').description,
                'price': this.get('product').price,
                'inventory': this.get('product').inventory,
                'image': this.get('product').image
            }});
        }
    }
});