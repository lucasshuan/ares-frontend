import NextAuth from "next-auth";
import authConfig from "./auth.config";

const handler = NextAuth({
  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      console.log("###user", user);
      console.log("###account", account);
      console.log("###profile", profile);
      console.log("###email", email);
      console.log("###credentials", credentials);
      return true;
    },
  },
  ...authConfig,
});

export { handler as GET, handler as POST };
