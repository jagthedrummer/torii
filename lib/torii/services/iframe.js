import UiServiceMixin from 'torii/mixins/ui-service-mixin';

var on = Ember.on;

var Iframe = Ember.Object.extend(Ember.Evented, UiServiceMixin, {

  // Open an iframe window.
  openRemote: function(url, pendingRequestKey, options){
    this.remote = Ember.$('<iframe src="'+url+'" id="torii-iframe"></iframe>'); //window.open(url, pendingRequestKey, optionsString);
    Ember.$('body').append(this.remote);
  },

  closeRemote: function(){
    this.remote.remove();
  },

  cleanUp: function(){
    
  }

});

export default Iframe;
