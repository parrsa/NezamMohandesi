"use client";
import { ReactNode, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "@/app/core/config/ReactQuery";

interface QueryProviderProps {
    children: ReactNode;
    dehydratedState?: any;
}

export default function QueryProvider({
    children,
    dehydratedState,
}: QueryProviderProps) {
    const queryClient = new QueryClient(queryClientConfig);
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
