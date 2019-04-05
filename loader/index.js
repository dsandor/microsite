
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

    // for each site in config, load and process manifest
    for(let site in config) {
      console.log('load site:', site);
      console.log(config[site]);
      const siteConfig = config[site];
      const resp = await fetch(`${siteConfig.baseUrl}/${siteConfig.manifest}`);
      const manifest = await resp.json();
      console.log('manifest:', manifest);

      for(let asset in manifest) {
        const assetUrl = `${siteConfig.baseUrl}/${manifest[asset]}`;
        console.log(`adding asset '${assetUrl}' to document.`);
        this.insertSiteResource(document, 'script', assetUrl);
      }
    }

    console.log('loadSites done.');
  }

  insertSiteResource(document, tag, source) {
    const scriptTag = document.createElement(tag),
      firstScriptTag = document.getElementsByTagName(tag)[0];
    scriptTag.src = source;
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  }
}

if (window) {
  if (!window.__MICROSITE__) window.__MICROSITE__ = {};
  window.__MICROSITE__.Loader = new Loader();
  window.__MICROSITE__.mounter = (function(mount) {
    mount();
  });
}

