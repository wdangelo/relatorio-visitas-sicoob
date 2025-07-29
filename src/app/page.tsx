'use client';

import React from 'react';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import DashboardPage from './dashboard/page';


function FormPageContent() {
  return(
    <DashboardPage />
  )
  
}

export default function Home() {
  return (
    <ProtectedRoute>
      <FormPageContent />
    </ProtectedRoute>
  );
}

