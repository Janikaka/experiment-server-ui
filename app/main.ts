import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routers';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
]);