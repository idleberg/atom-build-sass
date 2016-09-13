# build-sass

[![apm](https://img.shields.io/apm/l/build-sass.svg?style=flat-square)](https://atom.io/packages/build-sass)
[![apm](https://img.shields.io/apm/v/build-sass.svg?style=flat-square)](https://atom.io/packages/build-sass)
[![apm](https://img.shields.io/apm/dm/build-sass.svg?style=flat-square)](https://atom.io/packages/build-sass)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-sass.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-sass)
[![David](https://img.shields.io/david/idleberg/atom-build-sass.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-sass#info=dependencies)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-sass.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-sass?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `sass`, compiles Sass/SCSS into CSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

If you prefer LibSass, take note of the separate [build-sassc](https://atom.io/packages/build-sassc) package. When in doubt, consult the [Sass Compatibility](http://sass-compatibility.github.io/) chart.

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-build-sass/master/screenshot.png)

*See the linter in action*

## Installation

### apm

Install `build-sass` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-sass`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-sass`:

```bash
$ git clone https://github.com/idleberg/atom-build-sass build-sass
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `Sass [compact|compressed|expanded]`
* `Watch Sass [compact|compressed|expanded]`
* `SCSS [compact|compressed|expanded]`
* `Watch SCSS [compact|compressed|expanded]`

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

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-sass) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
