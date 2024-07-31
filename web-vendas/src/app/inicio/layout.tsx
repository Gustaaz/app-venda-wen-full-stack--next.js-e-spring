import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 md:pl-14 lg:py-4">
        <Header />
        {children}
      </div>
    </div>
  )
}
