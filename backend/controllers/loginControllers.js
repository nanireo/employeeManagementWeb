const t_login = require('../models/loginModel');

const sessions = {}; 

exports.login = async (req, res) => {
  const { f_userName,f_Pwd } = req.body; // Destructuring the request body to get userName and pwd
  try {
    const loginData = await t_login.findOne({ f_userName, f_Pwd }); // Finding login data based on userName and pwd

    function generateSessionId() {
      return Math.random().toString(36).substring(2, 10);
    }

    if (loginData) {
      const sessionId = generateSessionId(); // Generating a random token
      console.log("token", sessionId);

      // Assuming loginData contains user information including an id field

      const userId = loginData.id;

      sessions[sessionId] = userId;

      res.json({ 
        message: 'Login successfully', 
        sessionId: 'your-session-id-here' 
      });
       // Sending the token as a response
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
