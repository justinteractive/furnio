'use client';

import { useUser } from '@auth0/nextjs-auth0';

export function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <a href="/auth/login">Login</a>;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
