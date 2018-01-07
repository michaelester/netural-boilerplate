<?php

$app['config.twig.cache']                   = false;
$app['config.version']                      = @file_get_contents(PUBLIC_DIR . '/version.cache');

$app['config.redirectHome']                 = false;
$app['config.homeSlug']                     = 'home'; // Slug for the story which should be renderen on /

$app['storyblok.previewToken']              = ''; // You find the preview token in the dashboard of your space

$app['config.host.test']                    = ''; // e.g. preview.website.com
$app['config.host.live']                    = ''; // e.g. www.website.com

$app['config.meta.brandName']               = ''; // For the meta title

$app['config.recaptcha.slugs']              = array(); // Slugs of pages where the recaptcha should be embedded
$app['config.recaptcha.secret']             = ''; // You get the secret at https://www.google.com/recaptcha
$app['config.recaptcha.url']                = 'https://www.google.com/recaptcha/api/siteverify';

$app['config.contactform.googleScriptUrl']  = '';
$app['config.contactform.email.test']       = '';
$app['config.contactform.email.live']       = '';
