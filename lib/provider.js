'use babel';

import { install } from 'atom-package-deps';
import { execSync } from 'child_process';
import { EventEmitter } from 'events';

// Package settings
import meta from '../package.json';

this.config = {
  customSassArguments: {
    title: "Custom Sass Arguments",
    description: "Specify your preferred arguments for Sass",
    type: "string",
    "default": "--style compressed",
    order: 0
  },
  customScssArguments: {
    title: "Custom SCSS Arguments",
    description: "Specify your preferred arguments for SCSS",
    type: "string",
    "default": "--scss",
    order: 1
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class SassProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-sass.customSassArguments', () => this.emit('refresh'));
      atom.config.observe('build-sass.customScssArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Sass';
    }

    isEligible() {
      try {
        stdout = execSync('sass --version');
        if (atom.inDevMode()) atom.notifications.addInfo(meta.name, { detail: stdout, dismissable: false });
        return true;
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      // User settings
      const customSassArguments = atom.config.get('build-sass.customSassArguments').trim().split(" ");
      customSassArguments.push('{FILE_ACTIVE}');
      customSassArguments.push('{FILE_ACTIVE_NAME_BASE}.css');

      const customScssArguments = atom.config.get('build-sass.customScssArguments').trim().split(" ");
      customScssArguments.push('{FILE_ACTIVE}');
      customScssArguments.push('{FILE_ACTIVE_NAME_BASE}.css');

      return [
        {
          name: 'Sass',
          exec: 'sass',
          args: [ '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (compact)',
          exec: 'sass',
          args: [ '--style', 'compact', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (compressed)',
          exec: 'sass',
          args: [ '--style', 'compressed', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.min.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (expanded)',
          exec: 'sass',
          args: [ '--style', 'expanded', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (user)',
          exec: 'sass',
          args: customSassArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-user',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass',
          exec: 'sass',
          args: [ '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (compact)',
          exec: 'sass',
          args: [ '--style', 'compact', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (compressed)',
          exec: 'sass',
          args: [ '--style', 'compressed', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.min.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (expanded)',
          exec: 'sass',
          args: [ '--style', 'expanded', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS',
          exec: 'sass',
          args: [ '--scss', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compact)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compact', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compressed)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compressed', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.min.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (expanded)',
          exec: 'sass',
          args: [ '--scss', '--style', 'expanded', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (user)',
          exec: 'sass',
          args: customScssArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-user',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS',
          exec: 'sass',
          args: [ '--scss', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (compact)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compact', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (compressed)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compressed', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.min.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (expanded)',
          exec: 'sass',
          args: [ '--scss', '--style', 'expanded', '--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-expanded',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
