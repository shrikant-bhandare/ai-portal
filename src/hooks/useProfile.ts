import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  full_name: string;
  email: string;
  company?: {
    name: string;
    website: string;
    country: string;
    size: string;
  };
  contact?: {
    phone: string;
    address: string;
    city: string;
    postal_code: string;
  };
  social?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load user metadata
      const profile: UserProfile = {
        full_name: user.user_metadata.full_name || '',
        email: user.email || '',
      };

      // Load company info
      const { data: companyData } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (companyData) {
        profile.company = {
          name: companyData.name,
          website: companyData.website,
          country: companyData.country,
          size: companyData.size,
        };
      }

      // Load contact details
      const { data: contactData } = await supabase
        .from('contact_details')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (contactData) {
        profile.contact = {
          phone: contactData.phone,
          address: contactData.address,
          city: contactData.city,
          postal_code: contactData.postal_code,
        };
      }

      // Load social profiles
      const { data: socialData } = await supabase
        .from('social_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (socialData) {
        profile.social = {
          facebook: socialData.facebook,
          twitter: socialData.twitter,
          linkedin: socialData.linkedin,
          instagram: socialData.instagram,
        };
      }

      setProfile(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    refresh: loadProfile,
  };
}