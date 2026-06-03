'use client';

import React, { useState } from 'react';
import { Hexagon } from 'lucide-react';

export default function DropPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === 'VNUA') {
      // Simulate setting a cookie or token
      document.cookie = "DROP_ACCESS_TOKEN=true; path=/";
      window.location.href = '/';
    } else {
      alert('ACCESS DENIED: INVALID CLEARANCE');
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="border border-white/20 p-8 max-w-md w-full backdrop-blur-md bg-white/5 relative">
        <div className="absolute top-0 right-0 p-2 text-xs font-mono text-cyan/70">
          VNUA_PRIVATE_NETWORK
        </div>
        
        <div className="flex flex-col items-center mb-8">
          <Hexagon className="w-12 h-12 text-cyan mb-4 animate-[pulse_4s_ease-in-out_infinite]" />
          <h1 className="text-2xl font-mono tracking-widest uppercase">VNUA ACCESS GATE</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="password" 
            placeholder="SYSTEM ENTRY CODE" 
            className="bg-transparent border-b border-white/30 text-center text-xl p-2 outline-none focus:border-cyan transition-colors font-mono tracking-widest text-white placeholder-gray-600"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button 
            type="submit" 
            className="mt-4 border border-cyan text-cyan font-mono hover:bg-cyan hover:text-black transition-colors py-3 uppercase tracking-widest"
          >
            INITIALIZE SYSTEM
          </button>
        </form>
      </div>
    </main>
  );
}
