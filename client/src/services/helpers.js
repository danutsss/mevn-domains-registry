/**
 * Adds padding and newlines into a string without whitespace
 * @param {str} str The str to be modified (any whitespace will be stripped)
 * @param {int} spaceEvery number of characters before inserting a space
 * @param {int} wrapeEvery number of spaces before using a newline instead
 * return {string} The replaced string
 */
function addPadding(str, spaceEvery, wrapEvery) {
  var regex = new RegExp(".{" + spaceEvery + "}", "g");
  // Add space every {spaceEvery} chars, newline after {wrapEvery} spaces
  return str.replace(/[\n\s]/g, "").replace(regex, function (value, index) {
    // The index is the group that just finished
    var newlineIndex = spaceEvery * (wrapEvery - 1);
    return (
      value + (index % (spaceEvery * wrapEvery) === newlineIndex ? "\n" : " ")
    );
  });
}

const cartBadge = () => {
  if (window.innerWidth < 768) return false;
  return true;
};

const cartLength = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartLength = cart ? cart.length : 0;

  return cartLength;
};

export default { addPadding, cartBadge, cartLength };
