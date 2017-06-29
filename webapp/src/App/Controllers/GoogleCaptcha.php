<?php

namespace App\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

/*
* Validates the google captcha
* http://localhost:4200/api/googlecaptcha/
*/
class GoogleCaptcha implements ControllerProviderInterface {

    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $controllers->post('/', function (Request $request) use ($app) {

            $requestData = $app['request']->request->all();

            if (!array_key_exists('g-recaptcha-response', $requestData)) {
                return $app->json( array( 'success' => false, 'message' => 'g-recaptcha-response not found' ), 400);
            }

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $app['recaptcha.url']);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'response=' . $requestData['g-recaptcha-response'] . '&secret=' . $app['recaptcha.secret']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec ($ch);
            curl_close ($ch);

            $google_response = json_decode($result, true);

            if($google_response['success']) {
                // Do whatever you want to do after the google captcha succeed
                // $formData = $requestData['formData'];

                return $app->json( array( 'success' => true, 'message' => 'google captcha success', 'result' => $result ), 200);
            }

            return $app->json( array( 'success' => false, 'message' => 'google response failed' ), 400);
        });

        return $controllers;
    }

}

