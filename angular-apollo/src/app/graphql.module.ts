import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, from } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { createAuthLink } from './middleware/auth';


export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
	const link = from([
		createAuthLink,
		httpLink.create({ uri: environment.graphqlApi }),
	]);

	return {
		link,
		cache: new InMemoryCache(),
		connectToDevTools: !environment.production,
	};
};

@NgModule({
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}