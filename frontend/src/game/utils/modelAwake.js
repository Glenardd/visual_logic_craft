// activate the wake up call
const modelAwake = () => {
  wakeUpAPI()
    .then((apiResult) => {
      if (apiResult) {
        // return wakeUpPredictionModel();
        console.log(apiResult)
      }
    }).catch((error) => {
      console.error("Error during wake-up process:", error);
    });
};

// wakes up the current model
// takes up some seconds delay
const wakeUpAPI = async () => {
  try {
    const response = await fetch("https://visual-logic-craft-1.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // Empty payload
    });

    if (response.ok) {
      return "API woke up successfully."
    } else {
      return "API failed to wake up."
    };
  } catch (error) {
    console.error("Error waking up the API:", error.message);
    return false;
  };
};

// Wakes up the prediction model route
// const wakeUpPredictionModel = async () => {
//   try {
//     const response = await fetch("https://visual-logic-craft-1.onrender.com/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}), // Empty payload
//     });

//     if (response.ok) {
//       console.log("Prediction model woke up successfully.");
//       return true;
//     } else {
//       console.error("Prediction model failed to wake up.");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error waking up the prediction model:", error.message);
//     return false;
//   }
// };

export default modelAwake;