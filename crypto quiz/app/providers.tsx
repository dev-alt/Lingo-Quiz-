"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	ApolloLink,
	from,
	gql,
  } from '@apollo/client';
  import { onError } from '@apollo/client/link/error';
import { ToastProvider } from "../context/toastContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
  export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
  }
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
	  graphQLErrors.forEach(({ message, locations, path }) =>
		console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
	  );
	}
	if (networkError) {
	  console.error(`[Network error]: ${networkError}`);
	}
  });
  
  const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem('token');
	operation.setContext(({ headers = {} }) => ({
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  }
	}));
	return forward(operation);
  });
  
  const httpLink = new HttpLink({ uri: 'http://localhost:7100/graphql' });
  
  const client = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
  });
  
  export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();
	return (
		<ApolloProvider client={client}>
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
			<ToastProvider>
				<ToastContainer />
				{children}
				</ToastProvider>
				</NextThemesProvider>
		</NextUIProvider>
		</ApolloProvider>
	);
}
