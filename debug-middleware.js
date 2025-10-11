// Add this to your Next.js app to catch and log all errors
// Create this file and import it in your layout.tsx or _app.tsx

export function createErrorLogger() {
  // Log unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Log to file
    const fs = require('fs');
    const errorLog = `${new Date().toISOString()} - Unhandled Rejection: ${reason}\n`;
    fs.appendFileSync('./error.log', errorLog);
  });

  // Log uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Log to file
    const fs = require('fs');
    const errorLog = `${new Date().toISOString()} - Uncaught Exception: ${error.message}\n${error.stack}\n`;
    fs.appendFileSync('./error.log', errorLog);
  });
}

// Global error boundary for API routes
export function withErrorLogging(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      
      // Log to file
      const fs = require('fs');
      const errorLog = `${new Date().toISOString()} - API Error: ${error.message}\n${error.stack}\n`;
      fs.appendFileSync('./api-error.log', errorLog);
      
      res.status(500).json({ 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  };
}