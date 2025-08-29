const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


function alternatingCaps(str) {
  return str
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// Config (your details)
const USER_CONFIG = {
  full_name: "somak_bhuti",    
  dob: "07072004",           
  email: "somakbhuti@gmail.com",
  roll_number: "22BCT0119"
};

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${USER_CONFIG.full_name}_${USER_CONFIG.dob}`,
        message: "Request must include 'data' as an array"
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatAlphabets = "";

    data.forEach(item => {
      const strItem = String(item);

      if (!isNaN(strItem) && strItem.trim() !== "") {
        // numeric
        const num = parseInt(strItem, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(strItem);
        } else {
          odd_numbers.push(strItem);
        }
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        // word with alphabets only
        alphabets.push(strItem.toUpperCase());
        concatAlphabets += strItem;
      } else {
        // special character(s)
        for (let ch of strItem) {
          if (/[^a-zA-Z0-9]/.test(ch)) {
            special_characters.push(ch);
          }
        }
      }
    });

    // generate concat_string (reverse + alternating caps)
    const concat_string = alternatingCaps(concatAlphabets);

    return res.status(200).json({
      is_success: true,
      user_id: `${USER_CONFIG.full_name}_${USER_CONFIG.dob}`,
      email: USER_CONFIG.email,
      roll_number: USER_CONFIG.roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum), // return as string
      concat_string
    });
  } catch (err) {
    console.error(" Error:", err.message);
    return res.status(200).json({
      is_success: false,
      user_id: `${USER_CONFIG.full_name}_${USER_CONFIG.dob}`,
      message: "Something went wrong. Please try again."
    });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});


module.exports = app;
