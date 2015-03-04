Shortly.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '':       'index',
    'myLinks': 'privateLinks',
    'create': 'create'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView({ collection: links });
    this.swapView(linksView);
  },

  privateLinks: function() {
    var links = new Shortly.PrivateLinks();
    console.log('in backbone route for plink', links);
    if (!links.models[0].get('notLoggedIn')) {
      var linksView = new Shortly.LinksView({ collection: links });
      this.swapView(linksView);
    } else {
      this.router.navigate('/login');
    }
  },

  create: function(){
    this.swapView(new Shortly.createLinkView());
  }
});
