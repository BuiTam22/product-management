module.exports.saveToCookies = async (req, res, next)=>{
    // Lấy ra url trang trước
    const currentURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    res.cookie("currentURL", currentURL);
    console.log(currentURL);
    next();
}