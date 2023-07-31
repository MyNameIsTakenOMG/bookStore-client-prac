import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../util/testUtil';
import Register from '../Register';
import * as userslice from '../../../redux-store/userSlice';

describe('Registration', () => {
  it('should display name, email, password, and register btn', async () => {
    await act(() => {
      renderWithProviders(<Register />, {});
    });
    expect(screen.getByLabelText('enter email address')).toBeInTheDocument();
    expect(screen.getByLabelText('enter password')).toBeInTheDocument();
    expect(screen.getByLabelText('enter user name')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  it('should show required error message when clicking register button', async () => {
    await act(() => {
      renderWithProviders(<Register />, {});
    });
    fireEvent.submit(screen.getByText('register'));
    expect(await screen.findByText('email is required')).toBeInTheDocument();
    expect(await screen.findByText('password is required')).toBeInTheDocument();
    expect(await screen.findByText('name is required')).toBeInTheDocument();
  });

  it('should show email, password error messages', async () => {
    await act(() => {
      renderWithProviders(<Register />, {});
    });
    fireEvent.change(screen.getByLabelText('enter email address'), {
      target: { value: 'wrongEmail' },
    });
    fireEvent.change(screen.getByLabelText('enter password'), {
      target: { value: 'wrongP' },
    });
    fireEvent.change(screen.getByLabelText('enter user name'), {
      target: { value: 'username' },
    });

    fireEvent.submit(screen.getByText('register'));

    expect(
      await screen.findByText('should be an valid email')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('password should be at least 8 chars')
    ).toBeInTheDocument();
  });

  it('should dispatch register action when valid user info provided', async () => {
    await act(() => {
      renderWithProviders(<Register />, {});
    });

    const registerSpyOn = jest.spyOn(userslice, 'register');

    fireEvent.change(screen.getByLabelText('enter email address'), {
      target: { value: 'peter@peter.com' },
    });
    fireEvent.change(screen.getByLabelText('enter password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByLabelText('enter user name'), {
      target: { value: 'username' },
    });
    fireEvent.submit(screen.getByText('register'));
    await waitFor(() => {
      expect(registerSpyOn).toHaveBeenCalledWith({
        name: 'username',
        email: 'peter@peter.com',
        password: 'password',
      });
    });
  });
});
