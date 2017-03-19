# bayeslayers: Unofficial prototype GUI for integrating Netica into OpenLayers
Bayeslayers provides a rough integration of Netica inference capability into OpenLayers interface using [gonetica](https://github.com/slee21/gonetica).
Monash Undergraduate Research Projects Abroad (MURPA) report and non-source code artefacts. The artefacts are grouped by project into directories.

## Compiled webapp download
The compiled webapp is available for download at the bayeslayers Github [releases](https://github.com/slee21/bayeslayers/releases) page.

## Compiling the Source Code
### Requirements
* npm
* `$npm install webpack --save`
* `$npm install mithril --save`
* `$npm install openlayers --save`

### Instructions
Clone the repository:
`$git clone https://github.com/slee21/bayeslayers.git`

Navigate into the cloned repository directory.

Compile the source javascript modules into the final javascript application:
`$webpack src/index.js bin/app.js`

## Running the Webapp
The compiled webapp assumes [Gonetica](https://github.com/slee21/gonetica) gncli running locally with default configuration.

Open `index.html` in the browser.
