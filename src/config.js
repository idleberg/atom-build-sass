import meta from '../package.json';

export const configSchema = {
  pathToSass: {
    title: 'Path to Sass',
    description: 'Specify a custom path to the `sass` binary',
    type: 'string',
    default: 'sass',
    order: 0,
  },
  customSassArguments: {
    title: 'Custom Sass Arguments',
    description:
      'Specify your preferred arguments for Sass, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default: '--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
    order: 1,
  },
  customScssArguments: {
    title: 'Custom SCSS Arguments',
    description:
      'Specify your preferred arguments for SCSS, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default:
      '--scss --style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
    order: 2,
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description:
      'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 3,
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description:
      'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 4,
  },
};

export function getConfig(key) {
  return atom.config.get(`${meta.name}.${key}`);
}
