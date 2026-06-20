import React, { useState } from 'react';
import { 
  LayoutDashboard, FolderPlus, Layers, TableProperties, Beaker, 
  Columns3, FileSpreadsheet, FileCheck2, FileDown, Archive, Settings,
  Plus, ChevronRight, Download, Search, Filter, AlertCircle
} from 'lucide-react';

// Mock Data for Initial State
const initialProjects = [
  { id: 1, name: 'PWD Multi-Storied Building', client: 'PWD', date: '20 Jun 2026', status: 'Completed', district: 'Dhaka', upazila: 'Mirpur' },
  { id: 2, name: 'LGED Rural Bridge Survey', client: 'LGED', date: '18 Jun 2026', status: 'Draft', district: 'Khulna', upazila: 'Dumuria' }
];

// ==========================================
// 1. MASTER MAIN CONTROLLER COMPONENT
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [projects, setProjects] = useState(initialProjects);
  
  const [activeProject, setActiveProject] = useState({
    info: { name: '', client: '', location: '', district: '', upazila: '', date: '2026-06-20' },
    borehole: { id: 'BH-01', gl: '0.0', depth: '30', waterTable: '2.5', method: 'Wash Boring' },
    sptData: [
      { depth: '1.5', n1: 3, n2: 5, n3: 6, value: 11 },
      { depth: '3.0', n1: 4, n2: 7, n3: 8, value: 15 },
      { depth: '4.5', n1: 6, n2: 10, n3: 12, value: 22 }
    ],
    labData: {
      moisture: { w1: '25.3', w2: '20.1' },
      atterberg: { ll: '42', pl: '22', pi: '20' },
      sieve: { gravel: '0', sand: '15', silt: '45', clay: '40' },
      shear: { cohesion: '25', friction: '12' }
    }
  });

  const updateProjectInfo = (field, value) => {
    setActiveProject(prev => ({
      ...prev,
      info: { ...prev.info, [field]: value }
    }));
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-green-400 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center font-black text-slate-950">BK</div>
            <span className="font-bold tracking-wider text-sm text-slate-200 uppercase">GeoLab Suite</span>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'new-project', label: '1. Project Info', icon: FolderPlus },
              { id: 'borehole', label: '2. Borehole Details', icon: Layers },
              { id: 'spt', label: '3. SPT Data Entry', icon: TableProperties },
              { id: 'lab', label: '4. Laboratory Tests', icon: Beaker },
              { id: 'profile', label: '5. Soil Layer Profile', icon: Columns3 },
              { id: 'borelog', label: '6. Generated Bore Log', icon: FileSpreadsheet },
              { id: 'report', label: '7. Engineering Report', icon: FileCheck2 },
              { id: 'preview', label: '8. Export PDF Document', icon: FileDown },
              { id: 'archive', label: 'Project Archive', icon: Archive },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400 border-l-4 border-green-500 pl-3' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-green-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-500">
          <Settings className="w-4 h-4" />
          <span>Engineered v2.0 (2026)</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-slate-900 overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          {currentScreen === 'dashboard' && <DashboardView projects={projects} setScreen={setCurrentScreen} />}
          {currentScreen === 'new-project' && <NewProjectView activeProject={activeProject} updateInfo={updateProjectInfo} setScreen={setCurrentScreen} />}
          {currentScreen === 'borehole' && <BoreholeView activeProject={activeProject} setActiveProject={setActiveProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'spt' && <SptView activeProject={activeProject} setActiveProject={setActiveProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'lab' && <LabView activeProject={activeProject} setActiveProject={setActiveProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'profile' && <SoilProfileView activeProject={activeProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'borelog' && <BorelogGeneratorView activeProject={activeProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'report' && <EngineeringReportView activeProject={activeProject} setScreen={setCurrentScreen} />}
          {currentScreen === 'preview' && <PdfPreviewView activeProject={activeProject} />}
          {currentScreen === 'archive' && <ArchiveView projects={projects} />}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 2. SUB-VIEW MODULES (PASTED DIRECTLY BELOW)
// ==========================================

function DashboardView({ projects, setScreen }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Geotechnical Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">BK Geotech Engineering field and analytics control portal.</p>
        </div>
        <button onClick={() => setScreen('new-project')} className="bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20 transition-all">
          <Plus className="w-4 h-4" /> Create New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Projects', value: '524', change: '+12 this month' },
          { label: 'Completed Reports', value: '492', change: '93.8% efficiency' },
          { label: 'Pending Analytics', value: '32', change: 'Requires lab data' },
          { label: 'Exported Dossiers', value: '1,204', change: 'PDF Format' }
        ].map((c, i) => (
          <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">{c.label}</span>
            <div className="text-3xl font-bold mt-2 text-slate-100">{c.value}</div>
            <span className="text-xs text-green-400 mt-1 block font-medium">{c.change}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800"><h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Active Structural Surveys</h3></div>
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Project Workspace Name</th>
              <th className="p-4">Authority / Client</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Operational Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-semibold text-slate-200">{p.name}</td>
                <td className="p-4"><span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded text-xs font-mono">{p.client}</span></td>
                <td className="p-4 text-slate-400">{p.date}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Completed' ? 'bg-green-400' : 'bg-amber-400'}`}></span> {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewProjectView({ activeProject, updateInfo, setScreen }) {
  return (
    <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Initial Metadata Entry</h2>
        <p className="text-slate-400 text-xs mt-1">Configure structural assignment profiles and location boundaries.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Project Boundary / Name</label>
          <input type="text" value={activeProject.info.name} onChange={(e) => updateInfo('name', e.target.value)} placeholder="e.g., LGED High School Sub-Soil Profiling" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Client Authority</label>
          <select value={activeProject.info.client} onChange={(e) => updateInfo('client', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-green-500">
            <option value="">Select Authority</option>
            <option value="LGED">LGED</option>
            <option value="PWD">PWD</option>
            <option value="HED">HED</option>
            <option value="BADC">BADC</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">District Jurisdiction</label>
          <input type="text" value={activeProject.info.district} onChange={(e) => updateInfo('district', e.target.value)} placeholder="e.g., Chattogram" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-green-500" />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button onClick={() => setScreen('borehole')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
          Next Phase <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function BoreholeView({ activeProject, setActiveProject, setScreen }) {
  const updateBorehole = (field, value) => {
    setActiveProject(prev => ({
      ...prev,
      borehole: { ...prev.borehole, [field]: value }
    }));
  };

  return (
    <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Field Borehole Configuration</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-2">BOREHOLE IDENTIFIER</label>
          <input type="text" value={activeProject.borehole.id} onChange={(e) => updateBorehole('id', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-2">WATER TABLE LEVEL (m)</label>
          <input type="number" step="0.1" value={activeProject.borehole.waterTable} onChange={(e) => updateBorehole('waterTable', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-2">DRILLING SYSTEM METHOD</label>
          <input type="text" value={activeProject.borehole.method} onChange={(e) => updateBorehole('method', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-2">TARGET FINAL DEPTH (m)</label>
          <input type="number" value={activeProject.borehole.depth} onChange={(e) => updateBorehole('depth', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100" />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button onClick={() => setScreen('spt')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
          Advance to SPT Log <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SptView({ activeProject, setActiveProject, setScreen }) {
  const addRow = () => {
    setActiveProject(prev => ({
      ...prev,
      sptData: [...prev.sptData, { depth: '', n1: 0, n2: 0, n3: 0, value: 0 }]
    }));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...activeProject.sptData];
    updated[index][field] = value;
    if (field === 'n2' || field === 'n3') {
      updated[index].value = Number(updated[index].n2 || 0) + Number(updated[index].n3 || 0);
    }
    setActiveProject(prev => ({ ...prev, sptData: updated }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Standard Penetration Test (SPT) Calculations</h2>
        <button onClick={addRow} className="border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-bold px-4 py-2 rounded-xl flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Append Depth Step
        </button>
      </div>
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400 text-xs font-bold uppercase">
            <tr>
              <th className="p-4">Horizon Depth (m)</th>
              <th className="p-4">N1 (0-15 cm)</th>
              <th className="p-4">N2 (15-30 cm)</th>
              <th className="p-4">N3 (30-45 cm)</th>
              <th className="p-4 text-green-400">Computed SPT Value (N)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {activeProject.sptData.map((row, i) => (
              <tr key={i}>
                <td className="p-3"><input type="number" step="0.5" value={row.depth} onChange={(e) => handleRowChange(i, 'depth', e.target.value)} className="bg-slate-900 border border-slate-800 text-center rounded p-1.5 w-24 text-slate-200 focus:outline-none focus:border-green-500" /></td>
                <td className="p-3"><input type="number" value={row.n1} onChange={(e) => handleRowChange(i, 'n1', e.target.value)} className="bg-slate-900 border border-slate-800 text-center rounded p-1.5 w-20 text-slate-200" /></td>
                <td className="p-3"><input type="number" value={row.n2} onChange={(e) => handleRowChange(i, 'n2', e.target.value)} className="bg-slate-900 border border-slate-800 text-center rounded p-1.5 w-20 text-slate-200" /></td>
                <td className="p-3"><input type="number" value={row.n3} onChange={(e) => handleRowChange(i, 'n3', e.target.value)} className="bg-slate-900 border border-slate-800 text-center rounded p-1.5 w-20 text-slate-200" /></td>
                <td className="p-4 font-mono font-bold text-green-400 text-base">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button onClick={() => setScreen('lab')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
          Input Laboratory Datasets <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function LabView({ activeProject, setActiveProject, setScreen }) {
  const updateLabNested = (module, key, val) => {
    setActiveProject(prev => ({
      ...prev,
      labData: {
        ...prev.labData,
        [module]: { ...prev.labData[module], [key]: val }
      }
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Laboratory Geotechnical Characterization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Beaker className="w-4 h-4 text-green-500" /> Atterberg Limits</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Liquid Limit (%)</label>
              <input type="number" value={activeProject.labData.atterberg.ll} onChange={(e) => updateLabNested('atterberg', 'll', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-200" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Plastic Limit (%)</label>
              <input type="number" value={activeProject.labData.atterberg.pl} onChange={(e) => updateLabNested('atterberg', 'pl', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-200" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Plasticity Index</label>
              <input type="number" value={activeProject.labData.atterberg.pi} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-400 font-mono" disabled />
            </div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Columns3 className="w-4 h-4 text-green-500" /> Mechanical Sieve Breakdown</h3>
          <div className="grid grid-cols-4 gap-2">
            {['gravel', 'sand', 'silt', 'clay'].map((type) => (
              <div key={type}>
                <label className="text-xs text-slate-500 block mb-1 capitalize">{type} %</label>
                <input type="number" value={activeProject.labData.sieve[type]} onChange={(e) => updateLabNested('sieve', type, e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={() => setScreen('profile')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
          Generate Stratigraphy Profile <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SoilProfileView({ activeProject, setScreen }) {
  const layers = [
    { span: '0.0m - 1.5m', type: 'Loose Fill Structural Silt', bg: 'from-amber-800 to-amber-900', desc: 'Composed of organic debris and variable sandy clay fill.' },
    { span: '1.5m - 4.5m', type: 'Highly Compressible Soft Clay', bg: 'from-slate-700 to-slate-800', desc: 'Alluvial gray fat clay exhibiting soft consistency.' },
    { span: '4.5m - 12.0m', type: 'Medium Dense Alluvial Fine Sand', bg: 'from-yellow-600/80 to-yellow-700/80', desc: 'Micaceous silty sand layers with medium bearing profiles.' },
    { span: '12.0m - 30.0m', type: 'Very Dense Silty Sand Stratum', bg: 'from-amber-600/60 to-yellow-600/40', desc: 'Deep gray dense execution sand, exceptional structural resistance.' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Stratigraphic Soil Cross-Section Map</h2>
        <p className="text-slate-400 text-xs">Simulated mathematical model rendering according to SPT correlation charts.</p>
      </div>
      
      <div className="grid grid-cols-3 gap-8 items-start">
        <div className="col-span-1 space-y-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {layers.map((l, index) => (
            <div key={index} className={`bg-gradient-to-r ${l.bg} p-4 text-center rounded-xl border border-white/5 shadow-inner transition-transform hover:scale-[1.02] cursor-pointer`}>
              <span className="text-xs block font-mono text-white/60">{l.span}</span>
              <span className="text-xs font-bold text-white block mt-1 tracking-tight truncate">{l.type}</span>
            </div>
          ))}
        </div>
        
        <div className="col-span-2 space-y-4">
          {layers.map((l, index) => (
            <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
              <div className={`w-3 h-12 bg-gradient-to-b ${l.bg} rounded`}></div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">{l.type} ({l.span})</h4>
                <p className="text-xs text-slate-400 mt-0.5">{l.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <button onClick={() => setScreen('borelog')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
              Compile Full Bore Log <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BorelogGeneratorView({ activeProject, setScreen }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Standard Professional Geotechnical Bore Log</h2>
      <div className="bg-white text-slate-950 p-8 rounded-2xl font-mono text-xs overflow-x-auto shadow-2xl border-4 border-slate-400">
        <div className="border-b-2 border-slate-950 pb-4 mb-4 grid grid-cols-3 gap-4 font-sans">
          <div><strong>BK GEOTECH ENG.</strong></div>
          <div className="text-center font-bold text-sm">FIELD BORE LOG: {activeProject.borehole.id}</div>
          <div className="text-right">Project: {activeProject.info.name || 'Sample Specimen'}</div>
        </div>
        <table className="w-full border-collapse border border-slate-900 text-center">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-900 p-2">Depth (m)</th>
              <th className="border border-slate-900 p-2">Visual Description</th>
              <th className="border border-slate-900 p-2">Field SPT (N)</th>
              <th className="border border-slate-900 p-2">Water Profile</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-900 p-4">0.0 - 1.5</td>
              <td className="border border-slate-900 p-4 text-left">Loose Fill Silt / Sand matrix</td>
              <td className="border border-slate-900 p-4">11</td>
              <td className="border border-slate-900 p-4" rowSpan="2">W.T: {activeProject.borehole.waterTable}m</td>
            </tr>
            <tr>
              <td className="border border-slate-900 p-4">1.5 - 4.5</td>
              <td className="border border-slate-900 p-4 text-left">Highly Compressible Dark Gray Soft Clay</td>
              <td className="border border-slate-900 p-4">15</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button onClick={() => setScreen('report')} className="bg-green-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-colors">
          View Recommendations <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EngineeringReportView({ activeProject, setScreen }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI-Assisted Foundation Design Engine</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Foundation Typology Suitable</span>
          <div className="text-xl font-bold text-green-400 flex items-center gap-2"><FileCheck2 /> Deep Cast-In-Situ Pile</div>
          <p className="text-xs text-slate-400">Due to weak soft clay profiles upper strata down to 4.5 meters depth footprint.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Allowable Design Pressure (qa)</span>
          <div className="text-3xl font-mono font-bold text-slate-100">220 kPa</div>
          <p className="text-xs text-slate-400">Safety structural coefficient threshold configured at F.S = 3.0 standard.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Estimated Elastic Settlement</span>
          <div className="text-xl font-bold text-slate-100 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-emerald-400" /> Permissible Limit</div>
          <p className="text-xs text-slate-400">Total settlement parameters conform inside 25mm building tolerances.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={() => setScreen('preview')} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">
          <Download className="w-4 h-4" /> Proceed to Document Export
        </button>
      </div>
    </div>
  );
}

function PdfPreviewView({ activeProject }) {
  const triggerDownloadAction = () => {
    alert("Exporting Document Sequence Initiated! Generating professional report using jsPDF engine configuration.");
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto py-12">
      <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileDown className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold">Compilation Successful</h2>
      <p className="text-slate-400 text-sm">Your technical file including project data parameters, testing matrices, and structural parameters is ready for download.</p>
      <button onClick={triggerDownloadAction} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all">
        <Download className="w-5 h-5" /> Download Geotechnical Dossier (PDF)
      </button>
    </div>
  );
}

function ArchiveView({ projects }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <Search className="text-slate-500 w-5 h-5" />
        <input type="text" placeholder="Filter through archive history (e.g. LGED, BH-01, Chattogram...)" className="w-full bg-transparent text-sm focus:outline-none text-slate-100" />
        <Filter className="text-slate-400 w-4 h-4 cursor-pointer" />
      </div>
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-400 text-center text-sm">
        Histories loaded from local storage vectors. All system signatures calibrated.
      </div>
    </div>
  );
}