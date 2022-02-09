# Author Loki
Security tool developed to circumvent Author Profiling techniques that are increasingly being used across the internet. This tool is a response to the commonly used workflow which involves creating accounts at cloud services and exposing yourself and your content to the clear net.

The best practice is to preform this offline, but as far as I'm aware there are no tools available that work out-of-the-box. Likely this is due to there not being great offline translation applications available and most of the translation ML models are closed-source and kept trade secrets.

There is however, [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate). This is pretty bulky, but it'll get the job done for us. 

# Usage
First, we need a [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) instance available to us. The quickest way to do this, at least for me during development is Docker
```bash
docker run -ti --rm -p 5000:5000   libretranslate/libretranslate --load-only en,fr,es --disable-web-ui true
```

Once that's up and running, do the usual npm shit:
```bash
npm install
npm start
```

# Safety Checklist
 - [ ] Expanded all acronyms
 - [ ] Only used built-in dictionary, no custom added words to circumvent spell checking
 - [ ] Minimized punctuation
 - [ ] Used no 'slang' words

# Project Goals
 - [ ] Complete offline functionality
 - [ ] Easily transfer installation media to air-gapped system
 - [ ] Obviously, completely circumvent author profile analysis methods

## Features
Potentially things to build in the future if anyone ever cares about this.
 - [ ] Save configuration profiles and switch between them for different online identities
 - [ ] Configure through UI
 - [ ] Cache configuration settings somewhere




## Configuration
All configuration can be achieved through environment variables. Eventually this should be extended to allow configuration via the UI.

| Variable | Default |
| --- | --- |
| npm_config_LIBRE_TRANSLATE_ENDPOINT |  `http://localhost:5000` |

# TODO
 - [ ] Configure translation steps
 - [ ] Refactor UI to be more pretty
 - [ ] Make proper build outputs
 - [ ] Deploy hosted version for people who just want to use it online. Deploy it somewhere without logging.