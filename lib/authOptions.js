import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./db";
import User from "./models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                await dbConnect();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Check if this is the designated admin email
                    const isAdmin = user.email === process.env.ADMIN_EMAIL;

                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: isAdmin ? 'admin' : 'user',
                        googleId: account.providerAccountId
                    });
                }
                return true;
            } catch (error) {
                console.error("Error saving user", error);
                return false;
            }
        },
        async session({ session, token }) {
            if (session.user) {
                await dbConnect();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.role = dbUser.role;
                    session.user.id = dbUser._id.toString();
                }
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
