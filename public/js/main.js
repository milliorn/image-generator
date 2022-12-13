// when clicked run logic to see if we have text, else give alert to add text so we can generate images
function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}

// generate request by POST to page and then pull from it and add it to main page
async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

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

    if (!response.ok) {
      removeSpinner();
      throw new Error("Cannot generate image.");
    }

    const data = await response.json();
    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
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

document.querySelector("#image-form").addEventListener("submit", onSubmit);
