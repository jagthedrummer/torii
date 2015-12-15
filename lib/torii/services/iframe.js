import UiServiceMixin from 'torii/mixins/ui-service-mixin';
import UUIDGenerator from 'torii/lib/uuid-generator';

var on = Ember.on;

var Iframe = Ember.Object.extend(Ember.Evented, UiServiceMixin, {

  openRemote: function(url, pendingRequestKey, options){
    this.remote = Ember.$('<iframe src="'+url+'" id="torii-iframe"></iframe>');
    var iframeParent = '.torii-iframe-placeholder';
    Ember.$(iframeParent).append(this.remote);
  },

  closeRemote: function(){
    this.remote.remove();
  },

  pollRemote: function(){
    if (Ember.$('#torii-iframe').length === 0) {
      this.trigger('didClose');
    }
  }

});

export default Iframe;
