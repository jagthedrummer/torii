import UiServiceMixin from 'torii/mixins/ui-service-mixin';

var on = Ember.on;

var Iframe = Ember.Object.extend(Ember.Evented, UiServiceMixin, {

  // Open an iframe window.
  openRemote: function(url, pendingRequestKey, optionsString){
    this.remote = Ember.$('<iframe src="'+url+'" id="torii-iframe"></iframe>'); //window.open(url, pendingRequestKey, optionsString);
    Ember.$('body').append(this.remote);
  },

  close: function(){
    if (this.remote) {
      this.remote.remove();
      this.remote = null;
      this.trigger('didClose');
    }
  }

});

export default Iframe;
