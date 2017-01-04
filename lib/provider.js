'use babel';

import { EventEmitter } from 'events';
import { execSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
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
  projectEligibility: {
    title: 'Project Eligibility',
    description: 'Only activate targets when project contains files eligible for this build provider. Note that this can slow down startup time significantly!',
    type: 'boolean',
    default: false,
    order: 2
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 3
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get('build-sass.manageDependencies') && !atom.inSpecMode()) {
    this.satisfyDependencies();
  }
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
      atom.config.observe('build-sass.projectEligibility', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Sass';
    }

    isEligible() {
      try {
        execSync('sass --version');
      } catch (error) {
        console.error(meta.name, error);
        return false;
      }

      if (atom.config.get('build-sass.projectEligibility') === true) {
        return this.isProjectEligible(['sass', 'scss']);
      }

      return true;
    }

    isProjectEligible(fileTypes) {
      const globby = require('globby');
      const path = require('path');

      if (typeof fileTypes === 'string') {
        fileTypes = [fileTypes];
      }

      const projectDirs = atom.project.getPaths();
      const globPattern = [];

      for (let i = 0; i < projectDirs.length; i++) {
        fileTypes.forEach(function (fileType) {
          globPattern.push(path.join(projectDirs[i], '**/*.' + fileType));
        });
      }

      const options = {
        'cache': true
      };

      const paths = globby.sync(globPattern, options);

      if (paths.length > 0) {
        return true;
      }

      return false;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      // User settings
      const customSassArguments = atom.config.get('build-sass.customSassArguments').trim().split(' ');
      const customScssArguments = atom.config.get('build-sass.customScssArguments').trim().split(' ');

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
