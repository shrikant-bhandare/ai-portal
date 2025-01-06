import React from 'react';
import { FormInput } from '../../ui/FormInput';
import { FormTextArea } from './FormTextArea';
import { Button } from '../../ui/Button';
import { supabase } from '../../../lib/supabase';

interface BrandDevelopmentFormProps {
  onSuccess?: () => void;
}

export function BrandDevelopmentForm({ onSuccess }: BrandDevelopmentFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase.from('brand_development').insert([{
        user_id: user.id,
        company_info: {
          name: formData.get('company_name'),
          industry: formData.get('industry'),
          website: formData.get('website'),
          product_description: formData.get('product_description'),
          primary_goals: formData.get('primary_goals'),
          target_audience: formData.get('target_audience'),
          unique_value: formData.get('unique_value'),
          deliverables: formData.get('deliverables')
        },
        brand_identity: {
          elements_to_keep: formData.get('elements_to_keep'),
          desired_emotions: formData.get('desired_emotions')
        },
        design_specifics: {
          color_palette: formData.get('color_palette'),
          font_preferences: formData.get('font_preferences'),
          legacy_elements: formData.get('legacy_elements')
        },
        style_preferences: {
          inspirational_brands: formData.get('inspirational_brands'),
          style_keywords: formData.get('style_keywords')
        },
        brand_voice: {
          mission: formData.get('brand_mission'),
          vision: formData.get('brand_vision'),
          tone: formData.get('brand_tone'),
          key_messages: formData.get('key_messages'),
          taglines: formData.get('taglines')
        },
        market_analysis: {
          competitors: formData.get('competitors'),
          expansion_plans: formData.get('expansion_plans')
        },
        notes: formData.get('notes')
      }]);

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Company Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">1. Company Information</h2>
        <FormInput
          name="company_name"
          label="Company Name"
          placeholder="The official name that represents your brand"
          required
        />
        <FormInput
          name="industry"
          label="Industry"
          placeholder="Specify the industry"
          required
        />
        <FormInput
          name="website"
          label="Current Website"
          type="url"
          placeholder="URL for your website"
        />
        <FormTextArea
          name="product_description"
          label="Product/Service Description"
          placeholder="Description of the product or services being offered"
          required
        />
        <FormTextArea
          name="primary_goals"
          label="Primary Goals for the Rebrand"
          placeholder="Attract new market, refresh image, etc."
          required
        />
        <FormTextArea
          name="target_audience"
          label="Current Target Audience"
          placeholder="Has it changed?"
          required
        />
        <FormTextArea
          name="unique_value"
          label="What Makes You Unique?"
          placeholder="Compared to competitors"
          required
        />
        <FormTextArea
          name="deliverables"
          label="Deliverables Needed"
          placeholder="Which design assets do you require? (logo, brand guidelines, all the assets)"
          required
        />
      </div>

      {/* 2. Brand Identity */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">2. Brand Identity</h2>
        <FormTextArea
          name="elements_to_keep"
          label="Elements to Keep vs. Change"
          placeholder="Which parts of your existing brand do you want to keep?"
          required
        />
        <FormTextArea
          name="desired_emotions"
          label="Desired Brand Emotions/Values"
          placeholder="Which qualities should the brand embody? (innovation, trust, luxury, fun, sustainability)"
          required
        />
      </div>

      {/* 3. Design Specifics */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">3. Design Specifics</h2>
        <FormTextArea
          name="color_palette"
          label="Color Palette"
          placeholder="Describe your preferred color scheme"
          required
        />
        <FormTextArea
          name="font_preferences"
          label="Font Preferences"
          placeholder="Traditional and professional, Clean and modern, Technical and modern, etc."
          required
        />
        <FormTextArea
          name="legacy_elements"
          label="Must-Have Brand Elements"
          placeholder="Are there any legacy design elements you want to retain? (recognizable icon, color scheme)"
          required
        />
      </div>

      {/* 4. Style Preferences */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">4. Style Preferences</h2>
        <FormTextArea
          name="inspirational_brands"
          label="Inspirational Brands/Styles"
          placeholder="Please list or describe any brands or aesthetics you admire and why"
          required
        />
        <FormTextArea
          name="style_keywords"
          label="Keywords for Your New Look"
          placeholder="Give a few adjectives that capture the style you're aiming for (modern, playful, minimalist, bold)"
          required
        />
      </div>

      {/* 5. Brand Voice & Messaging */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">5. Brand Voice & Messaging</h2>
        <FormTextArea
          name="brand_mission"
          label="Brand Mission"
          placeholder='Example: "Empowering businesses with eco-friendly solutions."'
          required
        />
        <FormTextArea
          name="brand_vision"
          label="Brand Vision"
          placeholder='Example: "To be the global leader in sustainable packaging."'
          required
        />
        <FormTextArea
          name="brand_tone"
          label="Tone: Current vs. Desired"
          placeholder="How would you describe your current tone, and how do you want to adjust it?"
          required
        />
        <FormTextArea
          name="key_messages"
          label="Key Messages/Values"
          placeholder="Which core values or benefits do you want to emphasize in your communications?"
          required
        />
        <FormTextArea
          name="taglines"
          label="Taglines/Slogans"
          placeholder="Do you have any existing taglines? Are you open to exploring new ones?"
          required
        />
      </div>

      {/* 6. Audience & Market */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">6. Audience & Market</h2>
        <FormTextArea
          name="competitors"
          label="Competitors"
          placeholder="Who are your top competitors, and how do you differ from them?"
          required
        />
        <FormTextArea
          name="expansion_plans"
          label="Expansion Plans"
          placeholder="Are there any new markets or demographics you want to target with this rebrand?"
          required
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-6">
        <FormTextArea
          name="notes"
          label="Additional Notes"
          placeholder="Any other information or specific requirements"
        />
      </div>

      <Button type="submit" size="large" fullWidth>
        Submit Brand Development Brief
      </Button>
    </form>
  );
}