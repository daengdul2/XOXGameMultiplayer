import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

await redis.set("foo", "bar");
await redis.get("foo");
