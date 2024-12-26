import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { SubServiceCard } from './SubServiceCard';
import { useNavigate } from 'react-router-dom';
import { BrandDevelopmentModal } from '../forms/brand/BrandDevelopmentModal';
import { LogoDesignModal } from '../forms/logo/LogoDesignModal';
import { WebsiteProjectModal } from '../forms/website/WebsiteProjectModal';
import { SocialMediaModal } from '../forms/social/SocialMediaModal';

interface NewProjectModalProps {
  service: {
    id: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

export function NewProjectModal({ service, onClose }: NewProjectModalProps) {
  const navigate = useNavigate();
  const [showBrandDevelopment, setShowBrandDevelopment] = useState(false);
  const [showLogoDesign, setShowLogoDesign] = useState(false);
  const [showWebsiteProject, setShowWebsiteProject] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  
  const subServices = {
    'website-development': [
      { id: 'web-design', title: 'Web Design', description: 'Custom website designs that capture your brand' },
      { id: 'ecommerce', title: 'E-commerce', description: 'Online store development with secure payment integration' },
      { id: 'web-app', title: 'Web Application', description: 'Complex web applications with robust functionality' }
    ],
    'social-media': [
      { id: 'social-strategy', title: 'Social Strategy', description: 'Comprehensive social media strategy development' },
      { id: 'content-creation', title: 'Content Creation', description: 'Engaging content for your social platforms' },
      { id: 'social-analytics', title: 'Analytics & Reporting', description: 'Track and analyze social media performance' }
    ],
    'branding-design': [
      { id: 'logo-design', title: 'Logo Design', description: 'Professional logo and brand identity design' },
      { id: 'brand-guidelines', title: 'Brand Guidelines', description: 'Comprehensive brand style guides' },
      { id: 'marketing-materials', title: 'Marketing Materials', description: 'Design for print and digital marketing' }
    ]
  }[service.id] || [];

  const handleServiceClick = (subService: { id: string; title: string }) => {
    switch (subService.id) {
      case 'logo-design':
        setShowLogoDesign(true);
        break;
      case 'brand-guidelines':
        setShowBrandDevelopment(true);
        break;
      case 'web-design':
      case 'ecommerce':
      case 'web-app':
        setShowWebsiteProject(true);
        break;
      case 'social-strategy':
      case 'content-creation':
      case 'social-analytics':
        setShowSocialMedia(true);
        break;
      default:
        navigate('/', { 
          state: { 
            serviceName: `${service.title} - ${subService.title}` 
          } 
        });
        onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
        <div className="bg-[#0A1628] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Create New {service.title} Project</h2>
            <Button variant="secondary" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-gray-400">{service.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subServices.map((subService) => (
                <SubServiceCard
                  key={subService.id}
                  {...subService}
                  onClick={() => handleServiceClick(subService)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showBrandDevelopment && (
        <BrandDevelopmentModal 
          onClose={() => {
            setShowBrandDevelopment(false);
            onClose();
          }} 
        />
      )}

      {showLogoDesign && (
        <LogoDesignModal
          onClose={() => {
            setShowLogoDesign(false);
            onClose();
          }}
        />
      )}

      {showWebsiteProject && (
        <WebsiteProjectModal
          onClose={() => {
            setShowWebsiteProject(false);
            onClose();
          }}
        />
      )}

      {showSocialMedia && (
        <SocialMediaModal
          onClose={() => {
            setShowSocialMedia(false);
            onClose();
          }}
        />
      )}
    </>
  );
}