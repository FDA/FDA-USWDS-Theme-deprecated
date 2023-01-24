# FDA USWDS Theme

This theme is developed using the [U.S. Web Design System  v3.0](https://github.com/uswds/uswds) and includes a library of UI components and theme settings with USWDS design tokens consistent with FDA's Visual Identity Program guidelines.

To see the design system and its documentation on the web, visit [https://designsystem.digital.gov](https://designsystem.digital.gov) or its Github repository [README](https://github.com/uswds/uswds/blob/develop/README.md) to see developer documentation.

## Contents

- [What's Included](#whats-included)
- [Install using `npm`](#install-using-npm)
- [JavaScript](#javascript)
- [Sass and theme settings](#sass-and-theme-settings)
- [CSS architecture](#css-architecture)
- [Licenses and attribution](#licenses-and-attribution)

## What's Included

Here's what you can expect to find inside the FDA USWDS theme package:

- `/dist`: Compiled or collected files
- `/dist/css`: Precompiled CSS files
- `/dist/fonts`: Default fonts available to the design system
- `/dist/img`: All USWDS and FDA images collected into a single directory
- `/dist/img/logos`: FDA primary and secondary logos
- `/dist/img/usa-icons`: All icons collected into the USWDS icon sprite (`sprite.svg`)
- `/dist/img/material-icons`: All Material Icons
- `/dist/img/uswds-icons`: All icons created by USWDS
- `/dist/img/sprite.svg`: Precompiled icon sprite with default icon set
- `/dist/js`: Precompiled JavaScript files

- `/gulp`: Configuration and tasks for the project's gulpfile
- `/gulp/config.js`: Gulp configuration
- `/gulp/tasks`: All of this project's Gulp tasks

- `/node_modules/@uswds`: Source files for USWDS package

- `/public`: Root directory for this project's dev server

- `/src`: Source files for FDA USWDS Theme components and USWDS settings.
- `/src/img`: FDA images
- `/src/img/logos`: FDA primary and secondary logos
- `/src/js`: JavaScript files
- `/src/scss/labcoat/_index.scss`: FDA Sass entry point
- `/src/scss/labcoat/components`:
- `/src/scss/labcoat/elements`:
- `/src/scss/labcoat/settings`:
- `/src/scss/uswds/_index.scss`: USWDS Sass entry point
- `/src/scss/uswds/settings`: USWDS custom settings
- `/src/scss/uswds/settings/_index.scss`: USWDS settings entry point
- `/src/scss/uswds/settings/styles.scss`: Example project Sass entry point
- `/src/scss/uswds/settings/_settings-theme.scss`: Custom settings file
- `/src/scss/uswds/settings/_uswds-theme.scss`: Example theme settings file

### Directory structure

[fda-uswds-theme package]
├───dist
│   ├───css
│   ├───fonts
│   │   ├───merriweather
│   │   ├───public-sans
│   │   ├───roboto-mono
│   │   └───source-sans-pro
│   ├───img
│   │   ├───favicons
│   │   ├───logos
│   │   ├───material-icons
│   │   ├───material-icons-deprecated
│   │   ├───usa-icons
│   │   ├───usa-icons-bg
│   │   └───uswds-icons
│   └───js
├───gulp
│ 	│   config.js
│ 	│   README.md
│ 	│
│   └───tasks
├───node_modules
│   ├───.bin
│   ...
│   ├───@uswds
│   ...
├───public
└───src
    ├───img
    │   └───logos
    ├───js
	└───scss
		│   styles.scss
		│
		├───labcoat
		│   │   _index.scss
		│   │
		│   ├───components
		│   ├───elements
		│   └───settings
		└───uswds
			│   _index.scss
			│
			└───settings
					.gitkeep
					styles.scss
					_index.scss
					_settings-theme.scss
					_uswds-theme-custom-styles.scss
					_uswds-theme.scss

## Install using npm

`npm` is a package manager for Node-based projects. USWDS maintains a [`uswds` package](https://www.npmjs.com/package/uswds) that includes both the pre-compiled and compiled files — just like the direct download. `npm` packages make it easy to update and install the design system from the command line.

1. Install `Node/npm`. Below is a link to find the install method that coincides with your operating system:

   - Node v12.13.0 (current LTS), [Installation guides](https://nodejs.org/en/download/)

   **Note for Windows users:** If you are using Windows and are unfamiliar with `Node` or `npm`, we recommend following [Team Treehouse's tutorial](http://blog.teamtreehouse.com/install-node-js-npm-windows) for more information.

2. Make sure you have installed it correctly:

   ```shell
   npm -v
   6.13.0 # This line may vary depending on what version of Node you've installed.
   ```

3. Create a `package.json` file. You can do this manually, but an easier method is to use the `npm init` command. This command will prompt you with a few questions to create your `package.json` file.

4. Add `uswds` to your project’s `package.json`:

   ```shell
   npm install --save uswds@latest
   ```

The `uswds` module is now installed as a dependency. You can use the un-compiled files found in the `node_modules/uswds/dist/` directory.

```
node_modules/uswds/
├── dist/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   ├── js/
│   └── scss/
```

**Note:** We do _not_ recommend directly editing the design system files in `node_modules`. One of the benefits of using a package manager is its ease of upgrade and installation. If you make customizations to the files in the package, any upgrade or re-installation will wipe them out.

## JavaScript

`require('uswds')` will load all of USWDS’s JavaScript onto the page. Add this line to whatever initializer you use to load JavaScript into your application.

### JS customization

**Unfortunately, customizing the JavaScript for the USWDS currently requires NodeJS and a module bundler like Browserify or Webpack. We apologize for this inconvenience, and are working to resolve it in a future release of the design system.**

USWDS JavaScript is separated into components (just as with the CSS and HTML) and initialized with event handlers when the DOM is ready. These components are accessible as CommonJS modules that can be required in other JavaScript files, then built for the browser. The components are not accessible in the global browser scope, but can be extended to be included by requiring `components` and setting it to a global scope:

```js
window.uswds = require("./components");
```

Each component has a standardized interface that can be used to extend it further. The components store a HTML class (like `.usa-accordion__button[aria-controls]`) used to link HTML elements with the JavaScript component. When a component is initialized, it searches through the current HTML DOM to find all elements that match the class and initializes the component JavaScript for those elements. The primary methods for each component include:

- `on`: Initialize a component's JavaScript behavior by passing the root element, such as `window.document`.
- `off`: The opposite of `on`, de-initializes a component, removing any JavaScript event handlers on the component.
- `hide`: Hide the whole component.
- `show`: Shows a whole, hidden component.
- `toggle`: Toggles the visibility of a component on and off based on the previous state.

Some components have additional methods based on that component's functionality. Any additional methods are found in that component's JavaScript file.

**If you’re using a modern framework like React or Angular you can import components and initialize them in your library's DOM ready lifecycle event.**

Importing a modular component.

```js
import USWDS from "../node_modules/uswds/src/js/components";
const { characterCount, accordion } = USWDS; // deconstruct your components here
```

React hooks example:

```js
function App() {
  const ref = document.body;

  useEffect(() => {
    // initialize
    characterCount.on(ref); // default ref is document.body, if you want to use default you do not have to pass arguments
    accordion.on();

    // remove event listeners when component un-mounts.
    return () => {
      characterCount.off();
      accordion.off();
    };
  });
}
```

Angular example:

```js
export class App implements OnInit {
  constructor() {
    this.ref = document.body; // default ref is document.body, if you want to use default you do not have to pass arguments
  }

  ngOnInit() {
    // initialize
    characterCount.on(this.ref);
    accordion.on();
  }

  // remove event listeners when component un-mounts.
  ngOnDestroy() {
    characterCount.off();
    accordion.off();
  }
}
```

## Sass and theme settings

USWDS Sass needs three things to compile properly:
- **Sass Module syntax:** USWDS requires a modern Sass compiler that can parse Sass Module syntax.
- **Autoprefixing:** USWDS requires Autoprefixing your CSS with a specific `.browserslistrc`.
- **Sass Load Paths:** USWDS requires Sass compilers use Load Paths that reference the `/packages` directory in the USWDS package

**Note: Using a compiler package like [USWDS Compile](https://github.com/uswds/uswds-compile) is a good way to fulfill these requirements automatically.**

### Autoprefixing

The design system requires autoprefixing to work properly. Don't add vendor prefixes to your custom styles manually — it is more reliable to use autoprefixing. Autoprefixing services like [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) automatically add vendor prefixes to CSS rules. We use the following autoprefixer settings via `.browserslistrc` config:

```
> 2%
last 2 versions
IE 11
not dead
```

### Sass Load Paths

USWDS 3.0 and newer require the use of [Sass Load Paths](https://sass-lang.com/documentation/at-rules/use#load-paths) to compile properly.

USWDS 3.0 load paths must include a path to the `/packages` directory in the USWDS package, typically by updating an `IncludePaths` setting to include `node_modules/@uswds/uswds/packages`.

Here's how this might look in Gulp and in Webpack:

#### Gulp

```js
.pipe(
  sass({
    includePaths: [
      "./node_modules/@uswds/uswds/packages",
    ],
  })
```

#### Webpack

```js
loader: "sass-loader",
options: {
  sassOptions: {
    includePaths: [
      "./node_modules/@uswds/uswds/packages"
    ],
  },
},
```

### Other useful compiler postprocessing

- **Minification:** We recommend using a **minifier** like [csso](https://github.com/css/csso) to compress your final compiled CSS.
- **Sourcemaps:** We recommend using a **sourcemap** tool like [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps) to assist debugging by keeping  track of source Sass locations.

### Customization, theming, and tokens

The design system is customizable using the power of [Sass (Syntactically Awesome Style Sheets)](http://sass-lang.com/). The critical files you'll need in your project are those in `dist/scss/theme`:

- `_uswds-theme.scss`: custom theme settings
- `_uswds-theme-custom-styles.scss`: additional project CSS for customizing or adding to what USWDS provides
- `styles.scss`: The Sass entry point. This is the primary Sass file that you'll compile. It collects theme settings, USWDS source files, and custom CSS

`styles.scss` looks something like the following code. It adds all the project theme settings, then adds USWDS source, and finally adds your project's custom styles:

```scss
@forward "uswds-theme";
@forward "uswds";
@forward "uswds-theme-custom-styles";
```

**Technical note:** The `@forward 'uswds'` statement above references the `uswds` package in `node_modules/@uswds/uswds/packages`. The compile functions included in [`uswds-compile`](https://github.com/uswds/uswds-compile) automatically look for USWDS packages in the proper directory using `includePaths`.

USWDS 3.0 provides extensive support for theming via its theme settings files introduced in [Sass and theme settings](#sass-and-theme-settings), above.

Set theme settings with USWDS design tokens, not with values directly. They tend to be quoted strings like `'desktop'` or `'md'` or unitless numbers like `2` or `-1.5`. Tokens are the values _passed into_ the USWDS functions and mixins that parse them. They are the _keys_ that, through the mechanism of a function or mixin, unlock a _value_ — they are not the values themselves.

Visit the [Design tokens section](https://designsystem.digital.gov/design-tokens/) of USWDS 3.0 documentation for more on the available tokens for [color](https://designsystem.digital.gov/design-tokens/color), [spacing units](https://designsystem.digital.gov/design-tokens/spacing-units), [font size](https://designsystem.digital.gov/design-tokens/typesetting/font-size/), and more.

#### Using tokens in theme settings

The following is an example of theme settings from `_uswds-theme.scss`:

```scss
@use "uswds-core" with (
  $theme-grid-container-max-width: "desktop",
  $theme-site-margins-breakpoint: "desktop",
  $theme-site-margins-width: 4,
  $theme-site-margins-mobile-width: 2,
)
```

The USWDS uses those tokens to build component styles:

```scss
.usa-example {
  @include u-padding-x($theme-site-margins-mobile-width);
  max-width: units($theme-grid-container-max-width);

  @include at-media($theme-site-margins-breakpoint) {
    @include u-padding-x($theme-site-margins-width);
  }
}
```

This is the functional equivalent of:

```scss
.usa-example {
  @include u-padding-x(2);
  max-width: units("desktop");

  @include at-media("desktop") {
    @include u-padding-x(4);
  }
}
```

Which, if `$theme-respect-user-font-size` is set to `true` would output something like:

```css
.usa-example {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 64rem;
}

@media screen and (min-width: 64em) {
  .usa-example {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

In general, USWDS sets **variables** with **tokens**, and passes those variables into **functions and mixins** in the source Sass.

#### Set the base asset paths (fonts and images)

The values of `$theme-font-path` and `$theme-image-path` will be appended to USWDS font paths and image paths, respectively:

```scss
@use "uswds-core" with (
  $theme-font-path: "../fonts",
  $theme-image-path: "../img",
);
```

## CSS architecture

- The CSS foundation of this site is built with the **[Sass](https://sass-lang.com)** preprocessor language.
- The CSS organization and naming conventions follow **[18F’s Engineering Guide](https://engineering.18f.gov/css/#naming)**.
- We format our code with [Prettier](https://prettier.io/), per the formatting section of the **[18F Engineering Guide](https://engineering.18f.gov/css/#formatting)**.
- CSS selectors are **prefixed** with `usa` (For example: `.usa-button`). This identifier helps the design system avoid conflicts with other styles on a site which are not part of USWDS.
- Uses a **[BEM](http://getbem.com/)** approach for naming CSS selectors. Blocks are separated from elements with two underscores (`__`). Multi-word blocks use single hyphens instead of spaces. Modifier classes are additive — proper markup requires the base class _and_ the modifier class or classes. Modifier classes consist of the base class plus a modifier suffix, separated by two hyphens (`--`) as in `.usa-button.usa-button--secondary` or `usa-accordion.usa-accordion--bordered`.
- Uses **modular CSS** for scalable, modular, and flexible code.
- Uses **nesting** when appropriate. Nest minimally with up to two levels of nesting.
- Hard-coded magic numbers are avoided.
- Media queries are built **mobile first**.
- **Spacing units** are set with the `units()` function as described in [the USWDS 3.0 documentation](https://designsystem.digital.gov/design-tokens/spacing-units/). In general, we use spacing in multiples of `8px` — expressed as a multiple in `units([multiple])`. For instance `units(2)` is the equivalent of `2 * 8px` or `16px`. In the final, compiled CSS, this value will be expressed in rem, as a multiple of the base font size set with `$theme-base-font-size`.

**For more information, visit:**
[18F’s CSS Guide](https://engineering.18f.gov/css/)

## Licenses and attribution

A few parts of this project are not in the public domain. Attribution and licensing information for those parts are described in detail in [LICENSE.md](LICENSE.md).

The rest of this project is in the worldwide public domain, released under the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
