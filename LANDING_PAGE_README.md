# Landing Page Setup

The new landing page has been created at [src/Landing.tsx](src/Landing.tsx) with the following features:

## Features Implemented

1. **Hero Section** - Eye-catching hero with call-to-action buttons
2. **Feature Cards:**
   - 🔓 Fully Open Source - MIT licensed, no vendor lock-in
   - 🌐 Firewall-friendly - Peer-to-peer connection with Tailscale integration
   - 🔐 Auth Built In - OAuth2, social logins, MFA support
   - ⚡ Deploy Quickly - Fast lab service deployment

3. **Video Demo Section** - Showcases login flow and deployment process
4. **Community CTA** - Encourages GitHub engagement

## Adding Demo Videos

To add demo videos to the landing page, place your video files in the `public/` folder:

### Required Files:

1. **Login Demo Video:**
   - File: `public/demo-login.mp4`
   - Poster image (optional): `public/demo-login-poster.jpg`
   - Content: Should show the authentication/login flow

2. **Deployment Demo Video:**
   - File: `public/demo-deploy.mp4`
   - Poster image (optional): `public/demo-deploy-poster.jpg`
   - Content: Should show quick service deployment

### Video Recommendations:

- **Format:** MP4 (H.264 codec for best browser compatibility)
- **Resolution:** 1280x720 or 1920x1080
- **Duration:** 30-90 seconds (keep it short and engaging)
- **Size:** Optimize for web (aim for under 10MB per video)
- **Audio:** Optional (videos are set to muted by default but users can unmute)

### Creating Videos:

You can record demo videos using tools like:
- **Screen recording:** OBS Studio, QuickTime (Mac), SimpleScreenRecorder (Linux)
- **Video editing:** DaVinci Resolve, FFmpeg, HandBrake (for compression)

Example FFmpeg command to optimize a video:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k public/demo-login.mp4
```

## Routes Updated

- `/` - Now shows the landing page (public, no authentication required)
- `/home` - Dashboard for authenticated users (redirects here after login)
- `/account/login` - Login page
- `/account/signup` - Signup page

## Testing

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:5173/` to see the landing page
3. Sign up or log in - you'll be redirected to `/home` with the dashboard
4. Log out to return to the landing page

## Customization

You can customize the landing page by editing [src/Landing.tsx](src/Landing.tsx):
- Update hero text and CTAs
- Modify feature card content
- Add more sections as needed
- Update GitHub links to your own repository
