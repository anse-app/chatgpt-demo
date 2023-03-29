export default function plugin(platform?: string) {
  const transform = (code: string, id: string) => {
    if (id.includes('pages/api/generate.ts')) {
      return {
        code: code.replace(/^.*?#vercel-disable-blocks([\s\S]+?)#vercel-end.*?$/gm, ''),
        map: null,
      }
    }
    if (platform === 'netlify' && id.includes('layouts/Layout.astro')) {
      return {
        code: code.replace(/^.*?<!-- netlify-disable-blocks -->([\s\S]+?)<!-- netlify-disable-end -->.*?$/gm, ''),
        map: null,
      }
    }
  }

  return {
    name: 'vercel-disable-blocks',
    enforce: 'pre',
    transform,
  }
}
