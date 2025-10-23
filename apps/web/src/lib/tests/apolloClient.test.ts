import { describe, it, expect, vi } from 'vitest';
import { client } from '../apolloClient';
import { gql } from '@apollo/client/core';

vi.spyOn(client, 'query').mockResolvedValue({
	data: { hello: 'Mocked Hello GraphQL!' }
});

describe('GraphQL Client', () => {
	it('should query hello message', async () => {
		const HELLO_QUERY = gql`
			query Hello {
				hello
			}
		`;

		const result = await client.query({ query: HELLO_QUERY });
		expect(result.data.hello).toBe('Mocked Hello GraphQL!');
	});
});
