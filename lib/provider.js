'use babel';

const self = '[build-sass] ';
const debug = atom.config.get('build-sass.debug');

import {exec} from 'child_process';

export function provideBuilder() {
  return class SassProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Sass';
    }

    isEligible() {
      exec('sass --version', function (error, stdout, stderr) {
        if (error !== null) {
          if (debug === true) console.log(self + error);
          // No sass installed
          return false;
        }
        if (debug === true) console.log(self + stdout);
      });
      // Let's go!
      return true;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

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
          name: 'SCSS',
          exec: 'sass',
          args: [ '--scss', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'scss:compile',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compact)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compact', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'scss:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (compressed)',
          exec: 'sass',
          args: [ '--scss', '--style', 'compressed', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.min.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'scss:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'SCSS (expanded)',
          exec: 'sass',
          args: [ '--scss', '--style', 'expanded', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'scss:compile-expanded',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
