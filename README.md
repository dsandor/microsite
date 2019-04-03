# microsite

This repo is an exploration into Micro-Site front end architecture with React. I will create branches with various evolutions of the code and for simple experimentation.

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


