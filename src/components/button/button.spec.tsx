import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { Button } from './button';

test('loads and displays greeting', async () => {
    const mockPress = jest.fn();
    render(<Button text='milo' onPress={mockPress} />);

    await userEvent.click(screen.getByText('milo'));

    expect(mockPress).toBeCalled();
});
