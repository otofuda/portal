import type { ComicPayload } from '~/types/comics'

export default defineCachedEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()
  return $fetch<ComicPayload>(`${runtimeConfig.public.apiBase}api/v1/comics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken },
  })
}, {
  maxAge: 60 * 10, // 10分
})
