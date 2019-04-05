
export default class Loader {
  /**
   * This function will load the sites defined in the config.
   * @param config - the configuration object which specifies all the micro sites to load.
   * @param document - the browser document object
   * @returns {Promise<void>}
   * @description
   *
   * config file definition:
   * {
   *  "micro site name":
   *    {
   *      mountPoint: 'html element id',
   *      baseUrl: 'base path to where the script assets are stored',
   *      manifest: 'the name of the micro site's manifest file'
   *     }
   *   }
   */
  async loadSites(config = {}, document) {
    console.log('loadSites called.', config, document);
    window.__MICROSITE__.config = config;
    let sitesToMount = 0;

    // for each site in config, load and process manifest
    for(let site in config) {
      sitesToMount++;
      console.log('load site:', site);
      console.log(config[site]);
      const siteConfig = config[site];
      const resp = await fetch(`${siteConfig.baseUrl}/${siteConfig.manifest}`);
      const manifest = await resp.json();
      console.log('manifest:', manifest);

      for(let asset in manifest) {
        const assetUrl = `${siteConfig.baseUrl}/${manifest[asset]}`;
        console.log(`adding asset '${assetUrl}' to document.`);
        this.insertSiteResource(document, 'script', assetUrl, config[site].mountPoint);
      }
    }

    console.log('loadSites done..', window.__MICROSITE__.sitesToMount);

    // for(let siteMount of window.__MICROSITE__.sitesToMount) {
    //   console.log('calling siteMount:', siteMount);
    //   siteMount(document.querySelector(`#notification-app`), { test: 'hello' });
    // }

    //window.__MICROSITE__.sitesToMount[0](document.querySelector(`#notification-app`), { test: 'hello' });
    let watchTimeout = new Date().getTime() + (5 * 1000);

    const interval = setInterval(() => {
      while (window.__MICROSITE__.sitesToMount.length > 0) {
        window.__MICROSITE__.sitesToMount[0](document.querySelector(`#notification-app`), { test: 'hello' });
        window.__MICROSITE__.sitesToMount.shift();
        sitesToMount--;
      }

      if (sitesToMount === 0 ||
          new Date().getTime() > watchTimeout) {
        clearInterval(interval);
        if (sitesToMount === 0) {
          console.log('all sites mounted.');
        } else {
          console.warn('site mount watcher timed out');
        }
      }
    }, 10);
  }

  insertSiteResource(document, tag, source, mountPoint) {
    const scriptTag = document.createElement(tag),
      firstScriptTag = document.getElementsByTagName(tag)[0];
    scriptTag.src = source + '?mountPoint=' + mountPoint;
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  }
}

if (window) {
  if (!window.__MICROSITE__) window.__MICROSITE__ = {};
    const microsite = window.__MICROSITE__;

  microsite.Loader = new Loader();
  microsite.mounter = (function(mount) {
    mount();
  });
  microsite.sitesToMount = [];
}

