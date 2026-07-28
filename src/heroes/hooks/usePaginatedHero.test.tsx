import { renderHook, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { usePaginatedHero } from './usePaginatedHero'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action'


vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn()
}))

const mockGetHeroesByPagesAction = vi.mocked(getHeroesByPageAction)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const tanStackCustomprovider = () => {

    return ({ children }: PropsWithChildren) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }
}


describe('usePaginatedHero', () => {

    beforeEach(() => {
        vi.clearAllMocks()
        queryClient.clear()
    })

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomprovider()
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)

    })


    test('should return success state with data when API call succeeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        }

        mockGetHeroesByPagesAction.mockResolvedValue(mockHeroesData)

        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomprovider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPagesAction).toHaveBeenCalled()
        expect(mockGetHeroesByPagesAction).toHaveBeenCalledWith(1, 6, 'all')
    })


    test('should call getHeroesByPageActions with arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        }

        mockGetHeroesByPagesAction.mockResolvedValue(mockHeroesData)

        const { result } = renderHook(() => usePaginatedHero(1, 6, 'heroesABC'), {
            wrapper: tanStackCustomprovider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPagesAction).toHaveBeenCalled()
        expect(mockGetHeroesByPagesAction).toHaveBeenCalledWith(1, 6, 'heroesABC')
    })
})