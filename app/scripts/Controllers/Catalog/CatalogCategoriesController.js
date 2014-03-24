Webster.CatalogCategoriesController = Ember.ArrayController.extend({
    categoryImage: function(){
        var category = Webster.Session.get('category');
        if(category){
            return category.image;
        }
    }.property('Webster.Session.category'),

    productsGrid: function(){
        var rowSize = 4, chunks;
        var products = Webster.Session.get('productCollection');
        if(products){
            chunks = products.chunk(rowSize);
        }
        return chunks;

    }.property('Webster.Session.productCollection')
});