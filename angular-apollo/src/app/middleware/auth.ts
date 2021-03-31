import { setContext } from '@apollo/client/link/context';
import { TOKEN_KEY } from 'src/app/shared/constants';

const createAuthLink = setContext((operation, context) => {
	const authToken = sessionStorage.getItem(TOKEN_KEY);
	if (!authToken) return {};
	const { token } = JSON.parse(authToken);
	return {
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Authorization: `Bearer ${token}`,
		},
	};
});

export { createAuthLink };