var generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocation = (from, lat, lng) =>{
  return {
    from: from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {
  generateMessage,
  generateLocation
};
