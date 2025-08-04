module.exports = {
  config: {
    name: "font",
    version: "3.0",
    author: "Arijit",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Convert text to stylish fonts" },
    longDescription: { en: "Choose a font style from 1 to 20 or view font list", },
    category: "fun",
    guide: { en: "{pn} <style_number> <text>\n{pn} list" }
  },

  onStart: async function ({ api, event, args }) {
    const styles = [
      () => "Ă̈r̆̈ĭ̈j̆̈ĭ̈t̆̈",   // 1
      () => "𝘈𝘳𝘪𝘫𝘪𝘵",           // 2
      () => "𝗔𝗿𝗶𝗷𝗶𝘁",           // 3
      () => "🅐🅡🅘🅙🅘🅣",          // 4
      () => "ᴬʳᶦʲᶦᵗ",            // 5
      () => "Ａｒｉｊｉｔ",         // 6
      () => "𝙰𝚛𝚒𝚓𝚒𝚝",         // 7
      () => "𝔄𝔯𝔦𝔧𝔦𝔱",         // 8
      () => "𝘈𝘳𝘪𝘫𝘪𝘵",         // 9
      () => "Ａ𝚛ⅈ𝘫ե",           // 10
      () => "𝐀𝐫𝐢𝐣𝐢𝐭",         // 11
      () => "🄰🅁🄸🄹🄸🅃",        // 12
      () => "Ⓐⓡⓘⓙⓘⓣ",        // 13
      () => "𝕬𝖗𝖎𝖏𝖎𝖙",        // 14
      () => "ᴀʀɪᴊɪᴛ",         // 15
      () => "🅰🆁🅸🅹🅸🆃",        // 16
      () => "ᴬᴿᴵᴶᴵᵀ",          // 17
      () => "A̷r̷i̷j̷i̷t̷",      // 18
      () => "ƊƦƗʆƗƬ",          // 19
      () => "αяιנιт"           // 20
    ];

    // If "list" is typed
    if (args[0]?.toLowerCase() === "list") {
      let listMessage = "🎀 𝐅𝐨𝐧𝐭 𝐏𝐫𝐞𝐯𝐢𝐞𝐰𝐬:\n";
      styles.forEach((styleFunc, index) => {
        listMessage += ${index + 1}. ${styleFunc()}\n;
      });
      return api.sendMessage(listMessage.trim(), event.threadID, event.messageID);
    }

    if (args.length < 2)
      return api.sendMessage("❌ | Usage: font <style_number 1-20> <text>\nOr use: font list", event.threadID, event.messageID);

    const style = parseInt(args[0]);
    if (isNaN(style) || style < 1 || style > 20)
      return api.sendMessage("❌ | Style number must be between 1 and 20.", event.threadID, event.messageID);

    const inputText = args.slice(1).join(" ");

    // Replacer map (for flexible text styling)
    const replacers = {
      1: txt => txt.split("").map(c => c + "̆̈").join(""),
      2: txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D608 - (c < "a" ? 65 : 97))),
      3: txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D5D4 - (c < "a" ? 65 : 97))),
      4: txt => txt.replace(/[A-Za-z]/g, c => {
        const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const bubbles = ["🅐","🅑","🅒","🅓","🅔","🅕","🅖","🅗","🅘","🅙","🅚","🅛","🅜","🅝","🅞","🅟","🅠","🅡","🅢","🅣","🅤","🅥","🅦","🅧","🅨","🅩"];
        return bubbles[base.indexOf(c.toUpperCase())] || c;
      }),
      5: txt => txt.replace(/[A-Za-z]/g, c => {
        const small = "abcdefghijklmnopqrstuvwxyz";
        const supers = ["ᵃ","ᵇ","ᶜ","ᵈ","ᵉ","ᶠ","ᵍ","ʰ","ᶦ","ʲ","ᵏ","ˡ","ᵐ","ⁿ","ᵒ","ᵖ","ᑫ","ʳ","ˢ","ᵗ","ᵘ","ᵛ","ʷ","ˣ","ʸ","ᶻ"];
        return supers[small.indexOf(c.toLowerCase())] || c;
      }),
      6: txt => txt.replace(/[A-Za-z]/g, c => String.fromCharCode(0xFF21 + c.toUpperCase().charCodeAt(0) - 65)),
      7: txt => txt.replace(/[A-Za-z]/g, c => {
        const mono = "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉";
        return mono["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c;
      }),
      8: txt => txt.replace(/[A-Za-z]/g, c => {
        const gothic = "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ";
        return gothic["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c;
      }),
      9: txt => txt.replace(/[A-Za-z]/g, c => "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      10: txt => "Ａ𝚛ⅈ𝘫ե",
      11: txt => txt.replace(/[A-Za-z]/g, c => "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      12: txt => txt.replace(/[A-Za-z]/g, c => "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      13: txt => txt.replace(/[A-Za-z]/g, c => "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      14: txt => txt.replace(/[A-Za-z]/g, c => "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      15: txt => txt.toLowerCase(),
      16: txt => txt.replace(/[A-Za-z]/g, c => "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      17: txt => txt.replace(/[A-Za-z]/g, c => "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ"["ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c.toUpperCase())] || c),
      18: txt => txt.split("").map(c => c + "̷").join(""),
      19: txt => "ƊƦƗʆƗƬ",
      20: txt => "αяιנιт"
    };

    const result = replacers[style] ? replacers[style](inputText) : styles[style - 1]();
    return api.sendMessage(🎀 | 𝐒𝐭𝐲𝐥𝐞 ${style}:\n${result}, event.threadID, event.messageID);
  }
};
