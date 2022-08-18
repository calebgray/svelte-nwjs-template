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
npm run rename -- "My Cool Project Name" my-cool-executable-name com.calebgray.my-cool-project
```
OR: Set your own `package.json` package name.
```shell
npm run rename -- "My Cool Project Name" my-cool-executable-name com.calebgray.my-cool-project cool-package-name
```
OR: Run in interactive mode, pipe values in through stdin, etc.
```shell
npm run rename
```


## Branding
1. Replace the template icons with your own branding in the `src/public` directory.
2. Update your app's copyright notice: `npm run set-copyright -- "© 2022 Caleb Gray"`


## Versioning
`npm run set-version -- 1.0.0` # set the version for your app/package


## Development (browser)
`npm run check` # run syntax/sanity checks

`npm run dev` # watch and (re)build sources


## Production (browser and native application)

`npm run build` # build production sources

`npm run preview` # run last build in a browser

`npm run start` # run last build as a native app


## Building
`npm run dist` # create cross-platform executables out of last build

`npm run bundle` # bundle each executable into an installer
