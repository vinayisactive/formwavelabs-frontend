import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    id: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    name?: string;
    email?: string;
  }
}