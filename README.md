# Author Loki
A security tool to quickly circumvent Author Profiling techniques.


# Usage
Run a [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) container for the app to connect to:
```bash
docker run --rm -p 5000:5000   libretranslate/libretranslate \
   --load-only en,fr,es --disable-web-ui true 
```

Run the application:
```bash
$ git clone https://github.com/salmonsec/AuthorLoki && cd AuthorLoki
$ npm install && npm start
```

## Safety Checklist
To maximize the effectiveness, run through this checklist:
 - [ ] Expanded all acronyms
 - [ ] Only used built-in dictionary, no custom added words to circumvent spell checking
 - [ ] Minimized punctuation
 - [ ] Used no 'slang' words


# Roadmap
 - [ ] Complete offline functionality
 - [ ] Easily transfer installation media to air-gapped system
 - [ ] Save configuration profiles and switch between them for different online identities
 - [ ] Configure through UI
 - [ ] Configure translation steps
 - [ ] Deploy hosted version for people who just want to use it online. Deploy it somewhere without logging.
