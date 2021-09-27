// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/////////////////////////////////////////// 7 ///////////////////////////////////////////
// calculate the amplitude which is the difference between min and max

// const calcAmp = (array) =>
// {
//     let min=array[0], max = array[0];
//     for(let i =0; i < array.length; i++)
//     {
//         let curNum = array[i];
        
//         if(!isNaN(curNum))
//         {
//             if(curNum > max) max = curNum;
//             if(curNum <min) min = curNum;
//         }
//         // you can replace the last if with
//         // if(typeof(curNum) !== 'number') continue;
//     }
//     console.log("min "+min);
//     console.log("max "+max);
//     console.log("amplitude: " + (max-min));
// }
// let array = [1, 3, 56, 'hjsdjlf', 78, 8, 'asd']

// calcAmp(array);


const concatenate2Arrays = (arr1, arr2) =>
{
    let concat = arr1.concat(arr2);
    console.log(concat);
}

let arr1 = [1, 2, 4, 5, 76 ];
let arr2 = [8, 8, 9, 0, 0];
concatenate2Arrays(arr1, arr2);





/////////////////////////////////////////// 9 ///////////////////////////////////////////
// Using a debugger

const calcTempAmplitudeBug = function (t1, t2) {
    const temps = t1.concat(t2);
    console.log(temps);
  
    let max = 0;
    let min = 0;
  
    for (let i = 0; i < temps.length; i++) {
      const curTemp = temps[i];
      if (typeof curTemp !== 'number') continue;
  
      if (curTemp > max) max = curTemp;
      if (curTemp < min) min = curTemp;
    }
    console.log(max, min);
    return max - min;
  };
  const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
  // A) IDENTIFY
  console.log(amplitudeBug);