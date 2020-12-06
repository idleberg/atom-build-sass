'use babel';

import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';
import meta from '../package.json';

export { configSchema as config };

export function provideBuilder() {
  return class SassProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-sass.customSassArguments', () =>
        this.emit('refresh')
      );
      atom.config.observe('build-sass.customScssArguments', () =>
        this.emit('refresh')
      );
    }

    getNiceName() {
      return 'Sass';
    }

    isEligible() {
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), [getConfig('pathToSass')]);
      if (!cmd.stdout?.toString()?.length) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      const pathToSass = getConfig('pathToSass') || 'sass';
      const customSassArguments = getConfig('customSassArguments')
        .trim()
        .split(' ');
      const customScssArguments = getConfig('customScssArguments')
        .trim()
        .split(' ');

      return [
        {
          name: 'SCSS',
          exec: pathToSass,
          args: ['--scss', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compact)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'compact',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compressed)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'compressed',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.min.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (expanded)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'expanded',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (user)',
          exec: pathToSass,
          args: customScssArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:compile-with-user-settings',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS',
          exec: pathToSass,
          args: [
            '--scss',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (compact)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'compact',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (compressed)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'compressed',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.min.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Watch SCSS (expanded)',
          exec: pathToSass,
          args: [
            '--scss',
            '--style',
            'expanded',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'SCSS:watch-and-compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'Sass',
          exec: pathToSass,
          args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (compact)',
          exec: pathToSass,
          args: [
            '--style',
            'compact',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (compressed)',
          exec: pathToSass,
          args: [
            '--style',
            'compressed',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.min.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (expanded)',
          exec: pathToSass,
          args: [
            '--style',
            'expanded',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'Sass (user)',
          exec: pathToSass,
          args: customSassArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:compile-with-user-settings',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass',
          exec: pathToSass,
          args: ['--watch', '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (compact)',
          exec: pathToSass,
          args: [
            '--style',
            'compact',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (compressed)',
          exec: pathToSass,
          args: [
            '--style',
            'compressed',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.min.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Sass (expanded)',
          exec: pathToSass,
          args: [
            '--style',
            'expanded',
            '--watch',
            '{FILE_ACTIVE}:{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sass:watch-and-compile-expanded',
          errorMatch: errorMatch
        }
      ];
    }
  };
}

// This package depends on build, make sure it's installed
export async function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
