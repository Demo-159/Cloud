// Cloudflare Worker para optimización avanzada de CDN
// Despliega este código en un Worker de Cloudflare para tu subdominio CDN

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Solo procesar rutas de video
  if (!url.pathname.startsWith('/video/')) {
    return new Response('Not Found', { status: 404 })
  }
  
  try {
    // Extraer URL original del parámetro
    const originalUrl = url.searchParams.get('origin')
    if (!originalUrl) {
      return new Response('Missing origin parameter', { status: 400 })
    }
    
    // Validar que sea una URL válida
    let targetUrl
    try {
      targetUrl = new URL(originalUrl)
    } catch (e) {
      return new Response('Invalid origin URL', { status: 400 })
    }
    
    // Headers de la solicitud original
    const originalHeaders = new Headers(request.headers)
    
    // Configurar headers optimizados para streaming
    const streamHeaders = {
      'User-Agent': originalHeaders.get('User-Agent') || 'Mozilla/5.0 (compatible; Stremio CDN)',
      'Accept': 'video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5',
      'Accept-Encoding': 'identity',
      'Accept-Language': 'en-US,en;q=0.5',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
    
    // Mantener headers de rango si existen (para seeking)
    if (originalHeaders.has('Range')) {
      streamHeaders['Range'] = originalHeaders.get('Range')
    }
    
    // Hacer petición al servidor original
    const response = await fetch(originalUrl, {
      method: request.method,
      headers: streamHeaders,
      cf: {
        // Configuración específica de Cloudflare
        cacheEverything: true,
        cacheTtl: 86400, // 24 horas
        cacheKey: `video:${btoa(originalUrl)}`,
        polish: 'off', // No optimizar videos automáticamente
        minify: {
          javascript: false,
          css: false,
          html: false
        }
      }
    })
    
    // Verificar que la respuesta sea exitosa
    if (!response.ok) {
      console.error(`Error fetching ${originalUrl}: ${response.status} ${response.statusText}`)
      return new Response(`Error fetching video: ${response.status}`, { 
        status: response.status 
      })
    }
    
    // Clonar respuesta para modificar headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    })
    
    // Headers optimizados para CDN y streaming
    const responseHeaders = modifiedResponse.headers
    
    // Headers de cache agresivo
    responseHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=86400')
    responseHeaders.set('Expires', new Date(Date.now() + 86400000).toUTCString())
    
    // Headers de streaming optimizado
    responseHeaders.set('Accept-Ranges', 'bytes')
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4')
    
    // Headers de seguridad
    responseHeaders.set('X-Content-Type-Options', 'nosniff')
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN')
    
    // Headers de optimización
    responseHeaders.set('X-CDN-Cache', response.cf?.cacheStatus || 'MISS')
    responseHeaders.set('X-CDN-Ray', response.cf?.ray || 'N/A')
    responseHeaders.set('X-Original-URL', originalUrl)
    
    // Headers CORS para Stremio
    responseHeaders.set('Access-Control-Allow-Origin', '*')
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
    responseHeaders.set('Access-Control-Allow-Headers', 'Range, Accept-Encoding, User-Agent')
    responseHeaders.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges')
    
    // Log para debugging
    console.log(`CDN Request: ${originalUrl} -> Status: ${response.status}, Cache: ${response.cf?.cacheStatus}`)
    
    return modifiedResponse
    
  } catch (error) {
    console.error('CDN Worker Error:', error)
    return new Response(`CDN Error: ${error.message}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      }
    })
  }
}

// Manejo de solicitudes OPTIONS para CORS
addEventListener('fetch', event => {
  if (event.request.method === 'OPTIONS') {
    event.respondWith(handleOptions(event.request))
  }
})

async function handleOptions(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Accept-Encoding, User-Agent',
      'Access-Control-Max-Age': '86400'
    }
  })
}
