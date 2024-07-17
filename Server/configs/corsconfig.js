const allorigins=require("./origins")




const Options = {
    origin: function (origin, callback) {
     
      // Check if the requesting origin is in the allowedOrigins array or if it's undefined (for same-origin requests)
      if (allorigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
module.exports=Options