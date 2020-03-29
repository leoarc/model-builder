window.onload = function() {
  // $("#").checked = false;
  $("#dchoice").checked = false;
};

$("#user-model-button").click(function() {
  $("#user-model").toggle();
  $("#user-model-1").toggle();
  $("#user-model-2").toggle();
  $("#user-model-3").toggle();

  $("#choose-data").toggle();
  $("#pretrained-model-button").hide();
});
$("#pretrained-model-button").click(function() {
  $("#pretrained").toggle();
  $("#user-model-button").hide();
});
let ch1;
function dataChoice(ch) {
  ch1 = ch;
  console.log(ch);
  if (ch == "image") {
    $("#image-data").show();
    $("#csv-data").hide();
  } else {
    $("#image-data").hide();
    $("#csv-data").show();
  }
  // $("#load-data").show();
}

var no_l = 10;
var imdata;
var x_test;
var xs_test;
let results;
let pred_res;
let x_temp1;
let y_temp1;
let parameters = new Array();
let num_epoch = 1;
let num_img = 0;
function addImageProcess(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
$("#cs").change(async function() {
  $("#loader").show();
  await getData(event);
  $("#load-data").show();
  $("#loader").hide();
});

$("#ima").change(async function(event) {
  $("#loader").show();
  await dataImg(event);
  $("#load-data").show();
  $("#loader").hide();
  // var files = event.target.files;
  // x_temp1 = new Array();
  // y_temp1 = new Array();
  // num_img = files.length;

  // for (var i = 0; i < files.length; i++) {
  //   let src;
  //   var file = files[i];
  //   var res = file.name.substring(0, 3);
  //   if (res == "cat") {
  //     y_temp1.push(parseInt(1));
  //   } else {
  //     y_temp1.push(parseInt(0));
  //   }
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = async function() {
  //     let dataURL = reader.result;
  //     src = dataURL;
  //     let l_img = await addImageProcess(src);
  //     var c = document.getElementById("myCanvas1");
  //     var context = c.getContext("2d");
  //     context.drawImage(l_img, 0, 0);
  //     let imgData = context.getImageData(0, 0, 64, 64);
  //     const imgt = tf.browser.fromPixels(imgData).toFloat();
  //     var imgt1 = imgt.dataSync();
  //     // imgt1 = imgt1.map(function(ele) {
  //     //   return parseFloat(ele / 255);
  //     // });
  //     x_temp1.push(imgt1);
  //   };
  // }

  // console.log(x_temp1);
  // console.log(y_temp1);
});

async function dataImg(event) {
  var files = event.target.files;
  x_temp1 = new Array();
  y_temp1 = new Array();
  num_img = files.length;

  for (var i = 0; i < files.length; i++) {
    let src;
    var file = files[i];
    var res = file.name.substring(0, 3);
    if (res == "cat") {
      y_temp1.push(parseInt(1));
    } else {
      y_temp1.push(parseInt(0));
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function() {
      let dataURL = reader.result;
      src = dataURL;
      let l_img = await addImageProcess(src);
      var c = document.getElementById("myCanvas1");
      var context = c.getContext("2d");
      context.drawImage(l_img, 0, 0);
      let imgData = context.getImageData(0, 0, 64, 64);

      const imgt = tf.browser.fromPixels(imgData).toFloat();
      var imgt1 = imgt.dataSync();
      // imgt1 = imgt1.map(function(ele) {
      //   return parseFloat(ele / 255);
      // });
      x_temp1.push(imgt1);
    };
  }
}
let model1;
function compileModel() {
  var n_d = 0;
  let model;
  model = tf.sequential();
  for (var k = 0; k < 10; k++) {
    if (parameters[k][0] == 1) {
      var q = 0;
      if (parameters[k][2] == "c_relu") {
        q = q + 1;
        model.add(
          tf.layers.conv2d({
            inputShape: [64, 64, 3],
            filters: parseInt(parameters[k][1]),
            kernelSize: 3,
            activation: "relu"
          })
        );
      } else if (parameters[k][2] == "c_tanh") {
        q = q + 1;
        model.add(
          tf.layers.conv2d({
            inputShape: [64, 64, 3],
            filters: parseInt(parameters[k][1]),
            kernelSize: 3,
            activation: "tanh"
          })
        );
      } else if (parameters[k][2] == "d_tanh") {
        q = q + 1;
        if (n_d == 0) {
          model.add(tf.layers.flatten());
          n_d = 1;
        }
        model.add(
          tf.layers.dense({
            units: parseInt(parameters[k][1]),
            activation: "tanh"
          })
        );
      } else if (parameters[k][2] == "d_relu") {
        q = q + 1;
        if (n_d == 0) {
          model.add(tf.layers.flatten());
          n_d = 1;
        }
        model.add(
          tf.layers.dense({
            units: parseInt(parameters[k][1]),
            activation: "relu"
          })
        );
      } else if (parameters[k][2] == "m") {
        q = q + 1;
        var g = parseInt(parameters[k][1]);
        model.add(tf.layers.maxPooling2d({ poolSize: [g, g] }));
      } else if (parameters[k][2] == "b") {
        q = q + 1;
        var g = parseInt(parameters[k][1]);
        model.add(tf.layers.dropout({ rate: g }));
      } else if (parameters[k][2] == "softmax") {
        q = q + 1;
        if (n_d == 0) {
          model.add(tf.layers.flatten());
          n_d = 1;
        }
        model.add(
          tf.layers.dense({
            units: parseInt(parameters[k][1]),
            activation: "softmax"
          })
        );
      }
      if (q == 0) {
        alert(
          "Some field is missing. Please fill all parameters of all layers!"
        );
        return;
      }
    }
  }

  optim = parameters[9][3];
  los = parameters[9][4];

  model.compile({
    optimizer: optim,
    loss: los,
    metrics: ["accuracy"]
  });
  model.summary();
  alert("Model Compiled");
  $("#input2").show();
  return model;
}
// function onEpochEnd(epoch, logs) {
//   console.log("Accuracy", logs.acc);
// }
function onBatchEnd(batch, logs) {
  console.log("Accuracy", logs.acc);
}
//var surface;
$("#comp").click(function() {
  console.log("Aa");
  try {
    model1 = compileModel();

    // const surface1 = { name: "Model Summary1", tab: "Model Inspection1" };
    // tfvis.show.modelSummary(surface1, model1);
  } catch (error) {
    alert(error.message);
  }
});

$("#upload-pic").change(function() {
  let reader = new FileReader();
  reader.onload = function() {
    let dataURL = reader.result;
    $("#uploaded-pic").attr("src", dataURL);
  };

  let file = $("#upload-pic").prop("files")[0];
  reader.readAsDataURL(file);
});

var data1 = new Array(2000);
for (var i = 0; i < data1.length; i++) {
  data1[i] = new Array(12288);
}
var data2 = new Array(2000);

$("#load-data").click(async function() {
  console.log("Loading Data");
  $("#loader").show();
  if (ch1 == "image") {
    alert("Data Loaded ! " + num_img + " images loaded");
  } else {
    alert("Data Loaded ! ");
    // await getData();
  }
  $("#modelbuild").show();
  $("#loader").hide();
  console.log("Data Loaded");
});
async function getData(event) {
  var file = event.target.files;
  console.log(file);
  // const response = await fetch("aata1.csv");
  var data = await file[0].text();

  var rows = data.split("\n");

  for (var j = 0; j < 2000; j++) {
    var row = rows[j].split(",");
    // console.log(parseInt(row[100]));
    for (var k = 0; k < 12288; k++) {
      data1[j][k] = parseInt(row[k]) / 255;

      //console.log(parseInt(row[0]));
    }
    data2[j] = parseInt(row[12288]);
  }
}

parameters[0] = new Array();
parameters[0].push(1);
parameters[0].push(16);
parameters[0].push("c_relu");

parameters[9] = new Array();
parameters[9].push(1);
parameters[9].push(2);

parameters[9][2] = "softmax";
parameters[9][3] = "adam";
parameters[9][4] = "categoricalCrossentropy";

for (var l = 1; l < 9; l++) {
  parameters[l] = new Array();
  parameters[l][0] = 0;
}

$("#epoch").change(function() {
  num_epoch = parseInt(this.value);
});
// const options = {
//   epochs: num_epoch
//   // batchSize: 32,
//   // callbacks: tfvis.show.fitCallbacks(surface1, ["loss", "acc"])
// };
async function trainModel() {
  console.log(ch1);
  if (ch1 == "csv") {
    let xs1 = tf.tensor2d(data1);
    xs = xs1.as4D(2000, 64, 64, 3);
    xs1.dispose();
    let label = tf.tensor1d(data2, "int32");
    let ys = tf.oneHot(label, 2);
    label.dispose();
    const surface = tfvis.visor().surface({
      name: "Model Summary",
      tab: "Summmary"
    });
    tfvis.show.modelSummary(surface, model1);

    const container = {
      name: "show.fitCallbacks",
      tab: "Training",
      styles: {
        height: "1000px"
      }
    };

    await model1.fit(xs, ys, {
      epochs: num_epoch,
      batchSize: 100,
      callbacks: tfvis.show.fitCallbacks(container, ["loss", "acc"])
    });

    alert("Training Complete");
    $("#cls").show();

    xs.dispose();
    ys.dispose();
  } else if (ch1 == "image") {
    let scale = tf.scalar(255);
    let xs1 = tf.tensor2d(x_temp1);
    xs1 = xs1.div(scale);
    //console.log(xs1);
    xs = xs1.as4D(num_img, 64, 64, 3);
    xs1.dispose();
    let label = tf.tensor1d(y_temp1, "int32");
    let ys = tf.oneHot(label, 2);
    label.dispose();
    // const history = await model1.fit(xs, ys, {
    //   epochs: num_epoch,
    //   batchSize: 32
    // });

    const surface = tfvis.visor().surface({
      name: "Model Summary",
      tab: "Summmary"
    });
    tfvis.show.modelSummary(surface, model1);

    const container = {
      name: "show.fitCallbacks",
      tab: "Training",
      styles: {
        height: "1000px"
      }
    };

    // tfvis.show.history(surface, history, ["loss", "acc"]);
    await model1.fit(xs, ys, {
      epochs: num_epoch,
      batchSize: 100,
      callbacks: tfvis.show.fitCallbacks(container, ["loss", "acc"])
    });

    alert("Training Complete");

    $("#cls").show();

    xs.dispose();
    ys.dispose();
  }
}
$("#train-model").click(async function() {
  $("#loader").show();
  await trainModel();
  $("#loader").hide();
});

$("#comp-demo").click(function() {
  parameters[0][0] = 1;
  parameters[0][1] = 16;
  parameters[0][2] = "c_relu";
  parameters[1][0] = 1;
  parameters[1][1] = 2;
  parameters[1][2] = "m";
  parameters[9][0] = 1;
  parameters[9][1] = 2;
  parameters[9][2] = "softmax";
  for (var o = 2; o < 9; o++) {
    parameters[o][0] = 0;
    $("#del" + o).click();
  }
  $("#input_lay").val("c1");

  model1 = compileModel();
  parameters[1] = new Array();
  parameters[1][0] = 0;
});
// $("#train-model").click(function() {
// var num_conv = conv.value;
// var num_epoch = parseInt(epoch.value);
// var num_dense = dense.value;
// var num_filt1 = parseInt(filter1.value);
// var num_filt2 = parseInt(filter2.value);
// var num_filt3 = parseInt(filter3.value);
// console.log(num_conv, num_dense, num_epoch);

// let model;
// let xs = tf.tensor2d(data1);
// xs = xs.as4D(2000, 64, 64, 3);
// //xtest = tf.tensor1d(data1[1500]);
// //xtest = xtest.as4D(1, 64, 64, 3);

// let label = tf.tensor1d(data2, "int32");
// let ys = tf.oneHot(label, 2);
// console.log(ys);
// model = tf.sequential();
// model.add(
//   tf.layers.conv2d({
//     inputShape: [64, 64, 3],
//     filters: num_filt1,
//     kernelSize: 5,
//     activation: "relu"
//   })
// );

// if (num_conv == "conv2") {
//   model.add(
//     tf.layers.conv2d({
//       filters: num_filt2,
//       kernelSize: 5,
//       activation: "relu"
//     })
//   );
// }
// if (num_conv == "conv3") {
//   model.add(
//     tf.layers.conv2d({
//       filters: num_filt2,
//       kernelSize: 5,
//       activation: "relu"
//     })
//   );

//   model.add(
//     tf.layers.conv2d({
//       filters: num_filt3,
//       kernelSize: 5,
//       activation: "relu"
//     })
//   );
// }

// model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
// model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
// model.add(tf.layers.flatten());

// if (num_dense == "dense2") {
//   var num_unit = parseInt(unit.value);
//   model.add(tf.layers.dense({ units: num_unit, activation: "relu" }));
// }
// model.add(tf.layers.dense({ units: 2, activation: "softmax" }));

// const lr = 0.2;
// const optimizer = tf.train.sgd(lr);
// model.compile({
//   optimizer: optimizer,
//   loss: "categoricalCrossentropy"
// });
// const options = {
//   epochs: num_epoch
// };

// model.fit(xs, ys, options).then(results => {
//   console.log(results);
//   alert("Training Complete");
//   $("#cls").show();

$("#classify-button").click(function() {
  let test_img = $("#uploaded-pic").get(0);
  var c = document.createElement("canvas");
  c.width = test_img.width;
  c.height = test_img.height;
  var ctx = c.getContext("2d");
  ctx.drawImage(test_img, 0, 0);
  imdata = ctx.getImageData(0, 0, test_img.width, test_img.height);

  x_test = new Array(imdata.height);
  for (var q = 0; q < imdata.height; q++) {
    x_test[q] = new Array(imdata.width);
  }

  for (var l = 0; l < imdata.height; l++) {
    for (var h = 0; h < imdata.width; h++) {
      var xCoord = l;
      var yCoord = h;
      var canvasWidth = imdata.width;

      function getColorIndicesForCoord(x, y, width) {
        var red = y * (width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
      }

      var colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

      var redIndex = colorIndices[0];
      var greenIndex = colorIndices[1];
      var blueIndex = colorIndices[2];

      var redForCoord = imdata.data[redIndex];
      var greenForCoord = imdata.data[greenIndex];
      var blueForCoord = imdata.data[blueIndex];
      x_test[l][h] = new Array(3);
      x_test[l][h][0] = parseInt(redForCoord) / 255;
      x_test[l][h][1] = parseInt(greenForCoord) / 255;
      x_test[l][h][2] = parseInt(blueForCoord) / 255;
    }
  }
  tf.tidy(() => {
    x_test = x_test.flat();
    x_test = x_test.flat();
    xs1_test = tf.tensor1d(x_test);

    //xs_test = xs.as1D();
    xs_test = xs1_test.as4D(1, imdata.height, imdata.width, 3);
    return xs_test;
  });
  try {
    results = model1.predict(xs_test);
    results.print();
    pred_res = results.dataSync();

    document.getElementById("pre").innerHTML = pred_res[0];
    document.getElementById("pre1").innerHTML = pred_res[1];
  } catch (error) {
    alert(error.message);
  }

  //console.log(xs_test);
});
// });

// const img = document.getElementById('selected-image');

// cocoSsd.load().then(model => {
//   model.detect(img).then(predictions => {
//     console.log('Predictions: ', predictions);
//   });
// });

$("#image-selector").change(function() {
  let reader = new FileReader();
  reader.onload = function() {
    let dataURL = reader.result;
    $("#selected-image").attr("src", dataURL);
    $("#predictiob-list").empty();
  };

  let file = $("#image-selector").prop("files")[0];
  reader.readAsDataURL(file);
});

$("#predict-button").click(function() {
  let img = $("#selected-image").get(0);

  cocoSsd.load().then(model => {
    model.detect(img).then(predictions => {
      console.log("Predictions: ", predictions);

      var c = document.getElementById("myCanvas");
      var context = c.getContext("2d");
      var img1 = $("#selected-image").get(0);
      context.drawImage(img1, 0, 0);
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      const font = "24px helvetica";
      ctx.font = font;
      ctx.textBaseline = "top";
      var image_class = document.getElementById("image_class");
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      predictions.forEach(prediction => {
        if (prediction.class == image_class.value) {
          const x = prediction.bbox[0];
          const y = prediction.bbox[1];
          const width = prediction.bbox[2];
          const height = prediction.bbox[3];
          // Draw the bounding box.
          ctx.strokeStyle = "#2fff00";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, width, height);
          // Draw the label background.
          ctx.fillStyle = "#2fff00";
          const textWidth = ctx.measureText(prediction.class).width;
          const textHeight = parseInt(font, 10);
          // draw top left rectangle
          ctx.fillRect(x, y, textWidth + 10, 5 * (textHeight + 10));
          // draw bottom left rectangle
          ctx.fillRect(
            x,
            y + height - textHeight,
            textWidth + 15,
            textHeight + 10
          );

          // Draw the text last to ensure it's on top.
          ctx.fillStyle = "#000000";
          ctx.fillText(prediction.class, x, y);
          ctx.fillStyle = "#000000";
          ctx.fillText(Math.round(x), x, y + (textHeight + 10));
          ctx.fillStyle = "#000000";
          ctx.fillText(Math.round(y), x, y + 2 * (textHeight + 10));
          ctx.fillStyle = "#000000";
          ctx.fillText(Math.round(height), x, y + 3 * (textHeight + 10));
          ctx.fillText(Math.round(width), x, y + 4 * (textHeight + 10));
          ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
        }
      });
    });
  });
});
