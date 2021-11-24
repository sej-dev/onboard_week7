// 이전 명칭 : mapFirstCharUpper
export default function toFirstCharUpperOnWord(aWord){
    return aWord.charAt(0).toUpperCase() + aWord.slice(1).toLowerCase();
}