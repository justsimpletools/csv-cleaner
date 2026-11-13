import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import Papa from 'papaparse'
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  FileSpreadsheet,
  FolderOpen,
  Info,
  LayoutGrid,
  Plus,
  Search,
  Upload,
  X,
} from 'lucide-react'

type CsvRow = Record<string, string>

const demoRows: CsvRow[] = [
  { Name: 'Avery Johnson', Email: 'avery@example.com', Role: 'Product Designer', Status: 'Active', Joined: '2024-01-15' },
  { Name: 'Marcus Chen', Email: 'marcus@example.com', Role: 'Engineer', Status: 'Active', Joined: '2024-02-02' },
  { Name: 'Sofia Williams', Email: 'sofia@example.com', Role: 'Researcher', Status: 'Away', Joined: '2024-02-18' },
  { Name: 'Liam Patel', Email: 'liam@example.com', Role: 'Product Manager', Status: 'Active', Joined: '2024-03-01' },
  { Name: 'Noah Smith', Email: 'noah@example.com', Role: 'Engineer', Status: 'Pending', Joined: '2024-03-12' },
]

function App() {
  const [rows, setRows] = useState<CsvRow[]>([])
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const columns = rows.length > 0 ? Object.keys(rows[0]) : []
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => value.toLowerCase().includes(search.toLowerCase())),
  )

  const loadFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) return
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setRows(result.data)
        setFileName(file.name)
        setSearch('')
      },
    })
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) loadFile(file)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) loadFile(file)
  }

  const showDemo = () => {
    setRows(demoRows)
    setFileName('team_directory.csv')
  }

  const clearFile = () => {
    setRows([])
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-ink">
      <header className="border-b border-slate-200/80 bg-white/80">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
              <BarChart3 size={19} strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-bold tracking-[-0.03em]">CSV Lens</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] font-medium text-muted">
            <a href="#how-it-works" className="hidden transition-colors hover:text-ink sm:block">How it works</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 transition-colors hover:text-ink">
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-6 pb-20">
        <section className="mx-auto max-w-[770px] pb-10 pt-16 text-center sm:pt-20">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-lavender px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6159b7]">
            <LayoutGrid size={13} /> Data, at a glance
          </div>
          <h1 className="text-[42px] font-bold leading-[1.08] tracking-[-0.055em] text-navy sm:text-[56px]">
            See your CSV clearly.
          </h1>
          <p className="mx-auto mt-5 max-w-[550px] text-[16px] leading-7 text-muted">
            Drop in a file to explore your data in a clean, spreadsheet-like view. Your data stays right here in your browser.
          </p>
        </section>

        {rows.length === 0 ? (
          <section
            onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`mx-auto max-w-[760px] rounded-2xl border-2 border-dashed bg-white px-6 py-14 text-center shadow-panel transition-colors sm:py-16 ${isDragging ? 'border-coral bg-orange-50/40' : 'border-slate-300'}`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0eb] text-coral">
              <Upload size={25} strokeWidth={2} />
            </div>
            <h2 className="mt-5 text-[18px] font-bold text-navy">Drop your CSV here</h2>
            <p className="mt-2 text-[13px] text-muted">or choose a file from your computer</p>
            <input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={onFileChange} />
            <button onClick={() => inputRef.current?.click()} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#e9684b]">
              <FolderOpen size={16} /> Choose CSV file
            </button>
            <p className="mt-5 text-[11px] text-slate-400">CSV files up to 50 MB · Nothing leaves your browser</p>
            <button onClick={showDemo} className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-semibold text-navy underline decoration-slate-300 underline-offset-4 transition hover:decoration-navy">
              <Plus size={14} /> Try with sample data
            </button>
          </section>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf8f1] text-[#2e9b62]"><FileSpreadsheet size={18} /></div>
                <div><p className="text-[13px] font-bold text-navy">{fileName}</p><p className="mt-0.5 text-[11px] text-muted">Ready to explore</p></div>
                <span className="ml-1 rounded-full bg-mint px-2 py-1 text-[10px] font-bold text-[#26794d]">CSV</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search rows..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-[12px] outline-none transition focus:border-coral sm:w-[190px]" />
                </div>
                <button onClick={clearFile} aria-label="Close file" className="rounded-lg border border-slate-200 p-2 text-muted transition hover:border-slate-300 hover:text-ink"><X size={15} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x border-b border-slate-200 sm:grid-cols-4">
              <Stat label="Rows" value={rows.length.toLocaleString()} />
              <Stat label="Columns" value={columns.length.toString()} />
              <Stat label="Showing" value={`${filteredRows.length} rows`} />
              <Stat label="Empty cells" value={countEmpty(rows).toString()} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left text-[12px]">
                <thead><tr className="bg-[#fafbfe]">{columns.map((column, index) => <th key={column} className="border-b border-r border-slate-200 px-5 py-3 font-bold text-muted"><span className="mr-2 text-[10px] font-normal text-slate-400">{String.fromCharCode(65 + index)}</span>{column}<ChevronDown size={13} className="ml-2 inline text-slate-300" /></th>)}</tr></thead>
                <tbody>{filteredRows.map((row, rowIndex) => <tr key={`${rowIndex}-${row[columns[0]]}`} className="transition hover:bg-[#fbfcff]">{columns.map((column) => <td key={column} className="border-b border-r border-slate-100 px-5 py-3.5 text-slate-600">{row[column] || <span className="italic text-slate-300">empty</span>}</td>)}</tr>)}</tbody>
              </table>
            </div>
            {filteredRows.length === 0 && <div className="py-12 text-center text-sm text-muted">No rows match “{search}”.</div>}
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-[11px] text-muted">
              <span>Showing {filteredRows.length} of {rows.length} rows</span><span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#2e9b62]" /> Local preview</span>
            </div>
          </section>
        )}

        <section id="how-it-works" className="mx-auto mt-16 max-w-[860px]">
          <div className="mb-7 flex items-center justify-center gap-3 text-center"><div className="h-px flex-1 bg-slate-200" /><span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Simple by design</span><div className="h-px flex-1 bg-slate-200" /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Step number="01" title="Upload" text="Choose a CSV or drag it into the window." />
            <Step number="02" title="Explore" text="Scan rows, columns, and values at a glance." />
            <Step number="03" title="Understand" text="Quick stats reveal the shape of your data." />
          </div>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400"><Info size={13} /> CSV Lens is private by default. Files are parsed locally and never uploaded.</p>
        </section>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="px-5 py-4"><p className="text-[11px] font-medium text-muted">{label}</p><p className="mt-1 text-[16px] font-bold text-navy">{value}</p></div>
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-[11px] font-bold text-coral">{number}</p><h3 className="mt-3 text-[14px] font-bold text-navy">{title}</h3><p className="mt-1.5 text-[12px] leading-5 text-muted">{text}</p></div>
}

function countEmpty(data: CsvRow[]) {
  return data.reduce((count, row) => count + Object.values(row).filter((value) => !value.trim()).length, 0)
}

export default App
