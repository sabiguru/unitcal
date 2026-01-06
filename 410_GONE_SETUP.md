# 410 Gone Status Implementation

This document explains the 410 (Gone) HTTP status implementation for URLs that no longer exist on calcfort.com.

## What was implemented

A Next.js middleware has been created at `src/middleware.ts` that intercepts requests to 168 URLs from the `calcfortURLs.txt` file and returns a 410 Gone HTTP status code.

## How it works

1. **Middleware Interception**: When a request comes in, the middleware checks if the requested path matches any URL in the `goneUrls` Set.

2. **410 Response**: If a match is found, the middleware returns:
   - HTTP Status: `410 Gone`
   - A user-friendly HTML page explaining the page is permanently gone
   - Cache-Control header set to 1 year (since these pages won't come back)

3. **Normal Processing**: If no match is found, the request continues normally through Next.js routing.

## Benefits for SEO

- **Tells Google the truth**: A 410 status explicitly tells search engines that the page is gone permanently and won't return
- **Better than 404**: Google treats 410s as a stronger signal to remove URLs from the index faster than 404s
- **Preserves crawl budget**: Search engines will stop wasting resources trying to crawl these pages
- **Clean index**: Helps clean up your Google Search Console index faster

## URLs affected

All 168 URLs from `calcfortURLs.txt` are now returning 410 status, including:
- Old learn pages (e.g., `/learn/mathematics/basic`, `/learn/engineering/ohms-law`)
- Old calculator paths (e.g., `/calculator/loan`, `/calculator/age`)
- Broken URLs with typos (e.g., `/learutomotive/fuel-cost`, `/learrea`)
- Old category pages (e.g., `/category/automotive`, `/category/mathematics`)
- Old static assets (e.g., `/_next/static/media/...`)

## Testing

You can test this locally by:

```bash
npm run dev
```

Then visit any of the URLs like `http://localhost:3000/learn/mathematics/basic` and you should see:
- A "410 - This page is gone" message
- HTTP Status 410 in your browser's dev tools Network tab

## Deployment

Once you deploy this to production:
1. The middleware will automatically be included in your build
2. Google will receive 410 responses when crawling these URLs
3. Submit an updated sitemap to Google Search Console (if not already done)
4. Monitor Google Search Console to see the URLs being removed from the index

## Maintenance

If you need to add more URLs in the future:
1. Edit `src/middleware.ts`
2. Add the path to the `goneUrls` Set
3. Redeploy

Note: The paths in the Set should be the pathname only (e.g., `/learn/something`), not full URLs.
