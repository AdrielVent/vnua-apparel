import React from 'react';
import { ExternalLink, Hexagon } from 'lucide-react';

export default function Labs() {
  return (
    <div className="p-4 md:p-8 font-sans max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
      <Hexagon className="w-16 h-16 mb-6 text-[#00F3FF] animate-[pulse_4s_ease-in-out_infinite]" />
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase">
        VNUA <span className="text-[#00F3FF]">LABS</span>
      </h1>
      <p className="font-mono text-gray-400 text-sm tracking-widest uppercase mb-8">
        Hardware Engineering / CAD / Prototypes
      </p>
      <div className="border border-[#333333] bg-[#0A0A0A] p-6 text-xs font-mono text-[#00F3FF]">
        [ DIRECTORY UNDER CONSTRUCTION. DATA SYNC IN PROGRESS. ]
      </div>
      <a
        href="https://adrielvent.github.io/adriel-portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 border border-[#00F3FF]/40 bg-[#00F3FF]/5 px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#00F3FF] transition-colors hover:border-[#00F3FF] hover:bg-[#00F3FF]/10"
      >
        Open Mechanical Engineering Portfolio
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
