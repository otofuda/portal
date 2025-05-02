import type { NewsPayload } from '~/types/news'

export default defineCachedEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()
  return $fetch<NewsPayload>(`${runtimeConfig.public.apiBase}api/v1/news`, {
    params: { limit: 1000, filters: 'for_portal[equals]true' },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken },
  })
}, {
  maxAge: 60 * 10, // 10分
})
