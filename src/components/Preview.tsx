import { useResumeStore } from '../store/useResumeStore';

// Template 1: ATS Standard (Single column, no fuss, highly readable)
function ATSStandardTemplate() {
  const { resumeData, activeFont } = useResumeStore();
  const { basics, work, education, skills, projects } = resumeData;
  return (
    <div className={`w-full max-w-[816px] min-h-[1056px] bg-white text-black p-[1in] mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:p-0 ${activeFont}`}>
      <header className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-1 uppercase tracking-wide">{basics.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-700 mb-2 font-medium">{basics.label || 'Professional Title'}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.location && <span>• {basics.location}</span>}
        </div>
      </header>
      
      {basics.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Skills</h2>
          <div className="text-sm">
            {skills.map((skill) => (
              <div key={skill.id} className="mb-1">
                <span className="font-bold">{skill.name}:</span> {skill.keywords.join(', ')}
              </div>
            ))}
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">Professional Experience</h2>
          <div className="flex flex-col gap-5">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{job.position || 'Position Title'}</h3>
                  <span className="text-sm font-semibold">{job.startDate} {job.endDate && `- ${job.endDate}`}</span>
                </div>
                <div className="text-sm font-semibold italic text-gray-700 mb-2">
                  {job.company || 'Company Name'}
                </div>
                {job.highlights.length > 0 && job.highlights[0] !== "" && (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{proj.name || 'Project Name'}</h3>
                  {proj.url && <a href={proj.url} className="text-xs text-blue-600 hover:underline">{proj.url}</a>}
                </div>
                <div className="text-sm font-semibold italic text-gray-700 mb-2">{proj.description}</div>
                {proj.highlights.length > 0 && proj.highlights[0] !== "" && (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {proj.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">Education</h2>
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{edu.institution || 'Institution Name'}</h3>
                  <span className="text-sm font-semibold">{edu.startDate} {edu.endDate && `- ${edu.endDate}`}</span>
                </div>
                <div className="text-sm">
                  {edu.studyType} {edu.area && `in ${edu.area}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Template 2: Modern Minimalist
function ModernMinimalistTemplate() {
  const { resumeData, activeFont, activeColor } = useResumeStore();
  const { basics, work, education, skills } = resumeData;
  return (
    <div className={`w-full max-w-[816px] min-h-[1056px] bg-white text-gray-900 p-12 mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:p-0 ${activeFont}`}>
      <header className="mb-10 text-left flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-light tracking-tight mb-2 text-gray-900">{basics.name || 'Your Name'}</h1>
          <p className={`text-xl mb-4 font-medium ${activeColor}`}>{basics.label || 'Professional Title'}</p>
          <div className="flex flex-col gap-1 text-sm text-gray-500 font-mono">
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.location && <span>{basics.location}</span>}
          </div>
        </div>
        {basics.photo && (
          <img src={basics.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover grayscale opacity-90" />
        )}
      </header>
      
      {basics.summary && (
        <section className="mb-10">
          <p className="text-base leading-relaxed text-gray-700 max-w-2xl">{basics.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-10 flex gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 w-1/4">Skills</h2>
          <div className="w-3/4 flex flex-wrap gap-2">
            {skills.flatMap(s => s.keywords).map((k, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{k}</span>
            ))}
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="mb-8 resume-section">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
          <div className="flex flex-col gap-8">
            {work.map((job) => (
              <div key={job.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-sm text-gray-500 font-mono pt-1">
                  {job.startDate} <br/> {job.endDate && `— ${job.endDate}`}
                </div>
                <div className="col-span-9 border-l border-gray-200 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">{job.position || 'Position Title'}</h3>
                  <div className={`text-sm font-medium mb-3 ${activeColor}`}>{job.company || 'Company Name'}</div>
                  {job.highlights.length > 0 && job.highlights[0] !== "" && (
                    <ul className="list-none text-sm space-y-2 text-gray-700">
                      {job.highlights.map((highlight, idx) => (
                        <li key={idx} className="relative before:content-['—'] before:absolute before:-left-4 before:text-gray-400">{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {education.length > 0 && (
        <section className="mb-8 resume-section">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Education</h2>
          <div className="flex flex-col gap-6">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-sm text-gray-500 font-mono pt-1">
                  {edu.startDate} <br/> {edu.endDate && `— ${edu.endDate}`}
                </div>
                <div className="col-span-9 border-l border-gray-200 pl-6">
                  <h3 className="text-base font-semibold text-gray-900">{edu.institution}</h3>
                  <div className="text-sm text-gray-600">{edu.studyType} {edu.area && `— ${edu.area}`}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Template 3: Executive (Conservative, two-column header)
function ExecutiveTemplate() {
  const { resumeData, activeFont, activeColor } = useResumeStore();
  const { basics, work, education, projects } = resumeData;
  return (
    <div className={`w-full max-w-[816px] min-h-[1056px] bg-white text-black p-[0.75in] mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:p-0 ${activeFont}`}>
      <header className="flex justify-between items-end border-b-4 border-gray-900 pb-4 mb-6">
        <div className="flex items-center gap-4">
          {basics.photo && <img src={basics.photo} className="w-16 h-16 rounded-sm object-cover" />}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{basics.name || 'Your Name'}</h1>
            <p className={`text-lg italic ${activeColor}`}>{basics.label || 'Professional Title'}</p>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location && <div>{basics.location}</div>}
        </div>
      </header>

      {basics.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-gray-800">{basics.summary}</p>
        </section>
      )}

      {work.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 bg-gray-100 py-1 px-2 border-l-4 border-gray-900">Professional Experience</h2>
          <div className="flex flex-col gap-6">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">{job.company || 'Company Name'}</h3>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className={`text-md italic ${activeColor}`}>{job.position || 'Position Title'}</div>
                  <span className="text-sm text-gray-600">{job.startDate} {job.endDate && `- ${job.endDate}`}</span>
                </div>
                {job.highlights.length > 0 && job.highlights[0] !== "" && (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 bg-gray-100 py-1 px-2 border-l-4 border-gray-900">Key Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold">{proj.name}</h3>
                <p className="text-sm text-gray-700 italic mb-1">{proj.description}</p>
                <p className="text-sm">{proj.highlights.join(' • ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 bg-gray-100 py-1 px-2 border-l-4 border-gray-900">Education</h2>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <div className="font-bold">{edu.institution}</div>
                  <div className="text-sm">{edu.studyType} - {edu.area}</div>
                </div>
                <div className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Template 4: Creative Block
function CreativeBlockTemplate() {
  const { resumeData, activeFont, activeColor } = useResumeStore();
  const { basics, work, education, skills } = resumeData;
  const sidebarBg = activeColor.replace('text-', 'bg-');
  
  return (
    <div className={`w-full max-w-[816px] min-h-[1056px] bg-white text-gray-800 mx-auto shadow-2xl relative overflow-hidden print:shadow-none flex ${activeFont}`}>
      {/* Sidebar */}
      <aside className={`w-[35%] ${sidebarBg} text-white p-8 pt-12 flex flex-col gap-8 print:w-[35%]`}>
        <div className="text-center">
          {basics.photo && <img src={basics.photo} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/20" />}
          <h1 className="text-3xl font-bold mb-2 leading-tight">{basics.name || 'Your Name'}</h1>
          <p className="opacity-80 font-medium">{basics.label || 'Professional Title'}</p>
        </div>
        
        <div className="text-sm flex flex-col gap-3 opacity-90">
          <h3 className="font-bold uppercase tracking-wider mb-1 text-xs border-b border-white/30 pb-1">Contact</h3>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url && <span>{basics.url}</span>}
        </div>

        {skills.length > 0 && (
          <div className="text-sm flex flex-col gap-3">
            <h3 className="font-bold uppercase tracking-wider mb-2 text-xs border-b border-white/30 pb-1">Skills</h3>
            {skills.map(s => (
              <div key={s.id} className="mb-2">
                <div className="font-semibold opacity-90 mb-1">{s.name}</div>
                <div className="flex flex-wrap gap-1">
                  {s.keywords.map((k,i) => <span key={i} className="bg-white/10 px-2 py-0.5 rounded text-xs">{k}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
      
      {/* Main Content */}
      <main className="w-[65%] p-10 pt-12 print:w-[65%] bg-white">
        {basics.summary && (
          <section className="mb-10">
            <h2 className={`text-xl font-bold mb-3 flex items-center gap-2 ${activeColor}`}>
              <span className={`w-6 h-1 inline-block ${sidebarBg}`}></span> Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">{basics.summary}</p>
          </section>
        )}
        
        {work.length > 0 && (
          <section className="mb-8 resume-section">
            <h2 className={`text-xl font-bold mb-5 flex items-center gap-2 ${activeColor}`}>
              <span className={`w-6 h-1 inline-block ${sidebarBg}`}></span> Experience
            </h2>
            <div className="flex flex-col gap-6">
              {work.map((job) => (
                <div key={job.id}>
                  <h3 className="font-bold text-lg text-gray-900">{job.position || 'Position Title'}</h3>
                  <div className={`text-sm font-semibold mb-2 ${activeColor}`}>
                    {job.company || 'Company Name'} <span className="text-gray-400 font-normal">| {job.startDate} - {job.endDate}</span>
                  </div>
                  {job.highlights.length > 0 && job.highlights[0] !== "" && (
                    <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                      {job.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8 resume-section">
            <h2 className={`text-xl font-bold mb-5 flex items-center gap-2 ${activeColor}`}>
              <span className={`w-6 h-1 inline-block ${sidebarBg}`}></span> Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900">{edu.studyType} in {edu.area}</h3>
                  <div className="text-sm text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Template 5: Tech Pro
function TechProTemplate() {
  const { resumeData, activeFont, activeColor } = useResumeStore();
  const { basics, work, projects, skills } = resumeData;
  return (
    <div className={`w-full max-w-[816px] min-h-[1056px] bg-white text-gray-800 p-[0.5in] mx-auto shadow-2xl relative overflow-hidden print:shadow-none print:p-0 ${activeFont}`}>
      <header className={`border-b-2 pb-4 mb-6 flex justify-between items-end border-current ${activeColor}`}>
        <div className="flex gap-4 items-center text-gray-900">
          {basics.photo && <img src={basics.photo} className="w-12 h-12 rounded-sm grayscale" />}
          <div>
            <h1 className="text-3xl font-bold mb-1">{basics.name || 'Your_Name'}</h1>
            <p className={activeColor}>{basics.label || 'Software_Engineer'}</p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 flex flex-col gap-1">
          {basics.email && <span>{basics.email}</span>}
          {basics.url && <span>{basics.url}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>

      {basics.summary && (
        <section className="mb-6">
          <p className="text-xs leading-relaxed text-gray-700 bg-gray-50 p-3 border-l-4 border-gray-300">
            {basics.summary}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className={activeColor}>~/</span>Skills
          </h2>
          <div className="text-xs text-gray-700 grid grid-cols-2 gap-2">
            {skills.map(s => (
              <div key={s.id}>
                <span className={`font-bold ${activeColor}`}>[{s.name}]</span> {s.keywords.join(', ')}
              </div>
            ))}
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className={activeColor}>~/</span>Experience
          </h2>
          <div className="flex flex-col gap-6">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base text-gray-900">{job.position || 'Title'} @ <span className={activeColor}>{job.company || 'Company'}</span></h3>
                  <span className="text-xs font-semibold text-gray-500">[{job.startDate} - {job.endDate}]</span>
                </div>
                {job.highlights.length > 0 && job.highlights[0] !== "" && (
                  <ul className="list-disc pl-5 text-xs space-y-1 text-gray-700 mt-2">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6 resume-section">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className={activeColor}>~/</span>Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="border border-gray-200 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`font-bold text-sm ${activeColor}`}>{proj.name}</h3>
                  {proj.url && <a href={proj.url} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">Link</a>}
                </div>
                <p className="text-xs text-gray-600 mb-2">{proj.description}</p>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  {proj.highlights.map((h,i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function Preview() {
  const { activeTemplate } = useResumeStore();

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'ats-standard': return <ATSStandardTemplate />;
      case 'modern-minimalist': return <ModernMinimalistTemplate />;
      case 'executive': return <ExecutiveTemplate />;
      case 'creative-block': return <CreativeBlockTemplate />;
      case 'tech-pro': return <TechProTemplate />;
      default: return <ATSStandardTemplate />;
    }
  };

  return (
    <div className="w-full flex justify-center pb-24 print:pb-0 px-2 lg:px-8">
      {/* Premium Brutalist / Muted Industrial Frame around the paper */}
      <div className="p-4 sm:p-6 lg:p-10 bg-slate-300 border-4 border-slate-100 rounded-[2.5rem] shadow-2xl print:p-0 print:bg-transparent print:border-none print:rounded-none print:shadow-none">
        <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
