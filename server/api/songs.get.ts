import type { SongsPayload } from "~/types/songs"

export default defineCachedEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()
  return $fetch<SongsPayload>(`${runtimeConfig.public.apiBase}api/v1/songs`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
}, {
  maxAge: 60 * 10 // 10分
})
