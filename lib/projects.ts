export type Project = {
  id: string
  status: 'Financiando' | 'En obra' | 'Pagado'
  title: string
  city: string
  img: string
  tir: number
  termMonths: number
  minTicket: number
  goal: number
  funded: number
  risk: 'Bajo' | 'Moderado' | 'Alto'
}
export const projects: Project[] = [
  { id:'prj-1', status:'Financiando', title:'Torre Bahía – Preventa', city:'Hermosillo, SON', img:'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', tir:18.5, termMonths:14, minTicket:1000, goal:8500000, funded:4720000, risk:'Moderado' },
  { id:'prj-2', status:'En obra', title:'Lofts Centro – Renta temporal', city:'CDMX, CUAU', img:'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop', tir:15.2, termMonths:10, minTicket:1000, goal:5600000, funded:5600000, risk:'Bajo' },
  { id:'prj-3', status:'Pagado', title:'Casas del Mar – Flipping', city:'Bahía de Kino, SON', img:'https://images.unsplash.com/photo-1494526585095-280d5d1e61bb?q=80&w=1200&auto=format&fit=crop', tir:20.1, termMonths:8, minTicket:1000, goal:3200000, funded:3200000, risk:'Alto' },
]
