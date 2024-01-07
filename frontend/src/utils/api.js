import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function processCsv(file) {
  const formData = new FormData();

  formData.append("csvFile", file);

  let errMsg;
  try {
    const { data } = await axios.post(`http://${apiUrl}/report`, formData);

    // Check if there's an error in the response
    if (data.error) {
      errMsg = "there's an error while getting the response, please try again";
    }

    // Check additional conditions based on the response if needed

    return data;
  } catch (error) {
    // Handle the error
    errMsg = "Error processing CSV, please try again";

    // You can check if the error is due to the file not being a CSV file
    if (error.message.includes("CSV")) {
      // Handle the specific case of the file not being a CSV file
      errMsg = "The selected file is not a CSV file.";
    }

    // Return an object or throw the error again based on your requirements
    return { error: errMsg };
  }
}
