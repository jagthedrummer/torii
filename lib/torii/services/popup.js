import ServicesMixin from 'torii/mixins/services-mixin';

var on = Ember.on;

var Popup = Ember.Object.extend(Ember.Evented, ServicesMixin, {

  // Open a popup window.
  openImpl : function(url, pendingRequestKey, optionsString){
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
