import React from 'react'

export default function MaintenancePage() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#0b1220', color: '#e6eef8'}}>
      <main style={{textAlign: 'center', maxWidth: 800}}>
        <h1 style={{fontSize: 36, marginBottom: 8}}>We'll be back soon</h1>
        <p style={{color: '#cbd5e1', fontSize: 18, marginBottom: 16}}>The site is temporarily unavailable for maintenance. Please check back later.</p>
        <div style={{marginTop: 12}}>
          <p style={{color: '#94a3b8', fontSize: 14}}>Yeshua Beth Hallel Ministries</p>
        </div>
      </main>
    </div>
  )
}
