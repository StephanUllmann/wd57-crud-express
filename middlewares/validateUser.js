const validateUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) return res.status(400).json({ msg: 'All field are required' });
  next();
};

export default validateUser;
