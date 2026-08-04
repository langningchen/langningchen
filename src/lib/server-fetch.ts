const DEFAULT_TIMEOUT_MS = 6_000;
const DEFAULT_CACHE_SECONDS = 300;

interface ServerFetchOptions {
  bypassCache?: boolean;
  timeoutMs?: number;
}

interface WorkerCacheStorage extends CacheStorage {
  default?: Cache;
}

function getWorkerCache(): Cache | null {
  const workerGlobal = globalThis as typeof globalThis & {
    caches?: WorkerCacheStorage;
  };
  return workerGlobal.caches?.default ?? null;
}

function getCacheKey(
  input: RequestInfo | URL,
  init: RequestInit,
): Request | null {
  const method = (init.method ?? (input instanceof Request ? input.method : "GET"))
    .toUpperCase();
  if (method !== "GET") return null;

  const url = input instanceof Request ? input.url : input.toString();
  return new Request(url, { method: "GET" });
}

async function storeResponse(
  cache: Cache,
  key: Request,
  response: Response,
): Promise<void> {
  const headers = new Headers(response.headers);
  headers.delete("set-cookie");
  headers.set("Cache-Control", `public, max-age=${DEFAULT_CACHE_SECONDS}`);

  await cache.put(
    key,
    new Response(response.clone().body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    }),
  );
}

export async function fetchFromServer(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: ServerFetchOptions = {},
): Promise<Response> {
  const { bypassCache = false, timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  const cache = bypassCache ? null : getWorkerCache();
  const cacheKey = getCacheKey(input, init);
  const cachedResponse = cache && cacheKey
    ? await cache.match(cacheKey)
    : undefined;
  if (cachedResponse) return cachedResponse;

  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (response.status === 200 && cache && cacheKey) {
    try {
      await storeResponse(cache, cacheKey, response);
    } catch {
      // The upstream response remains usable when edge caching is unavailable.
    }
  }

  return response;
}
