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
                if(jQuery.inArray(categories[i].id, product.categories) >= 0){
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
            var productCategories = [];
            for(i = 0; i < categories.length; i++){
                if(categories[i].checked){
                    productCategories.addObject(categories[i].id);
                }
            }

            Webster.MessageProcessor.processOutgoing({'type': 'Catalog\\Product', 'action': 'save', 'content': {
                'id': this.get('product').id,
                'name': this.get('product').name,
                'description': this.get('product').description,
                'price': this.get('product').price,
                'inventory': this.get('product').inventory,
                'image': this.get('product').image,
                'categories': productCategories
            }});
        }
    }
});