import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="admin-layout-wrapper" 
      style={{ 
        margin: 0, 
        padding: 0, 
        marginTop: '-5rem',
        paddingTop: 0,
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  );
}
