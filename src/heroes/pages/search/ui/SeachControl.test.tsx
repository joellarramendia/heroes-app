import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, test, expect, } from 'vitest'
import { SearchControl } from './SearchControl'

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControl />
        </MemoryRouter>
    )
}

describe('SearchControl', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter()

        expect(container).toMatchSnapshot()
    })


    test('should set input value when search para name is set', () => {
        renderWithRouter(['/?name=Batman'])

        const input = screen.getByPlaceholderText('Buscar heroes, villanos, poderes, equipos...')

        expect(input.getAttribute('value')).toBe('Batman')
    })


    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman'])

        const input = screen.getByPlaceholderText('Buscar heroes, villanos, poderes, equipos...')

        expect(input.getAttribute('value')).toBe('Batman')

        fireEvent.change(input, { target: { value: 'Superman' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(input.getAttribute('value')).toBe('Superman')


    })

})