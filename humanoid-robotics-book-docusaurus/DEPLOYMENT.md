# Deployment Configuration

## GitHub Pages

### Setup Steps
1. Update `docusaurus.config.ts`:
   ```typescript
   organizationName: 'your-github-username'
   projectName: 'humanoid-robotics-book'
   url: 'https://your-username.github.io'
   baseUrl: '/humanoid-robotics-book/'
   ```

2. Deploy:
   ```bash
   GIT_USER=your-username npm run deploy
   ```

## Vercel

### Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Framework Preset**: Other

### Environment Variables
None required for basic deployment.

## Netlify

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "build/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Pre-Deployment Checklist
- [ ] Run `npm run build` successfully
- [ ] Test with `npm run serve`
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Validate math rendering
- [ ] Test code syntax highlighting
