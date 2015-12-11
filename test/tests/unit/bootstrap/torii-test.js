import toriiContainer from 'test/helpers/torii-container';

var container, registry;

module("boostrapTorii", {
  teardown: function(){
    Ember.run(container, 'destroy');
    registry = container = null;
    window.DS = null;
  }
});

test("inject popupService onto providers", function(){
  var results = toriiContainer();
  registry = results[0];
  container = results[1];
  registry.register('torii-provider:foo', Ember.Object.extend());
  ok(container.lookup('torii-provider:foo').get('popupService'), 'Popup Service is set');
});

test("inject iframeService onto providers", function(){
  var results = toriiContainer();
  registry = results[0];
  container = results[1];
  registry.register('torii-provider:foo', Ember.Object.extend());
  ok(container.lookup('torii-provider:foo').get('iframeService'), 'Popup Service is set');
});

test("inject legacy DS store onto providers, adapters", function(){
  window.DS = {}; // Mock Ember-Data

  var results = toriiContainer(function(registry, container) {
    registry.register('store:main', Ember.Object.extend());
  });
  registry = results[0];
  container = results[1];

  registry.register('torii-provider:foo', Ember.Object.extend());
  var provider = container.lookup('torii-provider:foo');
  ok(provider.get('store'), 'Store is set on providers');

  registry.register('torii-adapter:foo', Ember.Object.extend());
  var adapter = container.lookup('torii-adapter:foo');
  ok(adapter.get('store'), 'Store is set on adapters');
});

test("inject DS store onto providers, adapters", function(){
  window.DS = {}; // Mock Ember-Data

  var results = toriiContainer(function(registry, container) {
    registry.register('service:store', Ember.Service.extend());
  });
  registry = results[0];
  container = results[1];

  registry.register('torii-provider:foo', Ember.Object.extend());
  var provider = container.lookup('torii-provider:foo');
  ok(provider.get('store'), 'Store is set on providers');

  registry.register('torii-adapter:foo', Ember.Object.extend());
  var adapter = container.lookup('torii-adapter:foo');
  ok(adapter.get('store'), 'Store is set on adapters');
});
