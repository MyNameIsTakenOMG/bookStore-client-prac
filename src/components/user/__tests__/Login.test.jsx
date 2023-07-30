import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../../../util/testUtil';
import Login from '../Login';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as userslice from '../../../redux-store/userSlice';

describe('Login', () => {
  it('should show required error message for user email and password', async () => {
    await act(() => {
      renderWithProviders(<Login />, {});
    });
    const submit = await screen.findByText(/login/);
    fireEvent.submit(submit);

    expect(await screen.findByText('email is required')).toBeInTheDocument();
    expect(await screen.findByText('password is required')).toBeInTheDocument();
  });

  it('should show email and password invalid messages', async () => {
    await act(() => {
      renderWithProviders(<Login />, {});
    });
    const passwordField = screen.getByLabelText('enter password');
    const emailField = screen.getByLabelText('enter email address');

    fireEvent.change(emailField, { target: { value: 'wrongemail' } });
    fireEvent.change(passwordField, { target: { value: 'wrongP' } });

    const submit = await screen.findByText(/login/);
    fireEvent.submit(submit);

    expect(
      await screen.findByText('enter valid email address')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('password should be at least 8 characters')
    ).toBeInTheDocument();
  });

  it('should dispatch a login action when valid email and password are provided', async () => {
    await act(() => {
      renderWithProviders(<Login />, {});
    });

    const loginSpyOn = jest.spyOn(userslice, 'login');

    const passwordField = screen.getByLabelText('enter password');
    const emailField = screen.getByLabelText('enter email address');

    fireEvent.change(emailField, { target: { value: 'peter@peter.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });

    const submit = await screen.findByText(/login/);
    fireEvent.submit(submit);

    await waitFor(() => {
      expect(loginSpyOn).toHaveBeenCalledWith({
        email: 'peter@peter.com',
        password: 'password',
      });
    });
  });
});
