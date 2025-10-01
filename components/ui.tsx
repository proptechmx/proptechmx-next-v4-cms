import React from 'react'

export function Button({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all border border-zinc-200 ' + className} {...props} />
}
export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={'rounded-2xl shadow-sm border border-zinc-200 bg-white ' + className}>{children}</div>
}
export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={'p-4 border-b border-zinc-100 ' + className}>{children}</div>
}
export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={'p-4 ' + className}>{children}</div>
}
