'use client'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import React from 'react'


const ReactQueryProvider = ({children}:any) => {
    const queryClient = new QueryClient;
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
    
  )
}

export default ReactQueryProvider;