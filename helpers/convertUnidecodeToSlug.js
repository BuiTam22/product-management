const unidecode = require("unidecode");

module.exports.convertUnidecodeToSlug = (text)=>{
    const unidecodeText = unidecode(text);
    const slug = unidecodeText.replace(/\s+/g, "-");
    return slug
}