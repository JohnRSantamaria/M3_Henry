const antiTrollsSecurity = (string) => {
  const regex = /[aeiouAEIOU]/g

  return string.replace(regex,"")
};
antiTrollsSecurity("This website is for losers LOL!")
//  // are you, a communist?

module.exports = antiTrollsSecurity;
