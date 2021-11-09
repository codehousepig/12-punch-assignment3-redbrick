
const test = async (req, res, next) => {
  try {
    console.log('works')
    const dirName = `${__dirname}/game-dev.html`
    console.log('dirName', dirName);
    res.sendFile(dirName)
  } catch (e) {
    next(e);
  }
};

export default { test };