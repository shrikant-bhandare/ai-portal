import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Landing } from '../pages/Landing';
import { Services } from '../pages/Services';
import { ServiceDetails } from '../components/services/ServiceDetails';
import { Onboarding } from '../pages/Onboarding';
import { AuthenticatedLayout } from '../layouts/AuthenticatedLayout';
import { RequireOnboarding } from './RequireOnboarding';
import { BrandDevelopmentForm } from '../components/forms/brand/BrandDevelopmentForm';
import { MyFiles } from '../pages/MyFiles';
import { Projects } from '../pages/Projects';
import { MyTasks } from '../pages/MyTasks';
import { Billing } from '../pages/Billing';
import { Campaigns } from '../pages/Campaigns';
import { Conversions } from '../pages/Conversions';
import { Conversations } from '../pages/Conversations';
import { Customers } from '../pages/Customers';
import { Reporting } from '../pages/Reporting';
import { Ads } from '../pages/Ads';
import { NotionProjects } from '../pages/NotionProjects';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding/*" element={<Onboarding />} />
      <Route path="/brand-development" element={<BrandDevelopmentForm />} />
      <Route
        path="/*"
        element={
          <RequireOnboarding>
            <AuthenticatedLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notion-projects" element={<NotionProjects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:serviceId" element={<ServiceDetails />} />
                <Route path="/files" element={<MyFiles />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<MyTasks />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/conversions" element={<Conversions />} />
                <Route path="/conversations" element={<Conversations />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/reporting" element={<Reporting />} />
                <Route path="/ads" element={<Ads />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AuthenticatedLayout>
          </RequireOnboarding>
        }
      />
    </Routes>
  );
}