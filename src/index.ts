import './index.css';
import Routes from './routes.svelte';
//import {writable} from "svelte/store";

new Routes({
  target: document.body,
  /*hydrate: true*/
});

if ('Tray' in window['nw']) new window['nw'].Tray({
  title: 'MyApp',
  tooltip: 'MyApp is running',
  icon: './favicon-32x32.png',
});

/*export const title = writable("Test Dynamic");
title.subscribe((t) => {
  document.title = t;
})
setTimeout(() => {
    title.set("asdf");
  },
  2000)*/
