export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        console.error(
            "[Turnstile] TURNSTILE_SECRET_KEY is not set. " +
            "Add it to Vercel env vars. Get keys at https://dash.cloudflare.com → Turnstile"
        );
        return false;
    }

    // Cloudflare test always-pass secret — skip remote call in dev/staging
    if (secret === "1x0000000000000000000000000000000AA") {
        console.warn("[Turnstile] Using test secret — OK for dev, must use real keys in production.");
        return true;
    }

    try {
        const body: Record<string, string> = { secret, response: token };
        if (ip) body.remoteip = ip;

        const res = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();

        if (!data.success) {
            const codes: string[] = data["error-codes"] ?? [];
            console.error("[Turnstile] Verification failed. Error codes:", codes.join(", ") || "none");

            // Helpful hints per error code
            if (codes.includes("invalid-input-secret")) {
                console.error(
                    "[Turnstile] → TURNSTILE_SECRET_KEY does not match NEXT_PUBLIC_TURNSTILE_SITE_KEY. " +
                    "Both must come from the SAME site in your Cloudflare Turnstile dashboard."
                );
            }
            if (codes.includes("timeout-or-duplicate")) {
                console.error(
                    "[Turnstile] → Token was already used or expired. " +
                    "The widget must be reset after every failed submission."
                );
            }
        }

        return data.success === true;
    } catch (err) {
        console.error("[Turnstile] Network error calling Cloudflare:", err);
        return false;
    }
}
