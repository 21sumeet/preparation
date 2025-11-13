// Turncate the text
// Example: "Hello, welcome to the world of JavaScript" => "Hello, welcome to the wo..."

function truncateText(text, maxLength) {
  let l = text.length;
  if (l <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - 3) + "...";
  }
}
// Example usage:
const originalText = "Hello, welcome to the world of JavaScript";
const maxLength = 20;
const truncatedText = truncateText(originalText, maxLength);
console.log(truncatedText); // Output: "Hello, welcome to t..."
