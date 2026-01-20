import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

/**
 * Validates that the request comes from an authenticated admin.
 * Checks for either a Bearer token OR a valid Admin Session.
 */
export async function authenticateAdmin(request) {
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    // 1. Check Secret Key (API calls from external scripts)
    // For safety, require the secret if set & provided.
    if (adminSecret && authHeader === `Bearer ${adminSecret}`) {
        return true;
    }

    // 2. Check Session (Browser calls from Admin Dashboard)
    try {
        const session = await getServerSession(authOptions);
        if (session && session.user && session.user.role === 'admin') {
            return true;
        }
    } catch (e) {
        console.error("Session auth check failed:", e);
    }

    return false;
}
