// Function to handle login
async function handleLogin() {
    // Replace these variables with user input values
    const emailVar = document.getElementById('email').value; 
    const passwordVar = document.getElementById('password').value;

    // API URL
    const apiUrl = "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/login/authenticate";

    // Request payload
    const payload = {
        email: emailVar,
        password: passwordVar
    };

    try {
        // Sending POST request to the API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        // Checking response status
        if (!response.ok) {
            throw new Error("HTTP error! status: ${response.status}");
        }

        const data = await response.json();

        // Check the response message
        if (data.message === "sucessfull") {
            // Redirect to dashboard page
            window.location.href = "/dashboard"; // Replace with your dashboard URL
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during API invocation:", error);
        alert("Something went wrong. Please try again later.");
    }
}