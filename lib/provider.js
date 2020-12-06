module.exports = /******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = [
    /* 0 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ config: () =>
          /* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.configSchema,
        /* harmony export */ provideBuilder: () => /* binding */ provideBuilder,
        /* harmony export */ activate: () => /* binding */ activate,
        /* harmony export */
      });
      /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        4
      );
      /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        1
      );
      /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
        events__WEBPACK_IMPORTED_MODULE_1__
      );
      /* harmony import */ var atom_satisfy_dependencies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        9
      );
      /* harmony import */ var atom_satisfy_dependencies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
        atom_satisfy_dependencies__WEBPACK_IMPORTED_MODULE_2__
      );
      /* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        3
      );
      /* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
        child_process__WEBPACK_IMPORTED_MODULE_3__
      );
      /* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        13
      );
      /* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        8
      );
      ('use babel');

      function provideBuilder() {
        return class SasscProvider extends events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
          constructor(cwd) {
            super();
            this.cwd = cwd;
            atom.config.observe(
              `${_package_json__WEBPACK_IMPORTED_MODULE_5__.name}.customArguments`,
              () => this.emit('refresh')
            );
          }

          getNiceName() {
            return 'SassC';
          }

          isEligible() {
            var _cmd$stdout;

            if (
              (0, _config__WEBPACK_IMPORTED_MODULE_0__.getConfig)(
                'alwaysEligible'
              ) === true
            ) {
              return true;
            }

            const cmd = (0,
            child_process__WEBPACK_IMPORTED_MODULE_3__.spawnSync)(
              (0, _util__WEBPACK_IMPORTED_MODULE_4__.which)(),
              [
                (0, _config__WEBPACK_IMPORTED_MODULE_0__.getConfig)(
                  'pathToSass'
                ),
              ]
            );

            if (
              !(
                (_cmd$stdout = cmd.stdout) !== null &&
                _cmd$stdout !== void 0 &&
                _cmd$stdout.toString().length
              )
            ) {
              return false;
            }

            return true;
          }

          settings() {
            const errorMatch = [
              '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n',
            ];
            const pathToSass = (0,
            _config__WEBPACK_IMPORTED_MODULE_0__.getConfig)('pathToSass');
            const customArguments = (0,
            _config__WEBPACK_IMPORTED_MODULE_0__.getConfig)('customArguments')
              .trim()
              .split(' ');
            return [
              {
                name: 'SassC',
                exec: pathToSass,
                args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
                cwd: '{FILE_ACTIVE_PATH}',
                sh: false,
                atomCommandName: 'sassc:compile',
                errorMatch,
              },
              {
                name: 'SassC (compact)',
                exec: pathToSass,
                args: [
                  '--style',
                  'compact',
                  '{FILE_ACTIVE}',
                  '{FILE_ACTIVE_NAME_BASE}.css',
                ],
                cwd: '{FILE_ACTIVE_PATH}',
                sh: false,
                atomCommandName: 'sassc:compile-compact',
                errorMatch,
              },
              {
                name: 'SassC (compressed)',
                exec: pathToSass,
                args: [
                  '--style',
                  'compressed',
                  '{FILE_ACTIVE}',
                  '{FILE_ACTIVE_NAME_BASE}.min.css',
                ],
                cwd: '{FILE_ACTIVE_PATH}',
                sh: false,
                atomCommandName: 'sassc:compile-compressed',
                errorMatch,
              },
              {
                name: 'SassC (expanded)',
                exec: pathToSass,
                args: [
                  '--style',
                  'expanded',
                  '{FILE_ACTIVE}',
                  '{FILE_ACTIVE_NAME_BASE}.css',
                ],
                cwd: '{FILE_ACTIVE_PATH}',
                sh: false,
                atomCommandName: 'sassc:compile-compressed',
                errorMatch,
              },
              {
                name: 'SassC (user)',
                exec: pathToSass,
                args: customArguments,
                cwd: '{FILE_ACTIVE_PATH}',
                sh: false,
                atomCommandName: 'sassc:compile-with-user-settings',
                errorMatch,
              },
            ];
          }
        };
      } // This package depends on build, make sure it's installed

      async function activate() {
        if (
          (0, _config__WEBPACK_IMPORTED_MODULE_0__.getConfig)(
            'manageDependencies'
          ) === true
        ) {
          (0,
          atom_satisfy_dependencies__WEBPACK_IMPORTED_MODULE_2__.satisfyDependencies)(
            _package_json__WEBPACK_IMPORTED_MODULE_5__.name
          );
        }
      }

      /***/
    },
    /* 1 */
    /***/ (module) => {
      module.exports = require('events');

      /***/
    },
    /* 2 */
    /***/ (module) => {
      module.exports = require('os');

      /***/
    },
    /* 3 */
    /***/ (module) => {
      module.exports = require('child_process');

      /***/
    },
    /* 4 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ configSchema: () => /* binding */ configSchema,
        /* harmony export */ getConfig: () => /* binding */ getConfig,
        /* harmony export */
      });
      /* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        8
      );

      const configSchema = {
        pathToSass: {
          title: 'Path to Sass',
          description: 'Specify a custom path to the `sassc` binary',
          type: 'string',
          default: 'sassc',
          order: 0,
        },
        customArguments: {
          title: 'Custom Arguments',
          description:
            'Specify your preferred arguments for `sassc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
          type: 'string',
          default:
            '--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
          order: 1,
        },
        manageDependencies: {
          title: 'Manage Dependencies',
          description:
            'When enabled, third-party dependencies will be installed automatically',
          type: 'boolean',
          default: true,
          order: 2,
        },
        alwaysEligible: {
          title: 'Always Eligible',
          description:
            'The build provider will be available in your project, even when not eligible',
          type: 'boolean',
          default: false,
          order: 3,
        },
      };
      function getConfig(key) {
        return atom.config.get(
          `${_package_json__WEBPACK_IMPORTED_MODULE_0__.name}.${key}`
        );
      }

      /***/
    },
    /* 5 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });

      var os = __webpack_require__(2);
      var child_process = __webpack_require__(3);
      var fs = __webpack_require__(6);
      var path = __webpack_require__(7);

      function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e
          ? e
          : { default: e };
      }

      var os__default = /*#__PURE__*/ _interopDefaultLegacy(os);
      var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs);
      var path__default = /*#__PURE__*/ _interopDefaultLegacy(path);

      var indentString = (string, count = 1, options) => {
        options = {
          indent: ' ',
          includeEmptyLines: false,
          ...options,
        };

        if (typeof string !== 'string') {
          throw new TypeError(
            `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
          );
        }

        if (typeof count !== 'number') {
          throw new TypeError(
            `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
          );
        }

        if (typeof options.indent !== 'string') {
          throw new TypeError(
            `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
          );
        }

        if (count === 0) {
          return string;
        }

        const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

        return string.replace(regex, options.indent.repeat(count));
      };

      const extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
      const pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
      const homeDir =
        typeof os__default['default'].homedir === 'undefined'
          ? ''
          : os__default['default'].homedir();

      var cleanStack = (stack, options) => {
        options = Object.assign({ pretty: false }, options);

        return stack
          .replace(/\\/g, '/')
          .split('\n')
          .filter((line) => {
            const pathMatches = line.match(extractPathRegex);
            if (pathMatches === null || !pathMatches[1]) {
              return true;
            }

            const match = pathMatches[1];

            // Electron
            if (
              match.includes('.app/Contents/Resources/electron.asar') ||
              match.includes('.app/Contents/Resources/default_app.asar')
            ) {
              return false;
            }

            return !pathRegex.test(match);
          })
          .filter((line) => line.trim() !== '')
          .map((line) => {
            if (options.pretty) {
              return line.replace(extractPathRegex, (m, p1) =>
                m.replace(p1, p1.replace(homeDir, '~'))
              );
            }

            return line;
          })
          .join('\n');
      };

      const cleanInternalStack = (stack) =>
        stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, '');

      class AggregateError extends Error {
        constructor(errors) {
          if (!Array.isArray(errors)) {
            throw new TypeError(
              `Expected input to be an Array, got ${typeof errors}`
            );
          }

          errors = [...errors].map((error) => {
            if (error instanceof Error) {
              return error;
            }

            if (error !== null && typeof error === 'object') {
              // Handle plain error objects with message property and/or possibly other metadata
              return Object.assign(new Error(error.message), error);
            }

            return new Error(error);
          });

          let message = errors
            .map((error) => {
              // The `stack` property is not standardized, so we can't assume it exists
              return typeof error.stack === 'string'
                ? cleanInternalStack(cleanStack(error.stack))
                : String(error);
            })
            .join('\n');
          message = '\n' + indentString(message, 4);
          super(message);

          this.name = 'AggregateError';

          Object.defineProperty(this, '_errors', { value: errors });
        }

        *[Symbol.iterator]() {
          for (const error of this._errors) {
            yield error;
          }
        }
      }

      var aggregateError = AggregateError;

      var pMap = async (
        iterable,
        mapper,
        { concurrency = Infinity, stopOnError = true } = {}
      ) => {
        return new Promise((resolve, reject) => {
          if (typeof mapper !== 'function') {
            throw new TypeError('Mapper function is required');
          }

          if (
            !(
              (Number.isSafeInteger(concurrency) || concurrency === Infinity) &&
              concurrency >= 1
            )
          ) {
            throw new TypeError(
              `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`
            );
          }

          const result = [];
          const errors = [];
          const iterator = iterable[Symbol.iterator]();
          let isRejected = false;
          let isIterableDone = false;
          let resolvingCount = 0;
          let currentIndex = 0;

          const next = () => {
            if (isRejected) {
              return;
            }

            const nextItem = iterator.next();
            const index = currentIndex;
            currentIndex++;

            if (nextItem.done) {
              isIterableDone = true;

              if (resolvingCount === 0) {
                if (!stopOnError && errors.length !== 0) {
                  reject(new aggregateError(errors));
                } else {
                  resolve(result);
                }
              }

              return;
            }

            resolvingCount++;

            (async () => {
              try {
                const element = await nextItem.value;
                result[index] = await mapper(element, index);
                resolvingCount--;
                next();
              } catch (error) {
                if (stopOnError) {
                  isRejected = true;
                  reject(error);
                } else {
                  errors.push(error);
                  resolvingCount--;
                  next();
                }
              }
            })();
          };

          for (let i = 0; i < concurrency; i++) {
            next();

            if (isIterableDone) {
              break;
            }
          }
        });
      };

      const pMap$1 = (iterable, mapper, options) =>
        new Promise((resolve, reject) => {
          options = Object.assign(
            {
              concurrency: Infinity,
            },
            options
          );

          if (typeof mapper !== 'function') {
            throw new TypeError('Mapper function is required');
          }

          const { concurrency } = options;

          if (!(typeof concurrency === 'number' && concurrency >= 1)) {
            throw new TypeError(
              `Expected \`concurrency\` to be a number from 1 and up, got \`${concurrency}\` (${typeof concurrency})`
            );
          }

          const ret = [];
          const iterator = iterable[Symbol.iterator]();
          let isRejected = false;
          let isIterableDone = false;
          let resolvingCount = 0;
          let currentIndex = 0;

          const next = () => {
            if (isRejected) {
              return;
            }

            const nextItem = iterator.next();
            const i = currentIndex;
            currentIndex++;

            if (nextItem.done) {
              isIterableDone = true;

              if (resolvingCount === 0) {
                resolve(ret);
              }

              return;
            }

            resolvingCount++;

            Promise.resolve(nextItem.value)
              .then((element) => mapper(element, i))
              .then(
                (value) => {
                  ret[i] = value;
                  resolvingCount--;
                  next();
                },
                (error) => {
                  isRejected = true;
                  reject(error);
                }
              );
          };

          for (let i = 0; i < concurrency; i++) {
            next();

            if (isIterableDone) {
              break;
            }
          }
        });

      var pMap_1 = pMap$1;
      // TODO: Remove this for the next major release
      var _default = pMap$1;
      pMap_1.default = _default;

      const pFilter = async (iterable, filterer, options) => {
        const values = await pMap_1(
          iterable,
          (element, index) => Promise.all([filterer(element, index), element]),
          options
        );
        return values
          .filter((value) => Boolean(value[0]))
          .map((value) => value[1]);
      };

      var pFilter_1 = pFilter;
      // TODO: Remove this for the next major release
      var _default$1 = pFilter;
      pFilter_1.default = _default$1;

      const IS_ATOM = typeof atom !== 'undefined';
      const IS_DEV =
        typeof atom !== 'undefined' && (atom.inDevMode() || atom.inSpecMode());
      const IGNORED_CONFIG_NAME = 'atom-package-deps.ignored';

      /*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */

      /**
       * Module variables.
       * @private
       */

      var matchHtmlRegExp = /["'&<>]/;

      /**
       * Module exports.
       * @public
       */

      var escapeHtml_1 = escapeHtml;

      /**
       * Escape special characters in the given string of html.
       *
       * @param  {string} string The string to escape for inserting into HTML
       * @return {string}
       * @public
       */

      function escapeHtml(string) {
        var str = '' + string;
        var match = matchHtmlRegExp.exec(str);

        if (!match) {
          return str;
        }

        var escape;
        var html = '';
        var index = 0;
        var lastIndex = 0;

        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34: // "
              escape = '&quot;';
              break;
            case 38: // &
              escape = '&amp;';
              break;
            case 39: // '
              escape = '&#39;';
              break;
            case 60: // <
              escape = '&lt;';
              break;
            case 62: // >
              escape = '&gt;';
              break;
            default:
              continue;
          }

          if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
          }

          lastIndex = index + 1;
          html += escape;
        }

        return lastIndex !== index
          ? html + str.substring(lastIndex, index)
          : html;
      }

      async function spawnInternal(command, args, options) {
        const spawnedProcess = child_process.spawn(command, args, options);
        const promise = new Promise((resolve, reject) => {
          const output = {
            stdout: spawnedProcess.stdout ? [] : null,
            stderr: spawnedProcess.stderr ? [] : null,
          };
          spawnedProcess.on('error', reject);
          if (spawnedProcess.stdout) {
            spawnedProcess.stdout.on('data', function (chunk) {
              output.stdout.push(chunk);
              if (options.handleStdout) {
                options.handleStdout(chunk);
              }
            });
          }
          if (spawnedProcess.stderr) {
            spawnedProcess.stderr.on('data', function (chunk) {
              output.stderr.push(chunk);
              if (options.handleStderr) {
                options.handleStderr(chunk);
              }
            });
          }
          spawnedProcess.on('close', (code) => {
            let outputStdout = null;
            if (output.stdout != null) {
              outputStdout =
                options.encoding === null || options.encoding === 'buffer'
                  ? Buffer.concat(output.stdout)
                  : output.stdout.join('');
            }
            let outputStderr = null;
            if (output.stderr != null) {
              outputStderr =
                options.encoding === null || options.encoding === 'buffer'
                  ? Buffer.concat(output.stderr)
                  : output.stderr.join('');
            }
            resolve({
              exitCode: code,
              stdout: outputStdout,
              stderr: outputStderr,
            });
          });
        });
        options.handleChildProcess(spawnedProcess);
        return promise;
      }
      function spawn(command, args, options) {
        let spawnedProcess;
        const promise = spawnInternal(command, args, {
          ...options,
          handleChildProcess(_spawnedProcess) {
            spawnedProcess = _spawnedProcess;
          },
        });
        promise.kill = function (signal) {
          // TODO: kill all subprocesses on windows with wmic?
          return spawnedProcess.kill(signal);
        };
        return promise;
      }

      var semverCompare = function cmp(a, b) {
        var pa = a.split('.');
        var pb = b.split('.');
        for (var i = 0; i < 3; i++) {
          var na = Number(pa[i]);
          var nb = Number(pb[i]);
          if (na > nb) return 1;
          if (nb > na) return -1;
          if (!isNaN(na) && isNaN(nb)) return 1;
          if (isNaN(na) && !isNaN(nb)) return -1;
        }
        return 0;
      };

      async function getDependencies(packageName) {
        const packageModule = atom.packages.getLoadedPackage(packageName);
        const packageDependencies =
          packageModule && packageModule.metadata['package-deps'];
        return Array.isArray(packageDependencies) ? packageDependencies : [];
      }
      async function resolveDependencyPath(packageName) {
        return atom.packages.resolvePackagePath(packageName);
      }
      async function getInstalledDependencyVersion(dependency) {
        var _packageModule$metada;

        const packageModule = atom.packages.getLoadedPackage(dependency.name);
        return packageModule == null
          ? null
          : (_packageModule$metada = packageModule.metadata.version) !== null &&
            _packageModule$metada !== void 0
          ? _packageModule$metada
          : null;
      }

      async function getDependencies$1(packageName) {
        let packageStats = null;

        try {
          packageStats = await fs__default['default'].promises.stat(
            packageName
          );
        } catch (_) {
          // No Op
        }

        if (packageStats == null || !packageStats.isDirectory()) {
          throw new Error(
            `[Package-Deps] Expected packageName to be a readable directory in Node.js invocation`
          );
        }

        let parsed = null;

        try {
          const contents = await fs__default['default'].promises.readFile(
            path__default['default'].join(packageName, 'package.json'),
            'utf8'
          );
          parsed = JSON.parse(contents);
        } catch (_) {
          // Ignore JSON read errors and such
        }

        const packageDependencies =
          parsed == null || typeof parsed !== 'object'
            ? []
            : parsed['package-deps'];
        return Array.isArray(packageDependencies) ? packageDependencies : [];
      }
      async function resolveDependencyPath$1(packageName) {
        var _process$env$ATOM_HOM;

        const packageDirectory = path__default['default'].join(
          (_process$env$ATOM_HOM = process.env.ATOM_HOME) !== null &&
            _process$env$ATOM_HOM !== void 0
            ? _process$env$ATOM_HOM
            : path__default['default'].join(
                os__default['default'].homedir(),
                '.atom'
              ),
          'packages',
          packageName
        );

        try {
          await fs__default['default'].promises.access(
            packageDirectory,
            fs__default['default'].constants.R_OK
          );
          return packageDirectory;
        } catch (_) {
          return null;
        }
      }
      async function getInstalledDependencyVersion$1(dependency) {
        var _manifest$version, _manifest;

        const { directory } = dependency;

        if (directory == null) {
          // Not possible to get version without resolved directory in Node.js version
          return null;
        }

        let manifest = null;

        try {
          manifest = JSON.parse(
            await fs__default['default'].promises.readFile(
              path__default['default'].join(directory, 'package.json'),
              'utf8'
            )
          );
        } catch (_) {
          return null;
        }

        return (_manifest$version =
          (_manifest = manifest) === null || _manifest === void 0
            ? void 0
            : _manifest.version) !== null && _manifest$version !== void 0
          ? _manifest$version
          : null;
      }

      /**
       * Internal helpers
       */

      async function getInstalledDependencyVersion$2(dependency) {
        if (IS_ATOM) {
          const atomPackageVersion = await getInstalledDependencyVersion(
            dependency
          );

          if (atomPackageVersion) {
            return atomPackageVersion;
          } // If the package isn't activated, it won't be loaded, so fallback to reading manifest file instead
        }

        return getInstalledDependencyVersion$1(dependency);
      }
      /**
       * Exported helpers
       */

      const resolveDependencyPath$2 = IS_ATOM
        ? resolveDependencyPath
        : resolveDependencyPath$1;
      function invariant(condition, message) {
        if (!condition) {
          throw new Error(
            message !== null && message !== void 0
              ? message
              : 'Invariant violation'
          );
        }
      }
      async function getDependencies$2(name) {
        const dependencies = await (IS_ATOM
          ? getDependencies(name)
          : getDependencies$1(name));

        if (IS_DEV) {
          invariant(
            Array.isArray(dependencies),
            `Dependencies for ${name} are not a valid array`
          );
          dependencies.forEach((item, index) => {
            if (Array.isArray(item)) {
              item.forEach((subitem, subindex) => {
                const invalidMessage = `Dependency#${index}#${subindex} for ${name} is invalid`;
                invariant(
                  typeof subitem.name === 'string' && subitem.name.length > 0,
                  invalidMessage
                );
                invariant(
                  subitem.minimumVersion == null ||
                    (typeof subitem.minimumVersion === 'string' &&
                      subitem.minimumVersion.length > 0),
                  invalidMessage
                );
              });
              invariant(
                item.length > 0,
                `Dependency#${index} for ${name} has no group items`
              );
            } else {
              const invalidMessage = `Dependency#${index} for ${name} is invalid`;
              invariant(
                typeof item.name === 'string' && item.name.length > 0,
                invalidMessage
              );
              invariant(
                item.minimumVersion == null ||
                  (typeof item.minimumVersion === 'string' &&
                    item.minimumVersion.length > 0),
                invalidMessage
              );
            }
          });
        }

        return dependencies;
      }
      async function shouldInstallDependency(dependency) {
        if (dependency.directory == null) {
          // Not installed, so install
          return true;
        }

        if (dependency.minimumVersion == null) {
          // Already installed and no version defined, so skip
          return false;
        }

        const version = await getInstalledDependencyVersion$2(dependency);

        if (version == null) {
          // Unable to get current version, so install
          return true;
        }

        return semverCompare(dependency.minimumVersion, version) === 1;
      }
      function isPackageIgnored(name) {
        var _atom$config$get;

        if (!IS_ATOM) {
          // Never ignored in CLI
          return false;
        }

        const ignoredPackages =
          (_atom$config$get = atom.config.get(IGNORED_CONFIG_NAME)) !== null &&
          _atom$config$get !== void 0
            ? _atom$config$get
            : [];

        if (ignoredPackages.includes(name)) {
          return true;
        } // If Atom "notifications" package is disabled, treat the whole thing as ignored

        if (atom.packages.isPackageDisabled('notifications')) {
          console.warn(
            `Enable notifications to install dependencies for ${name}`
          );
          return true;
        }

        return false;
      }
      function markPackageAsIgnored(name) {
        var _atom$config$get2;

        if (!IS_ATOM) {
          // No op in CLI
          return;
        }

        const ignoredPackages = new Set(
          (_atom$config$get2 = atom.config.get(IGNORED_CONFIG_NAME)) !== null &&
          _atom$config$get2 !== void 0
            ? _atom$config$get2
            : []
        );
        ignoredPackages.add(name);
        atom.config.set(IGNORED_CONFIG_NAME, Array.from(ignoredPackages));
      }
      const INSTALL_VALID_TICKS = new Set(['✓', 'done']);
      const INSTALL_VALIDATION_REGEXP = /(?:Installing|Moving) (.*?) to .* (.*)/; // Example success output: Uninstalling linter-ui-default ✓

      async function installPackage(dependency) {
        const apmPath = IS_ATOM ? atom.packages.getApmPath() : 'apm';
        const { stdout, stderr } = await spawn(apmPath, [
          'install',
          dependency.name,
          '--production',
          '--color',
          'false',
        ]);
        const match = INSTALL_VALIDATION_REGEXP.exec(stdout.trim());

        if (match != null && INSTALL_VALID_TICKS.has(match[2])) {
          // Installation complete and verified
          return;
        }

        const error = new Error(
          `Error installing dependency: ${dependency.name}`
        );
        error.stack = stderr.trim();
        throw error;
      }

      let showResetInstruction = true;
      function confirmPackagesToInstall({ packageName, dependencies }) {
        return new Promise((resolve) => {
          const ungroupedDependencies = dependencies.filter(
            (item) => !Array.isArray(item)
          );
          const groupedDependencies = dependencies.filter((item) =>
            Array.isArray(item)
          );
          const skipGroups = groupedDependencies.length === 0;
          const detail = skipGroups
            ? ungroupedDependencies.map((item) => item.name).join(', ')
            : 'Something went wrong. Check your developer console';
          const groupChoices = groupedDependencies.map((item) => item[0]);
          const notification = atom.notifications.addInfo(
            `${packageName} needs to install dependencies`,
            {
              dismissable: true,
              icon: 'cloud-download',
              detail,
              description: `Install dependenc${
                dependencies.length === 1 ? 'y' : 'ies'
              }?`,
              buttons: [
                {
                  text: 'Yes',
                  onDidClick: () => {
                    if (skipGroups) {
                      resolve([]);
                    } else {
                      resolve(ungroupedDependencies.concat(groupChoices));
                    }

                    notification.dismiss();
                  },
                },
                {
                  text: 'No Thanks',
                  onDidClick: () => {
                    notification.dismiss();
                  },
                },
                {
                  text: 'Never',
                  onDidClick: () => {
                    markPackageAsIgnored(packageName);

                    if (showResetInstruction) {
                      showResetInstruction = false;
                      atom.notifications.addInfo(
                        'How to reset package-deps memory',
                        {
                          dismissable: true,
                          description:
                            "To modify the list of ignored files invoke 'Application: Open Your Config' and change the 'atom-package-deps' section",
                        }
                      );
                    }

                    notification.dismiss();
                  },
                },
              ],
            }
          );
          notification.onDidDismiss(() => resolve([]));

          if (skipGroups) {
            return;
          } // Handle groups

          try {
            var _notificationView$ele;

            const notificationView = atom.views.getView(notification);
            const notificationElement =
              (_notificationView$ele =
                notificationView === null || notificationView === void 0
                  ? void 0
                  : notificationView.element) !== null &&
              _notificationView$ele !== void 0
                ? _notificationView$ele
                : null;

            if (notificationElement == null) {
              throw new Error('Unable to get notification element from view');
            }

            const notificationContent = notificationElement.querySelector(
              '.detail-content'
            );

            if (notificationContent == null) {
              throw new Error(
                'Content detail container not found inside the notification'
              );
            } // Clear the contents and add some skel

            notificationContent.innerHTML = ''; // Add list of ungroup dependencies to the top of the notification

            if (ungroupedDependencies.length > 0) {
              const ungroupedLine = document.createElement('div');
              ungroupedLine.innerHTML = `Packages without choices: <br /><ul><li>${ungroupedDependencies
                .map((item) => escapeHtml_1(item.name))
                .join('</li><li>')}</li></ul>`;
              notificationContent.appendChild(ungroupedLine);
            } // Create a label line for groups

            const groupLabelLine = document.createElement('div');
            groupLabelLine.innerHTML = `Packages with choices:`;
            notificationContent.appendChild(groupLabelLine); // Create one line per group with a select inside

            const groupedList = document.createElement('ul');
            groupedDependencies.forEach((item, index) => {
              const listItem = document.createElement('li');
              const select = document.createElement('select');
              select.innerHTML = item
                .map(
                  (subitem) => `<option>${escapeHtml_1(subitem.name)}</option>`
                )
                .join('\n');
              select.addEventListener('change', () => {
                // Change the selected value for this index for resolve to use
                const subitem = item.find(
                  (entry) => entry.name === select.value
                );

                if (subitem != null) {
                  groupChoices[index] = subitem;
                }
              });
              listItem.style.marginTop = '5px';
              listItem.appendChild(select);
              groupedList.appendChild(listItem);
            });
            notificationContent.appendChild(groupedList);
          } catch (err) {
            console.error(
              '[Package-Deps] Error during showing package choices to user',
              err
            );
          }
        });
      }
      function getView({ packageName, dependencies }) {
        const failed = [];
        const notification = atom.notifications.addInfo(
          `Installing ${packageName} dependencies`,
          {
            detail: `Installing ${dependencies
              .map((item) => item.name)
              .join(', ')}`,
            dismissable: true,
          }
        );
        const progress = document.createElement('progress');
        progress.max = dependencies.length;
        progress.style.width = '100%';

        try {
          var _notificationView$ele2;

          const notificationView = atom.views.getView(notification);
          const notificationElement =
            (_notificationView$ele2 =
              notificationView === null || notificationView === void 0
                ? void 0
                : notificationView.element) !== null &&
            _notificationView$ele2 !== void 0
              ? _notificationView$ele2
              : null;

          if (notificationElement == null) {
            throw new Error('Unable to get notification element from view');
          }

          const notificationContent = notificationElement.querySelector(
            '.detail-content'
          );

          if (notificationContent == null) {
            throw new Error(
              'Content detail container not found inside the notification'
            );
          }

          notificationContent.appendChild(progress);
        } catch (err) {
          console.error(
            '[Package-Deps] Error during showing installation progress to user',
            err
          );
        }

        return {
          handleFailure({ dependency, error }) {
            var _error$stack;

            failed.push(dependency.name);
            progress.value += 1;
            console.error(
              `[Package-Deps] Unable to install ${dependency.name}, Error:`,
              (_error$stack =
                error === null || error === void 0 ? void 0 : error.stack) !==
                null && _error$stack !== void 0
                ? _error$stack
                : error
            );
          },

          handleDependencyInstalled(dependency) {
            progress.value += 1;
          },

          handleComplete() {
            notification.dismiss();

            if (failed.length > 0) {
              atom.notifications.addWarning(
                `Failed to install ${packageName} dependencies`,
                {
                  detail: `These packages were not installed, check your console\nfor more info.\n${failed.join(
                    '\n'
                  )}`,
                  dismissable: true,
                }
              );
            } else {
              atom.notifications.addSuccess(
                `Installed ${packageName} dependencies`,
                {
                  detail: `Installed ${dependencies
                    .map((item) => item.name)
                    .join(', ')}`,
                }
              );
            }

            Promise.all(
              dependencies.map((item) => {
                if (!failed.includes(item.name)) {
                  return atom.packages.activatePackage(item.name);
                }

                return null;
              })
            ).catch((err) => {
              console.error(
                `[Package-Deps] Error activating installed packages for ${packageName}`,
                err
              );
            });
          },
        };
      }

      async function confirmPackagesToInstall$1({ dependencies }) {
        // No user interaction on the CLI. Install the first (aka "default" choice) package
        return dependencies.map((item) =>
          Array.isArray(item) ? item[0] : item
        );
      }
      function getView$1({ dependencies }) {
        let failed = false;
        console.log(
          `Installing dependencies:\n${dependencies
            .map((item) => `  - ${item.name}`)
            .join('\n')}`
        );
        return {
          handleFailure({ dependency, error }) {
            var _error$stack;

            failed = true;
            console.error(
              `Unable to install ${dependency.name}, Error:`,
              (_error$stack =
                error === null || error === void 0 ? void 0 : error.stack) !==
                null && _error$stack !== void 0
                ? _error$stack
                : error
            );
          },

          handleDependencyInstalled(dependency) {
            console.log('Successfully installed', dependency.name);
          },

          handleComplete() {
            console.log('Installation complete');

            if (failed) {
              // Fail the invocation
              process.exitCode = 1;
            }
          },
        };
      }

      const getView$2 = IS_ATOM ? getView : getView$1;
      const confirmPackagesToInstall$2 = IS_ATOM
        ? confirmPackagesToInstall
        : confirmPackagesToInstall$1;

      async function install(packageName) {
        invariant(
          typeof packageName === 'string' && packageName.length > 0,
          '[Package-Deps] Package name is required'
        );

        if (isPackageIgnored(packageName)) {
          // User ignored this package
          return;
        } // Get list of relevant dependencies

        const dependencies = await getDependencies$2(packageName);

        if (dependencies.length === 0) {
          // Short-circuit
          return;
        } // Resolve directories of relevant dependencies

        const resolvedDependencies = await Promise.all(
          dependencies.map(async (item) => {
            if (Array.isArray(item)) {
              return Promise.all(
                item.map(async (subitem) => ({
                  ...subitem,
                  directory: await resolveDependencyPath$2(subitem.name),
                }))
              );
            }

            return {
              ...item,
              directory: await resolveDependencyPath$2(item.name),
            };
          })
        ); // Filter out already installed, in range dependencies
        // If one dependency from a group is already installed, whole group is ignored

        const dependenciesToInstall = await pFilter_1(
          resolvedDependencies,
          async function (item) {
            if (Array.isArray(item)) {
              return (
                await Promise.all(
                  item.map((subitem) => shouldInstallDependency(subitem))
                )
              ).every(Boolean);
            }

            return shouldInstallDependency(item);
          }
        );

        if (dependenciesToInstall.length === 0) {
          // Short-circuit if all have been skipped
          return;
        }

        const chosenDependencies = await confirmPackagesToInstall$2({
          packageName,
          dependencies: dependenciesToInstall,
        });

        if (chosenDependencies.length === 0) {
          // Short-circuit if user interaction cancelled all
          return;
        }

        const view = getView$2({
          packageName,
          dependencies: chosenDependencies,
        });
        await pMap(
          chosenDependencies,
          async function (dependency) {
            try {
              await installPackage(dependency);
              view.handleDependencyInstalled(dependency);
            } catch (err) {
              view.handleFailure({
                dependency,
                error: err,
              });
            }
          },
          {
            concurrency: 2,
          }
        );
        view.handleComplete();
      }

      exports.install = install;

      /***/
    },
    /* 6 */
    /***/ (module) => {
      module.exports = require('fs');

      /***/
    },
    /* 7 */
    /***/ (module) => {
      module.exports = require('path');

      /***/
    },
    /* 8 */
    /***/ (module) => {
      module.exports = JSON.parse(
        '{"name":"build-sassc","version":"0.8.2","description":"Atom Build provider for sassc, compiles Sass","repository":"https://github.com/idleberg/atom-build-sassc","license":"MIT","scripts":{"build":"webpack --mode production","dev":"npm run start","format":"prettier ./src --write","lint:formatting":"prettier ./src --check --ignore-path .gitignore","lint:js":"eslint ./src --ignore-path .gitignore","lint":"npm-run-all --parallel lint:*","release":"np","start":"webpack --mode none --watch","test":"npm run lint"},"keywords":["buildprovider","compile","sass","sassc","css","linter","lint"],"main":"lib/provider.js","engines":{"atom":">=1.0.0 <2.0.0"},"providedServices":{"builder":{"description":"Compiles Sass","versions":{"2.0.0":"provideBuilder"}}},"package-deps":[{"name":"build"}],"dependencies":{"atom-package-deps":"^7.0.1","atom-satisfy-dependencies":"^0.3.0"},"devDependencies":{"@babel/core":"^7.12.9","@babel/plugin-proposal-optional-chaining":"^7.12.7","babel-eslint":"^10.0.1","babel-loader":"^8.2.2","eslint":"^7.15.0","eslint-config-atom-build":"^4.0.0","eslint-plugin-json":"^2.1.2","husky":"^4.3.4","lint-staged":"^10.5.3","npm-run-all":"^4.1.5","prettier":"^2.2.1","webpack":"^5.10.0","webpack-cli":"^4.2.0"},"babel":{"plugins":["@babel/plugin-proposal-optional-chaining"]},"prettier":{"quoteProps":"consistent","semi":true,"singleQuote":true},"husky":{"hooks":{"pre-commit":"lint-staged"}},"lint-staged":{"*.js":"eslint ./src --cache --fix","*.{js,yml}":"prettier ./src --write"}}'
      );

      /***/
    },
    /* 9 */
    /***/ function (__unused_webpack_module, exports, __webpack_require__) {
      var __assign =
        (this && this.__assign) ||
        function () {
          __assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
            };
          return __assign.apply(this, arguments);
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __generator =
        (this && this.__generator) ||
        function (thisArg, body) {
          var _ = {
              label: 0,
              sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t =
                      op[0] & 2
                        ? y['return']
                        : op[0]
                        ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                        : y.next) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.satisfyDependencies = void 0;
      var atom_package_deps_1 = __webpack_require__(5);
      var atom_read_manifest_1 = __webpack_require__(10);
      var defaultOptions = {
        logger: console.log,
      };
      /**
       * Installs and optionally enables package dependencies
       * @param {string} identifier
       * @param {Object} options
       */
      function satisfyDependencies(identifier, userOptions) {
        if (userOptions === void 0) {
          userOptions = {};
        }
        return __awaiter(this, void 0, void 0, function () {
          var options, manifest;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                options = __assign(__assign({}, defaultOptions), userOptions);
                return [
                  4 /*yield*/,
                  atom_read_manifest_1.readManifest(identifier),
                ];
              case 1:
                manifest = _a.sent();
                return [
                  4 /*yield*/,
                  atom_package_deps_1.install(manifest['name']),
                ];
              case 2:
                _a.sent();
                enableDependencies(manifest['package-deps'], options);
                return [2 /*return*/];
            }
          });
        });
      }
      exports.satisfyDependencies = satisfyDependencies;
      /**
       * Enables packages dependencies
       * @param {Object} manifest
       * @param {Object} options
       */
      function enableDependencies(manifest, options) {
        if (options.enableDependencies) {
          manifest['package-deps'].map(function (packageDependency) {
            if (atom.packages.isPackageDisabled(packageDependency)) {
              if (atom.inDevMode()) {
                options.logger(
                  '[' +
                    manifest.name +
                    "] Enabling package dependency '" +
                    packageDependency +
                    "'"
                );
              }
              atom.packages.enablePackage(packageDependency);
            }
          });
        }
      }
      //# sourceMappingURL=index.js.map

      /***/
    },
    /* 10 */
    /***/ function (__unused_webpack_module, exports, __webpack_require__) {
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __generator =
        (this && this.__generator) ||
        function (thisArg, body) {
          var _ = {
              label: 0,
              sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t =
                      op[0] & 2
                        ? y['return']
                        : op[0]
                        ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                        : y.next) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.readManifestSync = exports.readManifest = void 0;
      var _a = __webpack_require__(7),
        resolve = _a.resolve,
        sep = _a.sep;
      var _b = __webpack_require__(6),
        fs = _b.promises,
        readFileSync = _b.readFileSync;
      var callerCallsite = __webpack_require__(11);
      function readManifest(packageName) {
        if (packageName === void 0) {
          packageName = '';
        }
        return __awaiter(this, void 0, void 0, function () {
          var filePath, fileContents, err_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                filePath = resolveFilePath(packageName);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.readFile(filePath, 'utf8')];
              case 2:
                fileContents = _a.sent();
                return [2 /*return*/, JSON.parse(fileContents)];
              case 3:
                err_1 = _a.sent();
                return [2 /*return*/, null];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      }
      exports.readManifest = readManifest;
      function readManifestSync(packageName) {
        if (packageName === void 0) {
          packageName = '';
        }
        var filePath = resolveFilePath(packageName);
        try {
          var fileContents = readFileSync(filePath, 'utf8');
          return JSON.parse(fileContents);
        } catch (err) {
          return null;
        }
      }
      exports.readManifestSync = readManifestSync;
      function resolveFilePath(packageName) {
        packageName = (
          packageName === null || packageName === void 0
            ? void 0
            : packageName.length
        )
          ? packageName
          : getPackageName();
        var packagePath = atom.packages.resolvePackagePath(packageName);
        var filePath = resolve(packagePath, 'package.json');
        return filePath;
      }
      function getPackageName() {
        var callerPath = callerCallsite().getFileName();
        var packageDirPaths = atom.packages.getPackageDirPaths();
        var intersection = packageDirPaths.filter(function (packageDirPath) {
          return callerPath.startsWith(packageDirPath);
        });
        if (
          intersection === null || intersection === void 0
            ? void 0
            : intersection.length
        ) {
          return (
            callerPath
              .replace(intersection[0], '')
              .split(sep)
              .filter(function (fragment) {
                return fragment;
              })[0] || ''
          );
        }
        return '';
      }
      //# sourceMappingURL=index.js.map

      /***/
    },
    /* 11 */
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      const callsites = __webpack_require__(12);

      module.exports = ({ depth = 0 } = {}) => {
        const callers = [];
        const callerFileSet = new Set();

        for (const callsite of callsites()) {
          const fileName = callsite.getFileName();
          const hasReceiver =
            callsite.getTypeName() !== null && fileName !== null;

          if (!callerFileSet.has(fileName)) {
            callerFileSet.add(fileName);
            callers.unshift(callsite);
          }

          if (hasReceiver) {
            return callers[depth];
          }
        }
      };

      /***/
    },
    /* 12 */
    /***/ (module) => {
      const callsites = () => {
        const _prepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const stack = new Error().stack.slice(1);
        Error.prepareStackTrace = _prepareStackTrace;
        return stack;
      };

      module.exports = callsites;
      // TODO: Remove this for the next major release
      module.exports.default = callsites;

      /***/
    },
    /* 13 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ which: () => /* binding */ which,
        /* harmony export */
      });
      /* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        2
      );
      /* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        os__WEBPACK_IMPORTED_MODULE_0__
      );

      function which() {
        return (0, os__WEBPACK_IMPORTED_MODULE_0__.platform)() === 'win32'
          ? 'where'
          : 'which';
      }

      /***/
    },
    /******/
  ]; // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ if (__webpack_module_cache__[moduleId]) {
      /******/ return __webpack_module_cache__[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } /* webpack/runtime/compat get default export */
  /******/
  /************************************************************************/
  /******/ /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module['default']
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })(); /* webpack/runtime/define property getters */
  /******/
  /******/ /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })(); /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  /******/ /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })(); /* webpack/runtime/make namespace object */
  /******/
  /******/ /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })(); // module exports must be returned from runtime so entry inlining is disabled // startup // Load entry module and return exports
  /******/
  /************************************************************************/
  /******/ /******/ /******/ /******/ return __webpack_require__(0);
  /******/
})();
//# sourceMappingURL=provider.js.map
