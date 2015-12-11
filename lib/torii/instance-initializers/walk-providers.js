import configuration from 'torii/configuration';
import { lookup } from 'torii/lib/container-utils';

export default {
  name: 'torii-walk-providers',
  initialize: function(applicationInstance){
    // Walk all configured providers and eagerly instantiate
    // them. This gives providers with initialization side effects
    // like facebook-connect a chance to load up assets.
    for (var key in  configuration.providers) {
      if (configuration.providers.hasOwnProperty(key)) {
        var provider = lookup(applicationInstance, 'torii-provider:'+key);

        var provider_config = configuration.providers[key];
        console.log('trying for provider ', key, provider);
        console.log('default config name = ', configuration.remoteServiceName);
        console.log('provider config name = ', provider_config.remoteServiceName);
        var defaultServiceName = configuration.remoteServiceName || 'popup';
        var providerServiceName = provider_config.remoteServiceName || defaultServiceName;
        console.log('providerServiceName',providerServiceName);
        if(providerServiceName !== 'popup'){
          console.log('setting the provider name to be', providerServiceName);
          //provider.set('popup', lookup(applicationInstance, 'torii-service:'+provider_config.remoteServiceName));
          provider.set('remoteServiceName', providerServiceName);
          console.log('now the value = ',provider.get('remoteServiceName'));
        }
      }
    }

  }
};
