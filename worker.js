export const api = {
  icon: '🚀',
  name: 'jsn.do',
  description: 'JSON URL to JSON body converter.',
  url: 'https://jsn.do/api',
  type: 'https://apis.do/templates',
  endpoints: {
    convert: 'https://jsn.do/:jsonBody'
  },
  site: 'https://jsn.do',
  login: 'https://jsn.do/login',
  signup: 'https://jsn.do/signup',
  subscribe: 'https://jsn.do/subscribe',
  repo: 'https://github.com/drivly/jsn.do',
}

export const gettingStarted = [
  `If you don't already have a JSON Viewer Browser Extension, get that first:`,
  `https://extensions.do`,
]

export const examples = {
  listItems: 'https://jsn.do/{ "hello": "world", "true": false }',
}

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    if (rootPath) return json({ api, gettingStarted, examples, user })
    
    let data
    
    try {
      data = JSON.parse(pathSegments.join('/')) // Converts all path segments ignoring slashes
    } catch (e) {
      return new Response('{ "success": false, "error": "Failed to parse JSON." }', { headers: { ContentType: 'application/json; charset=utf-8' }, status: 400 })
    }
    
    return json(data)
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
