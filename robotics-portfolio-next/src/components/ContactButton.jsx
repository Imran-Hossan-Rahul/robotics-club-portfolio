"use client";
import { useState } from 'react';

export default function ContactButton({ text = "Partner With Us" }) {
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isEmailRevealed) {
    return (
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); setIsEmailRevealed(true); }} 
        className="btn btn-amber"
      >
        {text}
      </a>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%' }}>
      <a href="#" className="btn btn-amber email-revealed" style={{ cursor: 'text', flex: '0 1 auto', whiteSpace: 'normal', wordBreak: 'break-all', textAlign: 'center' }} onClick={(e) => e.preventDefault()}>
        <span style={{ textTransform: 'none', letterSpacing: 'normal' }}>roboticsclub@uap-bd.edu</span>
      </a>
      <a 
        href="#" 
        className={`btn ${isCopied ? 'btn-amber' : 'btn-outline'} copy-email-btn`} 
        style={{ padding: '0.8rem 1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', flexShrink: 0, whiteSpace: 'nowrap' }} 
        title="Copy to clipboard" 
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText('roboticsclub@uap-bd.edu').then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
          });
        }}
      >
        {isCopied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
            <span style={{ fontSize: '0.85rem', marginLeft: '5px', fontWeight: 500 }}>Copied</span>
          </>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
        )}
      </a>
    </div>
  );
}
