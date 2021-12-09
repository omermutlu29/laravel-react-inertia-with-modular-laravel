import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import * as Sentry from '@sentry/browser';
const context = require.context("../../Modules",true,/Pages\/(.+)\.js$/,"lazy");
InertiaProgress.init({
  color: '#ED8936',
  showSpinner: true
});

Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});
const app = document.getElementById('app');

const init = JSON.parse(app.dataset.page);
const resolver = (name) =>{
  let parts = name.split('::');
  console.log(parts,"asd");
  if (parts.length > 1){
    return context('./'+parts[0]+'/Resources/assets/js/Pages/'+parts[1]+'.js').then(module=>module.default);
  }else{
    return import('./Pages/'+name).then(module=>module.default);
  }

}

render(
  <InertiaApp
    initialPage={init}
    resolveComponent={resolver}
  />,
  app
);
