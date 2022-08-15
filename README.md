# svelte-nwjs-template
Freshly-baked desktop application template powered by NW.js and Svelte.

This template even rebrands itself at the lowest level, to give your app that fully native feel.


## Bootstrapping
Clone repo into *YOUR* desired `project-name` and `cd` to its path.
```shell
git clone https://github.com/calebgray/svelte-nwjs-template.git project-name
cd project-name
```
Install template dependencies.
```shell
npm install
```
Rename the template to your project's names.
```shell
npm run rename -- "My Cool Project Name" "my-cool-executable-name"
```
OR: Set your own `package.json` package name.
```shell
npm run rename -- "My Cool Project Name" "my-cool-executable-name" "package-name"
```
OR: Run in interactive mode, pipe values in through stdin, etc.
```shell
npm run rename
```


## Branding
Replace the template icons with your own branding in the `src/public` directory.


## Development
`npm run check` # run syntax/sanity checks

`npm test` # run app in a browser with live reload

`npm run dev` # watch and (re)build sources

`npm run preview` # run a test HTTP server

`npm run build` # build sources

`npm run start` # run last build as a native app


## Versioning
`npm run set-version -- 1.0.0` # set the version for your app/package


## Building
`npm run dist` # create cross-platform executables

`npm run bundle` # bundle each executable into a branded installer
