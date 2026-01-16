import React, { useMemo } from 'react';
import { stringToPaletteColor, getPolyType } from '@/lib/logoUtils';
import GeneralLogo from './GeneralLogo';

interface ServiceRequirement {
  key: string;
  description?: string;
}

interface ServiceLogoProps {
  service: ServiceRequirement | string; 
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  size?: number;
}

const ServiceLogo: React.FC<ServiceLogoProps> = ({ 
  service, 
  className, 
  style, 
  size = 9 ,
  theme = 'light' 
}) => {
  const serviceKey = typeof service === 'string' ? service : service.key;

  // Use the palette utility to generate color and type from service key
  const { color, type } = useMemo(() => ({
    color: stringToPaletteColor(serviceKey),
    type: getPolyType(serviceKey)
  }), [serviceKey]);

  return (
    <GeneralLogo 
      color={color}
      polyType={type}
      className={className}
      style={style}
      size={size}
      theme={theme}
    />
  );
};

export default ServiceLogo;