<script lang="ts">
	import { Router, Route, Link } from 'svelte-routing';
	import Home from './pages/Home.svelte';
	import About from './pages/About.svelte';
	import Blog from './pages/Blog.svelte';

	export let url = '/#';
</script>

<Router url="{url}">
	<nav>
		<Link to="/">Home</Link>
		<Link to="/blog">Blog</Link>
		<Link to="/about">About</Link>
	</nav>
	<div>
		<Route path="/" component="{Home}" />
		<Route path="/blog" component="{Blog}" />
		<Route path="/about" component="{About}" />
	</div>
</Router>
