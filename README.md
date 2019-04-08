# microsite

This repo is an exploration into Micro-Site front end architecture with React. I will create branches with various evolutions of the code and for simple experimentation.

## Prerequisites

Install **[yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)**.

Install **[http-server](https://github.com/indexzero/http-server#readme)**.

## Installing and getting everything running

To get this all working you can do the following:

**From the root folder:**

```sh
cd main-app
yarn insall

cd ../notification-app
yarn install

cd ../loader
yarn install

cd ..
./start.sh
```

That should install all the dependencies for all 3 parts of the app and start the servers.

## Branch Notes

### 01-Component
This branch has `notification-app` as a component that is `npm link'ed` into the main-app. This describes how you can create a modular component for inclusion into multiple front ends or composed into other components.

#### Principles

* Build an npm module for a core piece of code that is composed in multiple other components.
* Can be used to deploy higher order views such as an entire page. But care must be taken when choosing this method as the delivery mechanism for a large section of a front end as it requires versioning and re-deployment of the npm module and is hard-linked into the main app.

Reference: [https://codeburst.io/extracting-a-react-js-component-and-publishing-it-on-npm-2a49096757f5](https://codeburst.io/extracting-a-react-js-component-and-publishing-it-on-npm-2a49096757f5)

### 02-Loose-Coupled-Component

This branch loosens up the coupling so that all that is needed is a script tag and a ```<div>```. 

There is still some hard coding here.  Things that need to be made dynamic:

1. The script tag should be configurable so that it supports a dev environment and a production environment. Key things here will be:
	* knowing when it is a dev environment
	* configuring the prefix url
	* deal with webpack prefix variable
	* support rooted and non-rooted deployment so / or /some-app

2. we should be fetching the manifest and then dynamically loading the scripts.

#### Running the app

In the `notification-app` folder install by running:

```yarn```

Then start the webpack watcher:

```yarn start```

Then in the `main-app` folder do the same.

```yarn```

Then start the react app.

```yarn start```

### 03-expose-app-mount-in-script

This branch explores a react application exposed as a mountable component. The host page will use the `window.microsite.app_name.mount()` function to have the ReactDOM create the and mount the site onto the parent site.

Notes:

* Need to dynamically load the script.
* Need to find the scripts to attach to parent site by inspecting the manifest.
* Enumerate manifest to find scripts.
* Come up with a dynamic way of mounting the micro apps.

Start the loader script http host (this would be hosted on a CDN somewhere) or simply added to the same S3 location of the main app.

#### Port 9998 - The loader script.

From the `loader` project folder.

```sh
http-server -p 9998 -c 0 --cors build/
```

#### Port 9999 - The compiled notification-app.

From the `notification-app` project folder.

```sh
http-server -p 9999 -c 0 --cors build/
```

The following script tags are added in to the HTML of the main site.  This loads the loader script (webpack compiled output) and passes the configuration to the loader.

```html
  <script src="http://192.168.1.80:9998/index.js"></script>
  <script>
  
    if (!window.__MICROSITE__) {
      window.__MICROSITE__ = {};
    }
  
    var microSites = {
      'notification-app': {
        mountPoint: 'notification-app', // default, key name
        baseUrl: 'http://192.168.1.80:9999',
        manifest: 'manifest.json'
      }
    };
  
    window.__MICROSITE__.Loader.loadSites(microSites, document);
</script>
```

### 04-change-direction-of-mount

Before this branch the direction of the mount call was from the child app to the main app. This branch changes that so that the main app initializes/mounts the child app and can therefore send configuration data to the child app such as props or state. This will also allow the main app to send the child app the element to mount to. That will allow us to have multiple instances of the same child app on the main site in different locations.

So far, this is working. We can configure a single react app to be mounted in multiple divs so a single app is reusable.

We stamp the site with a uuid and pass that uuid in the script src url as a query string param that we parse app side to send back to the parent. (we need to use a url parser).

`props` can also be sent to the react app.

TODO: 

* Make the child react app side of this into a npm module that can just be included to simplify the process of making a react app into a child.
* Clean up the loader code.
* Make the part in the main app into an npm module so it can easily be added to any main app.

 
