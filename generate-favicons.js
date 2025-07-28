// Simple favicon generator for Hari Trends
// Run this in a browser console or Node.js environment

const generateFaviconDataURL = () => {
  // Create a canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set size for favicon
  canvas.width = 32;
  canvas.height = 32;
  
  // Background
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(0, 0, 32, 32);
  
  // Hanger
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  
  // Hanger bar
  ctx.beginPath();
  ctx.moveTo(6, 10);
  ctx.lineTo(26, 10);
  ctx.stroke();
  
  // Hook
  ctx.beginPath();
  ctx.moveTo(16, 6);
  ctx.lineTo(16, 10);
  ctx.stroke();
  
  // Hook circle
  ctx.beginPath();
  ctx.arc(16, 4, 2, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Dress
  ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(22, 10);
  ctx.lineTo(24, 14);
  ctx.lineTo(24, 28);
  ctx.lineTo(8, 28);
  ctx.lineTo(8, 14);
  ctx.closePath();
  ctx.fill();
  
  // Buttons
  ctx.fillStyle = '#1A1A1A';
  ctx.beginPath();
  ctx.arc(13, 16, 1, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(19, 16, 1, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(16, 20, 1, 0, 2 * Math.PI);
  ctx.fill();
  
  return canvas.toDataURL('image/png');
};

// Usage instructions
console.log(`
🎯 Hari Trends Favicon Generator

To generate your favicon:
1. Copy this entire script
2. Open browser developer tools (F12)
3. Paste in console and press Enter
4. Run: generateFaviconDataURL()
5. Copy the data URL result
6. Use online converter to create .ico file

Or visit: https://realfavicongenerator.net/
Upload: public/favicon.svg
Download: Complete favicon package
`);

// If running in browser, auto-generate
if (typeof document !== 'undefined') {
  const dataURL = generateFaviconDataURL();
  console.log('Generated favicon data URL:', dataURL);
  
  // Create download link
  const link = document.createElement('a');
  link.download = 'hari-trends-favicon.png';
  link.href = dataURL;
  link.textContent = 'Download Favicon';
  link.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#D4AF37;color:#1A1A1A;padding:10px;text-decoration:none;border-radius:5px;';
  document.body.appendChild(link);
}