* index.html - runs on the mobile device, displays the drawing gestures being generated via sender.html

* sender.html - has the Leap.loop code to receive the hand gestures and send the "strokes" out to any/all mobile devices via the Vert.x eventbus

* BridgeServer.java and ServerHook.java basically come straight from the Vert.x examples

* leap.js comes from Leap Motion - no alterations

The OpenShift `diy` cartridge documentation can be found at:

https://github.com/openshift/origin-server/tree/master/cartridges/openshift-origin-cartridge-diy/README.md
