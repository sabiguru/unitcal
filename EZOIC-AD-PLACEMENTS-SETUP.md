# Ezoic Ad Placements Setup Guide

## ✅ Components Created

### 1. **EzoicAd Component** (`/src/components/ads/EzoicAd.tsx`)
- Single ad placement component
- Usage: `<EzoicAd placementId={101} className="mb-6" />`

### 2. **EzoicMultiAd Component** (`/src/components/ads/EzoicMultiAd.tsx`) 
- Multiple ad placements (better performance)
- Usage: `<EzoicMultiAd placements={[{id: 101}, {id: 102}]} />`

### 3. **Placement Configuration** (`/src/config/ezoicPlacements.ts`)
- Centralized placement ID management
- Easy to update all IDs from one place

## ✅ Ad Placements Added

### **Homepage:**
- **Sidebar Top** (ID: 101) - Above content
- **Sidebar Bottom** (ID: 102) - Below content  
- **Banner** (ID: 103) - Between sections

### **Calculator Pages:**
- **Content Banner** (ID: 104) - Between calculator and content

## 🔧 Setup Steps

### 1. **Create Placements in Ezoic Dashboard**
1. Log into your Ezoic dashboard
2. Go to **Ad Settings > Ad Placements**
3. Create the following placements:
   - `101` - Homepage Sidebar Top (300x250 or responsive)
   - `102` - Homepage Sidebar Bottom (300x250 or responsive)  
   - `103` - Homepage Banner (728x90 or responsive)
   - `104` - Calculator Content Banner (728x90 or responsive)

### 2. **Update Placement IDs** (if different)
If Ezoic assigns different IDs, update `/src/config/ezoicPlacements.ts`:

```typescript
export const EZOIC_PLACEMENTS = {
  HOME_SIDEBAR_TOP: YOUR_ACTUAL_ID_HERE,
  HOME_SIDEBAR_BOTTOM: YOUR_ACTUAL_ID_HERE,
  // ... etc
};
```

### 3. **Deploy and Test**
1. Deploy your updated code
2. Visit your site and check for ads
3. Use browser dev tools to verify ad placeholders load

## 🎯 Recommended Placement Strategy

### **High-Performance Locations:**
- ✅ Above the fold sidebar (ID 101)
- ✅ Between content sections (ID 103)
- ✅ After calculator results (ID 104)

### **Additional Placements to Consider:**
- Header banner (728x90)
- Footer banner (728x90)
- In-content ads for blog sections
- Mobile-specific placements

## 📱 Mobile Optimization

The components are responsive and will work on mobile devices. Ezoic will automatically serve appropriately sized ads based on the device.

## 🔄 Performance Notes

- Multiple ads on the same page use single `showAds()` call for better performance
- Components use `useEffect` to ensure proper loading
- No styling applied to placeholder divs (per Ezoic guidelines)

## 🆘 Troubleshooting

**If ads don't appear:**
1. Check browser console for errors
2. Verify placement IDs match Ezoic dashboard
3. Ensure Ezoic scripts loaded properly
4. Check that ads.txt is working (visit `/ads.txt`)

Your ad setup is now ready for Ezoic optimization! 🚀