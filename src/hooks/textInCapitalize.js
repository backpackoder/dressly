const useTextInCapitalize = (text) => {
  const splitText = text.split(" ");
  for (var i = 0; i < splitText.length; i++) {
    splitText[i] = splitText[i].charAt(0).toUpperCase() + splitText[i].slice(1);
  }
  const textInCapitalize = splitText.join(" ").trim();

  return textInCapitalize;
};

export default useTextInCapitalize;
