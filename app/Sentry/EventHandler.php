<?php
declare(strict_types=1);

namespace App\Sentry;

use Illuminate\Contracts\Foundation\Application;

class EventHandler implements Contracts\EventHandler
{
    public function __construct(private Application $application, private array $handlers)
    {
    }

    public function handle(array $event): array
    {
        foreach ($this->handlers as $handler) {
            $event = $this->application[$handler]->handle($event);
        }

        return $event;
    }
}
