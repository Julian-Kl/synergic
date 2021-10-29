import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { baseUrl } from './baseUrl'
import fetch from 'cross-fetch'

export const client = new ApolloClient({
    link: new HttpLink({ uri: `${baseUrl}/graphql`, fetch }),
    cache: new InMemoryCache(),
})