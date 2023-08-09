exports.generateToken = () => {
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    OTP += Math.round(Math.random() * 9);
  }
  return OTP;
};
