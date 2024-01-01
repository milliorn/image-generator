// https://github.com/openai/openai-node#usage
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// generate image based on the prompt text and size given.
const generateImage = async (req, res) => {
  // prompt is the text the user has inputted. size is the size the user selected in the form
  const { prompt, size } = req.body;

  // Generated images can have a size of 256x256, 512x512, or 1024x1024 pixels.
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    // https://beta.openai.com/docs/guides/images/generations
    const response = await openai.images.generate({
      size: imageSize,
      prompt
    });

    const imageUrl = response.data[ 0 ].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    // https://beta.openai.com/docs/guides/images/error-handling
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { generateImage };
