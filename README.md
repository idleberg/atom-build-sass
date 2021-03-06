# build-sass

[![apm](https://flat.badgen.net/apm/license/build-sass)](https://atom.io/packages/build-sass)
[![apm](https://flat.badgen.net/apm/v/build-sass)](https://atom.io/packages/build-sass)
[![apm](https://flat.badgen.net/apm/dl/build-sass)](https://atom.io/packages/build-sass)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-sass)](https://circleci.com/gh/idleberg/atom-build-sass)
[![David](https://flat.badgen.net/david/dev/idleberg/atom-build-sass)](https://david-dm.org/idleberg/atom-build-sass?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `sass`, compiles SCSS (and Sass) into CSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

If you prefer LibSass, take note of the separate [build-sassc](https://atom.io/packages/build-sassc) package. When in doubt, consult the [Sass Compatibility](http://sass-compatibility.github.io/) chart.

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-build-sass/master/screenshot.png)

*See the linter in action*

## Installation

### apm

Install `build-sass` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-sass`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone repository as `build-sass`:

```bash
$ git clone https://github.com/idleberg/atom-build-sass build-sass
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

You should now be setup to build the package:

```bash
$ yarn build || npm run build
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `SCSS [compact|compressed|expanded|user]`
* `Watch SCSS [compact|compressed|expanded]`
* `Sass [compact|compressed|expanded|user]`
* `Watch Sass [compact|compressed|expanded]`

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE).
