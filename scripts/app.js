!function i(e,a,t){function r(n,s){if(!a[n]){if(!e[n]){var l="function"==typeof require&&require;if(!s&&l)return l(n,!0);if(o)return o(n,!0);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}var c=a[n]={exports:{}};e[n][0].call(c.exports,function(i){var a=e[n][1][i];return r(a?a:i)},c,c.exports,i,e,a,t)}return a[n].exports}for(var o="function"==typeof require&&require,n=0;n<t.length;n++)r(t[n]);return r}({1:[function(i,e,a){"use strict";var t=i("./data/projectList.js");!function(i){var e=i.querySelector("#app");e.projectList=t.projectList,e.baseUrl="/",""===window.location.port,e.displayInstalledToast=function(){Polymer.dom(i).querySelector("platinum-sw-cache").disabled||Polymer.dom(i).querySelector("#caching-complete").show()},e.addEventListener("dom-change",function(){}),window.addEventListener("WebComponentsReady",function(){})}(document)},{"./data/projectList.js":2}],2:[function(i,e,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.projectList=[{id:"bezierCurves",displayName:"Bezier Curves",description:"An exploration of Bezier Curves",thumbnail:"bezierCurves.jpg"},{id:"pixelWalk",displayName:"Pixel Walk",description:"Pixels go on a random walk.",thumbnail:"pixelWalk.jpg"},{id:"taylorApproximations",displayName:"Taylor Approximations",description:"Visualizing taylor approximation of a sinusoid.",thumbnail:"taylorApproximations.jpg"},{id:"imageWaterfall",displayName:"Image Waterfall",description:"A program that applies a waterfall effect to images",thumbnail:"imageWaterfall.jpg"},{id:"similarShapes",displayName:"Similar Shapes",description:"Querying a database with guestures.",thumbnail:"similarShapes.jpg"},{id:"shapeClassification",displayName:"Shape Classification",description:"Predictive shape classification.",thumbnail:"shapeClassification.jpg"},{id:"documentClassification",displayName:"Document Classification",description:"Naive Bayes with user generated content.",thumbnail:"documentClassification.jpg"},{id:"cubeBlaster",displayName:"Cube Blaster",description:"Blast shapes into planes!",thumbnail:"cubeBlaster.jpg"},{id:"augmentedEffects",displayName:"Augmented Effects",description:"Applying real-time effects to web-cam in the browser.",thumbnail:"augmentedEffects.jpg"},{id:"touchSynth",displayName:"Touch Synth",description:"Trigger an analog synth from a browser app.",thumbnail:"touchSynth.jpg"},{id:"colorScroll",displayName:"Color Scroll",description:"Scroll a web page using colors!",thumbnail:"colorScroll.jpg"},{id:"browserSampler",displayName:"Browser Sampler",description:"An audio sampler and granular synth with Web Audio API",thumbnail:"browserSampler.jpg"},{id:"matterOfScale",displayName:"Matter of Scale",description:"An interactive installation",thumbnail:"matterOfScale.jpg"},{id:"touchLib",displayName:"TouchLibJS",description:"An intuitive and responsive UI touch library for browsers.",thumbnail:"touchLib.jpg"},{id:"gaViz",displayName:"Genetic Algorithms",description:"Visualizing genetic optimization in continuous space.",thumbnail:"gaViz.jpg"},{id:"psoViz",displayName:"Visualizing Particle Swarm Algorithm",description:"Visualizing particle optimization in continuous space.",thumbnail:"psoViz.jpg"},{id:"particleRemix",displayName:"Particle Remix",description:"...",thumbnail:""}]},{}]},{},[1]);