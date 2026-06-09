import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ─── Graceful Redis init ──────────────────────────────────────────────────────
// If Upstash env vars are missing the module must NOT crash at load time —
// that would kill every API route that imports this file.
// We fall back to a no-op limiter that always returns success.

type LimitResult = { success: boolean; limit: number; remaining: number; reset: number };

class PassthroughLimiter {
    async limit(_identifier: string): Promise<LimitResult> {
        return { success: true, limit: Infinity, remaining: Infinity, reset: 0 };
    }
}

function createLimiter(
    window: Parameters<typeof Ratelimit.slidingWindow>[0],
    duration: Parameters<typeof Ratelimit.slidingWindow>[1],
    prefix: string
): { limit: (id: string) => Promise<LimitResult> } {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        if (process.env.NODE_ENV !== "production") {
            console.warn(`[RateLimit] Redis not configured — rate limiting disabled for "${prefix}". Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.`);
        }
        return new PassthroughLimiter();
    }

    try {
        const redis = new Redis({ url, token });
        return new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(window, duration),
            prefix,
        });
    } catch (err) {
        console.error(`[RateLimit] Failed to initialize limiter for "${prefix}":`, err);
        return new PassthroughLimiter();
    }
}

// 5 attempts per 15 minutes — login brute force
export const loginLimiter = createLimiter(5, "15 m", "rl:login");

// 10 signups per hour per IP — bot prevention
export const signupLimiter = createLimiter(10, "1 h", "rl:signup");

// 3 attempts per hour — forgot password enumeration
export const forgotLimiter = createLimiter(3, "1 h", "rl:forgot");

// 20 generations per hour per user — Groq cost protection
export const generateLimiter = createLimiter(20, "1 h", "rl:generate");
