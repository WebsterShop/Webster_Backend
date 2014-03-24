/**
 * Global route mapping
 */
Webster.Router.map(function () {
    this.resource('start', {path: '/'}),
    this.resource('catalog', function(){
        this.route('categories'),
        this.route('products'),
        this.route('product', {path: 'product/:id'})
    });
});