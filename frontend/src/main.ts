import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

void async function() {
  const platform = platformBrowserDynamic();
  await platform.bootstrapModule(AppModule);
}()
