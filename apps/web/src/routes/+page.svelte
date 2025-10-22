<script lang="ts">
	import { onMount } from 'svelte';
	import { gql } from '@apollo/client/core';
	import { client } from '$lib/apolloClient';

	let message = 'Loading...';

	const HELLO_QUERY = gql`
		query Hello {
			hello
		}
	`;

	onMount(async () => {
		try {
			const { data } = await client.query({ query: HELLO_QUERY });
			message = data.hello;
		} catch (e) {
			message = 'Error: ' + (e as Error).message;
		}
	});
</script>

<main class="mt-16 text-center text-xl">
	<h1>{message}</h1>
</main>
