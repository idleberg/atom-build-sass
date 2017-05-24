'use babel';

import { EventEmitter } from 'events';
import { platform} from 'os';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

export const config = {
  customSassArguments: {
    title: 'Custom Sass Arguments',
    description: 'Specify your preferred arguments for Sass, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default: '--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
    order: 0
  },
  customScssArguments: {
    title: 'Custom SCSS Arguments',
    description: 'Specify your preferred arguments for SCSS, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default: '--scss --style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
    order: 1
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 2
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 3
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') === true) {
    this.satisfyDependencies();
  }
}

export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
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
      if (atom.config.get(meta.name + '.alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['sass']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      // User settings
      const customSassArguments = atom.config.get(meta.name + '.customSassArguments').trim().split(' ');
      const customScssArguments = atom.config.get(meta.name + '.customScssArguments').trim().split(' ');

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
          atomCommandName: 'sass:compile-with-user-settings',
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
          atomCommandName: 'SCSS:compile-with-user-settings',
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
