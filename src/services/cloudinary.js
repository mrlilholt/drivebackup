// src/services/cloudinary.js
import axios from 'axios';

// Note: For security, we should avoid using API Secret in client-side code
// For a production app, these calls should be made through a backend service
// This is a simplified implementation for the demo

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dtvecsd0q';
const CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY || '763252483432359';

// Get list of files in a folder
export const getTracksFromFolder = async (folderName) => {
  try {
    // WARNING: This is not a secure way to access Cloudinary's API
    // In production, you would use a backend service to make this call
    // This is for demonstration purposes only
    
    // This will NOT work directly from the browser due to CORS and security restrictions
    // It's included here just to show the concept of what a server-side implementation would do
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video`;
    const params = {
      resource_type: 'video',
      type: 'upload',
      prefix: `${folderName}/`,
      max_results: 100
    };
    
    const auth = {
      username: CLOUDINARY_API_KEY,
      // password should be API_SECRET, but we don't want to expose that in client code
    };
    
    console.log(`Attempting to fetch tracks from folder: ${folderName}`);
    
    const response = await axios.get(url, { params, auth });
    
    if (response.data && response.data.resources) {
      return response.data.resources.map(resource => ({
        id: resource.public_id,
        title: extractTitleFromPublicId(resource.public_id),
        url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${resource.public_id}`,
        duration: resource.duration || 3600 // Default to 1 hour if duration not available
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching tracks from folder ${folderName}:`, error);
    // Return empty array in case of error
    return [];
  }
};

// Helper to extract a user-friendly title from the public ID
function extractTitleFromPublicId(publicId) {
  // Remove folder path if present
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1];
  
  // Remove file extension if present
  const nameOnly = filename.replace(/\.\w+$/, '');
  
  // Replace underscores and hyphens with spaces
  const friendlyName = nameOnly.replace(/[_-]/g, ' ');
  
  // Capitalize first letter of each word
  return friendlyName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// IMPORTANT NOTE:
// This direct API approach won't work properly in a browser-based app
// due to CORS restrictions and security concerns.
// 
// For a real production app, you would need to:
// 1. Create a small backend service (Node.js, serverless function, etc.)
// 2. Make API calls to Cloudinary from your backend using your API Secret
// 3. Return the results to your frontend
//
// Or alternatively:
// 1. Use Cloudinary's Admin API to generate signed URLs or tokens
// 2. Access resources directly with those signed URLs