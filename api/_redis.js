import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://tolerant-sparrow-8867.upstash.io',
  token: 'ASKjAAImcDJjNWY0ZTdiMjdiNjE0NGRhYWQxMzU1YWM2NTE0NjE0NHAyODg2Nw',
})

await redis.set("foo", "bar");
await redis.get("foo");
