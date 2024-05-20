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
	gql,
  } from '@apollo/client'; 

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const client = new ApolloClient({
    uri: 'http://localhost:7100/graphql',
    cache: new InMemoryCache(),
  });

	return (
		<ApolloProvider client={client}>
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</NextUIProvider>
		</ApolloProvider>
	);
}
