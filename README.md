<p align="center">
  <h1 align="center">Silex Storyblok Boilerplate</h1>
  <p align="center">My silex boilerplate setup for selfhosted storyblok projects.</p>
</p>
<br>

## Install

Make sure [Composer](https://getcomposer.org/) and [npm](https://www.npmjs.com/) are installed.

```shell
composer install && npm install
```

## Configuration
- Change the project name and description in `package.json`.

- Adjust the following configurations in `webapp/config.php`:

```PHP
$app['storyblok.previewToken']

$app['config.host.test']
$app['config.host.live']

$app['config.meta.brandName']

$app['config.recaptcha.slugs']
$app['config.recaptcha.secret'] // Only if you want to use the google recaptcha

// Only if you want to use the google recaptcha with the google script request
// and a different receiver email address for test and live
// https://github.com/dwyl/html-form-send-email-via-google-script-without-server
$app['config.contactform.googleScriptUrl']
$app['config.contactform.email.test']
$app['config.contactform.email.live']
```

- Add your company notice in `app/scripts/companyNotice.ts`.

- Use [RealFaviconGenerator](http://realfavicongenerator.net/) to generate all the icons and files and copy them to `app/images/favicons`.

- Make sure your content types have the following fields for meta tags: `meta_title`, `meta_description`, `meta_share_image`. Also create a story with the slug `global` and add the field `meta_share_image` as default sharing image (if no specific share image is set in a story).

## Run

```shell
npm run dev
```

## Build (zip)

```shell
npm run build
```

> [Michael Ester](https://www.michaelester.at/) & [Netural](https://www.netural.com/) & [Storyblok](https://www.storyblok.com/)
