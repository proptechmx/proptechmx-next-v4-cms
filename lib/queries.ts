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
