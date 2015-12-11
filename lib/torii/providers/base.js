import requiredProperty from 'torii/lib/required-property';

var computed = Ember.computed;

/**
 * The base class for all torii providers
 * @class BaseProvider
 */
var Base = Ember.Object.extend({

 /**
  * The name of the provider
  * @property {string} name
  */
  name: requiredProperty(),

  /**
   * The name of the configuration property
   * that holds config information for this provider.
   * @property {string} configNamespace
   */
  configNamespace: computed('name', function(){
    return 'providers.'+this.get('name');
  }),

  remoteServiceName: 'popup',

  popup: computed('remoteServiceName', function(){
    console.log('wtf', this.get('remoteServiceName'));
    var remoteServiceName = this.get('remoteServiceName') + 'Service';
    console.log('we are getting the service for ' + remoteServiceName);
    return this.get(remoteServiceName);
  })


});

export default Base;
