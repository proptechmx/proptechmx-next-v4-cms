'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Building2, X, Calculator, BarChart3, AlertTriangle, FileText, TrendingUp } from 'lucide-react'
import { Button, Card, CardHeader, CardContent } from '@/components/ui'
import type { Project } from '@/lib/projects'
import { formatCurrency } from '@/lib/utils'

export default function ProjectModal({ project, open, onClose }:{ project: Project | any, open:boolean, onClose:()=>void }) {
  const [tab, setTab] = useState<'resumen'|'finanzas'|'riesgos'|'documentos'|'comparables'>('resumen')
  if (!open || !project) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white shadow-xl border border-zinc-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5" />
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-zinc-500">{project.city} · {project.status}</p>
            </div>
          </div>
          <Button className="bg-zinc-900 text-white" onClick={onClose}><X className="w-4 h-4 mr-1" />Cerrar</Button>
        </div>
        <div className="p-4">
          <div className="relative w-full h-56 overflow-hidden rounded-xl">
            <Image src={project.img} alt="Proyecto" fill className="object-cover" />
          </div>
        </div>
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {['resumen','finanzas','riesgos','documentos','comparables'].map((k)=> (
            <Button key={k} onClick={()=>setTab(k as any)} className={tab===k?'bg-zinc-900 text-white':'bg-white'}>{k[0].toUpperCase()+k.slice(1)}</Button>
          ))}
        </div>
        <div className="p-4 space-y-4">
          {tab==='resumen' && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader><h4 className="font-semibold">Indicadores</h4></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>TIR estimada</span><strong>{project.tir}%</strong></div>
                  <div className="flex items-center justify-between"><span>Plazo</span><strong>{project.termMonths} meses</strong></div>
                  <div className="flex items-center justify-between"><span>Riesgo</span><strong>{project.risk}</strong></div>
                  <div className="flex items-center justify-between"><span>Ticket mínimo</span><strong>{formatCurrency(project.minTicket)}</strong></div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader><h4 className="font-semibold">Descripción</h4></CardHeader>
                <CardContent className="text-sm text-zinc-700">{project.summary || 'Desarrollo habitacional con estrategia de preventa y salida por escrituración.'}</CardContent>
              </Card>
            </div>
          )}
          {tab==='finanzas' && (
            <div className="grid md:grid-cols-2 gap-4">
              <Card><CardHeader><h4 className="font-semibold flex items-center gap-2"><Calculator className="w-4 h-4" />Supuestos</h4></CardHeader><CardContent className="text-sm">Ejemplo de supuestos financieros.</CardContent></Card>
              <Card><CardHeader><h4 className="font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4" />Sensibilidades</h4></CardHeader><CardContent className="text-sm">Escenario base/estresado/optimista.</CardContent></Card>
            </div>
          )}
          {tab==='riesgos' && (<Card><CardHeader><h4 className="font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Riesgos</h4></CardHeader><CardContent className="text-sm">Ejecución, comercial, legal.</CardContent></Card>)}
          {tab==='documentos' && (<Card><CardHeader><h4 className="font-semibold flex items-center gap-2"><FileText className="w-4 h-4" />Data room (muestra)</h4></CardHeader><CardContent className="text-sm">Adjunta PDFs desde el CMS.</CardContent></Card>)}
          {tab==='comparables' && (<Card><CardHeader><h4 className="font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4" />Mercado</h4></CardHeader><CardContent className="text-sm">Precios m² y cap rates de referencia.</CardContent></Card>)}
        </div>
      </div>
    </div>
  )
}
