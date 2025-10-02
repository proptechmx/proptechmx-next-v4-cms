export const PROJECT_CARD_QUERY = `
*[_type=="project"]|order(_createdAt desc){
  title,
  "slug": slug.current,
  city,
  status,
  tir,
  termMonths,
  minTicket,
  goal,
  funded,
  risk,
  summary,
  "cover": coverImage.asset->url
}
`

export const PROJECT_DETAIL_QUERY = `
*[_type=="project" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  city,
  status,
  tir,
  termMonths,
  minTicket,
  goal,
  funded,
  risk,
  summary,
  "cover": coverImage.asset->url,
  "docs": documents[]{
    "name": asset->originalFilename,
    "url": asset->url
  }
}
`

// lib/queries.ts
export const homeProjectsQuery = /* groq */ `
*[_type == "project"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  summary,
  city,
  status,
  "cover": coalesce(cover.asset->url, images[0].asset->url)
}
`;

// lib/queries.ts (añade esto a tu archivo)
export const projectsListQuery = /* groq */ `
*[_type == "project" && (!defined($status) || status == $status)]
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  city,
  status,
  "cover": coalesce(cover.asset->url, images[0].asset->url)
}
`;
