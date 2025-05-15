<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Providers\CloudflareStreamService\CloudflareStream;

class CloudflareStreamServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton('cloudflare-stream', function () {
            return new CloudflareStream();
        });
    }


    /**
     * Bootstrap package services
     *
     * @return void
     */
    public function boot(): void
    {
        $this->publishes([
            __DIR__ . '/../config/cloudflare-stream.php' => config_path('cloudflare-stream.php')
        ]);
    }
}
