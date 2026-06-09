export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        console.error(
            "[Turnstile] TURNSTILE_SECRET_KEY is not set. " +
            "Add it to your Vercel environment variables. " +
            "Get your keys at https://dash.cloudflare.com/?to=/:account/turnstile"
        );
        return false;
    }

    // Cloudflare test keys — always-pass secret silently skips server verification
    // (used in dev/staging only; swap for real keys in production)
    const ALWAYS_PASS_SECRET = "1x0000000000000000000000000000000AA";
    if (secret === ALWAYS_PASS_SECRET) {
        console.warn("[Turnstile] Using test always-pass secret — switch to production keys.");
        return true;
    }

    try {
        const res = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret,
                    response: token,
                    ...(ip && { remoteip: ip }),
                }),
            }
        );
        const data = await res.json();
        if (!data.success) {
            console.error("[Turnstile] Verification failed:", JSON.stringify(data["error-codes"]));
        }
        return data.success === true;
    } catch (err) {
        console.error("[Turnstile] Fetch error:", err);
        return false;
    }
}
