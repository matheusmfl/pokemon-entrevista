'use client'
import { QueryClient, QueryClientProvider as QueryClientProviderReactQuery } from '@tanstack/react-query'
import React from 'react'

export const queryClient = new QueryClient()

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProviderReactQuery client={queryClient}>{children}</QueryClientProviderReactQuery>
}

export default QueryClientProvider