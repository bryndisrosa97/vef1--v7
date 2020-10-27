/**
 * Verkefni 7 – Caesar dulmál
 */
/**
 * þetta eru 32 stafir
 */
const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;
const encodedIdx= 0;

/**
* Athugar hvort strengur sé tómur og skilar frá sér strengi sem er ekki tómur 
*
* @param {string} strengur Strengur sem skal kóða, aðeins stafir í stafrófi
* @param {String} adferd er strengur sem er annað hvort kóða eða afkóða, fer eftir hvaða aðferð hefur verið valin til að umbreyta streng
* @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
* @returns {string} Athugar hvort strengurinn sem kom inn sem inntak sé tómur og skilar frá sér strengt sem er ekki tómur
*/

 function isEmpty(strengur, adferd, num){
   if(strengur === "") {
     alert(' þú gafst ekki upp streng, Reyndu aftur');
     const strengur = prompt("Sláðu inn strengin sem á að " + adferd + " með hliðrun " + num);
     if(strengur === null){
      return null;
     }
     isEmpty(strengur);
    }
    return strengur;
  }

/**
* Kóðar streng með því að hliðra honum um n stök.
*
* @param {string} strengur Strengur sem skal kóða, aðeins stafir í stafrófi
* @param {String} adferd er strengur sem er annað hvort kóða eða afkóða, fer eftir hvaða aðferð hefur verið valin til að umbreyta streng
* @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
* @returns {string} Athugar hvort strengur sem kemur inn sé með löglega stafi í og skilar frá sér streng með löglegum gildum. 
*/

function isValid(strengur, adferd, num){
  let invalidLetters = '';
  
  for (let i = 0; i < strengur.length; i++) {
    const char = strengur[i];
    const idx = LETTERS.indexOf(char);
    
    if (idx === -1) {
      invalidLetters += char;
    }
  }
  
  if(invalidLetters !== "") {
    let sortedStr = invalidLetters.split('').join(', ');
    alert(`Þú gafst upp staf sem er ekki hægt að ${adferd} þ.a stafirnir ${sortedStr}`);
    const strengur = prompt("Sláðu inn strengin sem á að " + adferd + " með hliðrun " + num);
    if(strengur === null){
      return null;
     }
    const str=strengur.toLocaleUpperCase();
    isEmpty(str, adferd, num);
    isValid(str, adferd, num);      
  }
  return strengur; 
}

/**
* Birtir textaskilaboð þar sem notandi getur valið að ýta á ok eða cancel
* eftir því hvort hann vilji halda áfram í forritnu. 
*/

function myFunction() {
    const r = confirm("Ýttu á ok takkann ef þu vilt prófa aftur !\n");
    if (r == true) {
      alert('æði !!')
      start();
    } else {
      document.write("Njóttu dagsins");
      return null;
    }
  }

  /**
 * Byrja forrit. 
 * hér er tekið á móti inntaki frá notenda
 */

function start() {
  const adferd = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
  if(adferd === null){
    return null;
  }
  
  switch(adferd){
    
    case "kóða":
      const num = Number(prompt('`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`'));
      if(num === null || num === 0){
        return null;
       }
      if ( 1 <= num && num <= 31 ) {
        const strengur = prompt("Sláðu inn strengin sem á að " + adferd + " með hliðrun " + num);
        if(strengur === null){
          return null;
        }
        const str=strengur.toLocaleUpperCase();
        isEmpty(str, adferd, num);
        isValid(str, adferd, num);
        let utkoma =encode(str, num);
        alert(`Strengurinn: ${strengur}  sem átti ${adferd} er með hliðrun um  ${num} verður ${utkoma}`);
        myFunction();
      } else {
        alert(`${num} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
        myFunction(); 
      }
      
      case "afkóða" :
        const num2 = Number(prompt('`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`'));
        
        if(num2 === null|| num2 === 0){
          return null;
         }
        
         if ( 1 <= num2 && num2 <= 31 ) {
          const strengur = prompt("Sláðu inn strengin sem á að " + adferd + " með hliðrun " + num2);
          
          if(strengur === null){
            return null;
          }
          const str=strengur.toLocaleUpperCase();
          isEmpty(str, adferd, num2);
          isValid(str, adferd, num2);
          let utkoma =decode(str, num2);
          alert(`Strengurinn: ${strengur} sem átti ${adferd} er  með hliðrun um  ${num2} verður ${utkoma}`);
          myFunction();
        } else {
          alert(`${num2} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`); 
          myFunction();
        }
        
        default: 
        alert(`Veit ekki hvaða aðgerð ${adferd}  er. Reyndu aftur.`);
        myFunction();
      }
    }
    
    start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let res = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const idx = LETTERS.indexOf(char);
    
    if (idx === -1) {
      res += char;
      continue;
    }
    const encodedIdx = (idx + n) % 32;
    res += LETTERS[encodedIdx];
  }
  return res; 
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */

 function decode(str, n) {
   let res = '';
   newN = (32-n) % 32;
   res = encode(str,newN);
   return res;
}  

/**
 * ef við kóðum a með hliðrum um a þá verður það að d
 */
console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
