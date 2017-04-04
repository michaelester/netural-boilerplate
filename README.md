<p align="center">
  <h1 align="center">netural-boilerplate for Storyblok</h1>
  <p align="center">A <a href="https://www.storyblok.com" target="_blank">Storyblok</a> boilerplate in php with silex to simply start your website with us.</p>
</p>
<br>

## Install

The most efficient way to start a storyblok project as a developer would be our [Command Line Interface](https://www.storyblok.com/docs/Guides/command-line-interface).

```
npm i storyblok-cli -g
storyblok
```

and choose your boilerplate. You can of course simply `download` or `clone` this repository as well.

```
git clone https://github.com/netural/netural-boilerplate
```

Make sure [Composer](https://getcomposer.org/) and [npm](https://www.npmjs.com/) are installed:

```shell
cd netural-boilerplate
composer install
npm install
gulp
```

If you are creating a fresh project with this boilerplate please run the following command once to update composer dependencies and commit the new `composer.lock`.
```shell
composer update
```

## Configuration
In the `webapp/config.php` all you need to change is the `STORYBLOK_CONFIGURATION` - by adding your space information. [What is a Space?](https://www.storyblok.com/docs/terminology/space):

```PHP
$app['config.home']             = 'home'; //change this to your home story slug
$app['storyblok.privateToken']  = 'Iw3XKcJb6MwkdZEwoQ9BCQtt'; // change this to your private key.
```

## Folder structure

- `/app/`
  scripts, styles, images
  make sure to add a gulp task which copies that to the `public` folder.
- `/webapp/`
  The php application using [silex](http://silex.sensiolabs.org/) and our [client library](https://github.com/storyblok/php-client).
- `/webapp/views/`
  layouts and components in [Twig](http://twig.sensiolabs.org/) (`.twig`)
  If you create a `Footer Navigation` component in Storyblok, the corresponding `footer_headline.twig` in this folder will be rendered
- `/public/`
  Once you run `gulp` the `app` source files will be prepared and copied to the `/public/` folder for delivery.
- `/cache/`
  Our [client library](https://github.com/storyblok/php-client) directly adds a file cache (you can change this setting as well) for every storyblok request you do - this folder is the place where we save the cached results. 


## You want to know more about storyblok?

- [Prologue - Introduction](https://www.storyblok.com/docs/Prologue/Introduction)
- [Terminology - Introduction](https://www.storyblok.com/docs/terminology/introduction)
- [Content Delivery API - Introduction](https://www.storyblok.com/docs/Delivery-Api/introduction)

## How to install composer?
```shell
php -r "readfile('https://getcomposer.org/installer');" | php
sudo mkdir /usr/local/bin/
sudo mv composer.phar /usr/local/bin/composer
```

## How can I add Google Analytics?
- add your Google Analytics key to `index.twig`

## How can I add Favicons?
- Use [RealFaviconGenerator](http://realfavicongenerator.net/) to generate all the icons and files
- Replace the contents of `app/images/favicons`
- Uncomment necessary lines in `webapp/views/head.twig`

## How can I add meta tags for SEO and social media?
- Add a `meta` field to your story and use the custom field type `meta`
- Uncomment necessary lines in `webapp/views/head.twig`
- Replace UPPERCASE_PLACEHOLDERS in `webapp/views/head.twig`

## How can I add sharing buttons?



> [Netural](https://www.netural.com/) & [Storyblok](https://www.storyblok.com/)
