function ArrayFilter(obj) {
  let keyarr = [];

  for (let key in obj) {
    keyarr.push(obj[key]);
  }

  let classscores = keyarr.slice(3, keyarr.length - 1);
  let results = [];
  let i = 0;
  while (i < classscores.length) {
    if (classscores[i]!= null) {
      results.push({
        classname: classscores[i],
        classscore: classscores[i + 1],
        jidian: calGradePointDemo(classscores[i + 1]),
      });
    }
    i += 2;
  }

  results.push({
    classname: "平均绩点",
    classscores: "暂无数据",
    jidian: keyarr[keyarr.length - 1],
  });

  return results;
}

function calGradePointDemo(score) {
  let Mantissa; //尾数
  let point; //绩点
  const reg = /^[0-9]*$/;
  let scorenum = parseInt(score);
  if (reg.test(scorenum)) {
    let scorenum = parseInt(score);
    if (scorenum >= 90) {
      Mantissa = scorenum % 90;
      point = `4.${Mantissa}`;
    } else if (scorenum >= 80 && scorenum < 90) {
      Mantissa = scorenum % 80;
      point = `3.${Mantissa}`;
    } else if (scorenum >= 70 && scorenum < 80) {
      Mantissa = scorenum % 70;
      point = `2.${Mantissa}`;
    } else if (scorenum >= 60 && scorenum < 70) {
      Mantissa = scorenum % 60;
      point = `1.${Mantissa}`;
    } else {
      point = `0`;
    }
  } else {
    switch (score) {
      case "优":
        point = `4.502`;
        break;
      case "良":
        point = `3.502`;
        break;
      case "中":
        point = `2.502`;
        break;
      case "差":
        point = `1.502`;
        break;
      case null:
        point = null;
        break;
      default:
        point = `0`;
        break;
    }
  }

  return point;
}

module.exports = {
  ArrayFilter,
};
