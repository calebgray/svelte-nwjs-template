import './index.css';
import Index from './pages/Index.svelte';
import {writable} from "svelte/store";

new Index({
  target: document.body,
});

new window['nw'].Tray({
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
