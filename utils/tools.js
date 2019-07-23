


export function getShareData(str,url){
    return {
      data:JSON.parse(str.match(/(window._sharedData\s?)(=\s?)(.*?);<\/script>/)[3]),
      jsFileURL:url
    }
}
export function getProfilePageContainerURL(str,type){
  type= type===undefined?type='profile':type
  let reg
    if(type==='profile'){
       reg=/<script.*src="(.*ProfilePageContainer.*)".*<\/script>/
    }else{
      reg=/<script.*src="(.*TagPageContainer.*)".*<\/script>/
    }
    return 'https://www.instagram.com'+str.match(reg)[1].split('"')[0]
}
export function getQueryHashByScript(str,word,arr){
    arr=arr?arr:[]
    let i=0,str2='',key=''
    i=str.indexOf(word)  
	// console.log('TCL: getQueryId -> str2', str2)
    if(i>-1){
        key=str.substr(i+9,32)
        arr.push(key)
        str2=str.substring(i+42)  
        return getQueryHashByScript(str2,word,arr)
    }else{
        return arr
    }
}
export function commonCloneWith(obj){
 return JSON.parse(JSON.stringify(obj))
}
export function bubbleSort(arr) {
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                let tmp = arr[j]; 
                arr[j]=arr[j+1];
                arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
     }
     return arr;
}
export function parseNum(num) {
  // 数字每三位加逗号
 return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
