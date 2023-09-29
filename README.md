# Points Verts - Supabase and next.js

## Dev setup

## Prerequisites
- A Supabase project
- A Mapbox token

### Environment variables

You need to create a local `.env` file with the following variables:


```
# for Client Components
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
NEXT_PUBLIC_MAPBOX_TOKEN=<your mapbox token>
NEXT_PUBLIC_MAPBOX_USERNAME=mapbox
NEXT_PUBLIC_MAPBOX_STYLE=outdoors-v12

# for Server Components
MAPBOX_TOKEN=<your mapbox token>
MAPBOX_USERNAME=mapbox
MAPBOX_STYLE=outdoors-v12
```

### Run development server

```
npm run dev
```

### Create a production build

```
npm run build
```

### Test locally the production build

```
npm run start
```