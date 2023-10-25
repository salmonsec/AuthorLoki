# Author Loki
A security tool to quickly circumvent Author Profiling techniques.


# Usage
Run a [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) container
```bash
docker run --rm -p 5000:5000   libretranslate/libretranslate \
   --load-only en,fr,es --disable-web-ui true 
```


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

## Features
Potentially things to build in the future if anyone ever cares about this.
 - [ ] Save configuration profiles and switch between them for different online identities
 - [ ] Configure through UI

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
