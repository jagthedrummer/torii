import UiServiceMixin from 'torii/mixins/ui-service-mixin';

var on = Ember.on;

var Popup = Ember.Object.extend(Ember.Evented, UiServiceMixin, {

  // Open a popup window.
  openRemote: function(url, pendingRequestKey, optionsString){
    this.remote = window.open(url, pendingRequestKey, optionsString);
  },

  close: function(){
    if (this.remote) {
      this.remote = null;
      this.trigger('didClose');
    }
  }

});

export default Popup;
