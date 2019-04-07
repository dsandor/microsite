export default class Loader {
  constructor(manifestUrls = []) {
    this.manifestUrls = manifestUrls;
  }

  async loadManifests(manifestUrls = this.manifestUrls) {
    for(let manifestUrl of manifestUrls) {
      const resp = await fetch(manifestUrl);
      const json = await resp.json();

    }
  }
}