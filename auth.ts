import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // TEMPORAL USER INFO
          const mockUser = {
            id: '1',
            name: 'Jonatan Troche',
            email: 'user@nextmail.com',
            password: await bcrypt.hash('123456', 10), 
          };

          if (email === mockUser.email) {
            const passwordsMatch = await bcrypt.compare(password, mockUser.password);
            if (passwordsMatch) return mockUser;
          }
        }
        return null;
      },
    }),
  ],
});