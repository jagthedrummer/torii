import toriiContainer from 'test/helpers/torii-container';
import BaseProvider from 'torii/providers/base';
import IframeService from 'torii/services/iframe';
import PopupService from 'torii/services/popup';
import configuration from 'torii/configuration';

var container, registry, FooProvider;

module("boostrapTorii", {
  setup: function() {
    FooProvider = BaseProvider.extend({
      name: 'foo'
    });
  },
  teardown: function() {
    Ember.run(container, 'destroy');
    registry = container = null;
    FooProvider = null;
    window.DS = null;
    delete configuration.remoteServiceName;
    delete configuration.providers.foo;
  }
});

test("default popup on providers", function(){
  var results = toriiContainer();
  registry = results[0];
  container = results[1];
  registry.register('torii-provider:foo', FooProvider);
  var popup = container.lookup('torii-provider:foo').get('popup');
  ok(popup, 'Popup is set');
  ok(popup instanceof PopupService, 'Popup service is popup');
});

test("configured default popup", function(){
  configuration.remoteServiceName = 'iframe';
  var results = toriiContainer();
  registry = results[0];
  container = results[1];
  registry.register('torii-provider:foo', FooProvider);
  var popup = container.lookup('torii-provider:foo').get('popup');
  ok(popup, 'Popup is set');
  ok(popup instanceof IframeService, 'Popup service is iframe');
});

test("configured popup on providers", function(){
  configuration.providers.foo = {
    remoteServiceName: 'iframe'
  };
  var results = toriiContainer();
  registry = results[0];
  container = results[1];
  registry.register('torii-provider:foo', FooProvider);
  var popup = container.lookup('torii-provider:foo').get('popup');
  ok(popup, 'Popup is set');
  ok(popup instanceof IframeService, 'Popup service is iframe');
});

test("inject legacy DS store onto providers, adapters", function(){
  window.DS = {}; // Mock Ember-Data

  var results = toriiContainer(function(registry, container) {
    registry.register('store:main', Ember.Object.extend());
  });
  registry = results[0];
  container = results[1];

  registry.register('torii-provider:foo', FooProvider);
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

  registry.register('torii-provider:foo', FooProvider);
  var provider = container.lookup('torii-provider:foo');
  ok(provider.get('store'), 'Store is set on providers');

  registry.register('torii-adapter:foo', Ember.Object.extend());
  var adapter = container.lookup('torii-adapter:foo');
  ok(adapter.get('store'), 'Store is set on adapters');
});
