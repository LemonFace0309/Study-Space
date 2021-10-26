export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { password } = req.body;
    const validPassword = password == process.env.TEACHER_PASSWORD;
    res.status(200).json({ valid: validPassword });
  }
};
