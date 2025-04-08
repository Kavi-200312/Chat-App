// middleware/logger.js
export const requestLogger = (req, res, next) => {
    console.log("====== Incoming Request ======");
    console.log("🛣️ Path:", req.path);
    console.log("📦 Method:", req.method);
    
    if (Object.keys(req.query).length > 0) {
      console.log("🔍 Query Params:", req.query);
    }
  
    if (Object.keys(req.params).length > 0) {
      console.log("📌 Route Params:", req.params);
    }
  
    if (req.body && Object.keys(req.body).length > 0) {
      console.log("📝 Payload (Body):", req.body);
    }
  
    console.log("================================");
    next();
  };
  