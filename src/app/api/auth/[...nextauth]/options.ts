import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';


interface IUserData {
  firstName: string;
  lastName: string;
  role: string;
  dob: Date;
  gender: 'male' | 'female' | 'other'; // Adjust if needed
  token: string;
}

interface IUserInfo {
  success: boolean;
  message: string;
  data: IUserData;
}
async function dummyLogin(): Promise<IUserInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'login successful',
        data: {
          firstName: 'saad',
          lastName: 'don',
          role: 'admin',
          dob: new Date(),
          gender: 'male',
          token: 'somerandomshit',
        },
      });
    }, 1000); // Simulating a delay of 1 second
  });
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'Email',
        },
        password: {
          label: 'password:',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials): Promise<any> {
        try {
          console.log(`${process.env.PUBLIC_BACKEND_URL}/auth/login`)

          const response = await fetch(`${process.env.PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          console.log("after responseee")

          const data = await response.json()

          console.log(data,"dataaaaaaa")
          
          if (data.success) {
            return {
              id: data.data.user?.id,
              email: data.data.user?.email,
              name: data.data.user?.name,
              accessToken: data.data.access_token,
              role: data.data.user?.role,
            }
          }
          
          return null
        } catch (error: any) {

          console.log("Error during authorization:", error.message);
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {

      console.log("jwt callback called", token, user, account, profile);  
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: 'auth/login',
  },
};
