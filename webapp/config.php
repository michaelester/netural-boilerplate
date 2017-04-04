<?php

$app['debug']                   = true;
$app['config.twig.cache']       = false;
$app['config.redirect_home']    = true;

$app['config.version']           = @file_get_contents(PUBLIC_DIR . '/version.cache'); // initializes with git hash

$app['config.home']             = 'home';
$app['storyblok.privateToken']  = 'BDwvpxjAtw8YNdVwjsSJLwtt';