<?php

$app['debug']                   = true;
$app['config.twig.cache']       = false;
$app['config.redirect_home']    = false;

$app['config.locale']           = 'de';
$app['config.availableLocales'] = array('de');

$app['config.version']           = @file_get_contents(PUBLIC_DIR . '/version.cache'); // initializes with git hash

$app['config.home']             = 'home';
$app['storyblok.privateToken']  = '1Qk5RWfrqkHZax3uert5xQtt';

$app['recaptcha.secret']         = '<<< RECAPTCHA SECRET >>>';
$app['recaptcha.url']            = 'https://www.google.com/recaptcha/api/siteverify';
