import React, { Suspense, lazy, useMemo } from 'react';
import { stringToPaletteColor, getPolyType } from '@/lib/logoUtils';
import { useIsMobile } from '@/hooks/use-mobile';

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

const GeneralLogo = lazy(() => import('./GeneralLogo'));

const ServiceLogo: React.FC<ServiceLogoProps> = ({ 
  service, 
  className, 
  style, 
  size = 9 ,
  theme = 'light' 
}) => {
  const isMobile = useIsMobile();
  const serviceKey = typeof service === 'string' ? service : service.key;

  // Use the palette utility to generate color and type from service key
  const { color, type } = useMemo(() => ({
    color: stringToPaletteColor(serviceKey),
    type: getPolyType(serviceKey)
  }), [serviceKey]);

  if (isMobile) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GeneralLogo
        seed={serviceKey}
        color={color}
        polyType={type}
        className={className}
        style={style}
        size={size}
        theme={theme}
      />
    </Suspense>
  );
};

export default ServiceLogo;