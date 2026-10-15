import React from 'react';
// Import Simple Icons (Si) for specific brands
import {
  SiFacebook,
  SiGithub,
  SiDiscord,
  SiX,
  SiGitforwindows as SiWindows,
  SiApple,
  SiOrcid,
  SiLinkedin,
  SiTwitch,
  SiSpotify,
  SiSlack,
  SiAmazon,
  SiGitlab,
  SiBitbucket,
  SiAuth0,
  SiOpenid,
  SiSteam,
  SiReddit,
} from 'react-icons/si';

// Import a generic fallback icon (e.g., from Material Design)
import { MdLogin } from 'react-icons/md';
// Full-colour Google mark, and a university building for institutional login
import { FcGoogle } from 'react-icons/fc';
import { FaBuildingColumns } from 'react-icons/fa6';

// 1. The Mapping Configuration
// Keys match django-allauth provider IDs (lowercase)
const providerIcons: { [key: string]: React.ComponentType<{ size?: number; className?: string; color?: string; 'aria-hidden'?: boolean }> } = {
  google: FcGoogle,
  cilogon: FaBuildingColumns,
  facebook: SiFacebook,
  github: SiGithub,
  discord: SiDiscord,
  x: SiX,
  microsoft: SiWindows,
  windowslive: SiWindows, // Legacy allauth ID for Microsoft
  apple: SiApple,
  orcid: SiOrcid,
  linkedin: SiLinkedin,
  linkedin_oauth2: SiLinkedin, // Specific allauth variant
  twitch: SiTwitch,
  spotify: SiSpotify,
  slack: SiSlack,
  amazon: SiAmazon,
  gitlab: SiGitlab,
  bitbucket: SiBitbucket,
  auth0: SiAuth0,
  openid: SiOpenid,
  steam: SiSteam,
  reddit: SiReddit,
};

// Brand colours for monochrome marks; anything unlisted inherits the text colour.
const providerColors: { [key: string]: string } = {
  orcid: '#A6CE39',
  github: 'currentColor',
  gitlab: '#FC6D26',
  discord: '#5865F2',
  linkedin: '#0A66C2',
  linkedin_oauth2: '#0A66C2',
  facebook: '#1877F2',
  slack: '#4A154B',
};



const ProviderIcon = ({ providerId, size = 20, className = "" }: { providerId: string; size?: number; className?: string }) => {
  // 2. Normalize the ID (lowercase, remove whitespace) to match keys safely
  const normalizedId = providerId?.toLowerCase().trim();

  // 3. Select the icon component, fallback to MdLogin if not found
  const IconComponent = providerIcons[normalizedId] || MdLogin;

  return (
    <IconComponent
      size={size}
      className={className}
      color={providerColors[normalizedId]}
      aria-hidden
    />
  );
};

export default ProviderIcon;