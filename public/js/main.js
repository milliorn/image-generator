// when clicked run logic to see if we have text, else give alert to add text so we can generate images
function onSubmit(e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  e.preventDefault();

  // reset the error message (if any) received from OpenAI on the webpage
  document.querySelector(".msg").textContent = "";
  // reset the source of the image
  document.querySelector("#image").src = "";

  // the actual text the user inputted into prompt
  const prompt = document.querySelector("#prompt").value;
  // image size the user has selected
  const size = document.querySelector("#size").value;

  // infor the user to add text if no text was submitted when user clicked the Generate button
  if (prompt === "") {
    Swal.fire({
      confirmButtonText: "Close",
      icon: "error",
      text: "Missing text!",
      title: "Error!",
      toast: true,
      position: "center",
    });
    return;
  }

  generateImageRequest(prompt, size);
}

// generate request by POST to page and then pull from it and add it to main page
async function generateImageRequest(prompt, size) {
  try {
    // generate spinner css on page
    showSpinner();

    // send a POST based on the user selection and text
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    // inform the user that the request made has generated an error
    if (!response.ok) {
      removeSpinner();
      throw new Error(
        `Cannot generate ${prompt} image because it violates OpenAI policy`
      );
    }

    const responseJson = await response.json();
    const imageUrl = responseJson.data;

    // this sets the element source to the imageUrl
    document.querySelector("#image").src = imageUrl;

    // image has arrived, remove the spinner
    removeSpinner();
  } catch (error) {
    // output the error to the user that was provided from OpenAI
    document.querySelector(".msg").textContent = error;
  }
}

// find spinner class and add it to page
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// find spinner class and remove it from page
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// add event listener to the form an fire onSubmit when clicked
document.querySelector("#image-form").addEventListener("submit", onSubmit);
