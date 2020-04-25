import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './index';

describe("Header Component", () => {
    const menu = ['top', 'active'];

    it('Renders component', async () => {
        const menu = ['top', 'active']
        const { container } = render(<Header menu={menu} />);
        expect(container).toBeDefined();
    })

    it("list item with text 'top' has the active class ", () => {
        const { getByTestId } = render(<Header menu={menu} activeItem='top' />);
        const elem = getByTestId('top');
        expect(elem.classList[0]).toBe('active');
    })
    
})