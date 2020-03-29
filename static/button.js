$("#input_lay").change(function() {
  parameters[0] = new Array();
  parameters[0].push(1);
  if (this.value == "c1") {
    $("#c1").show();
    $("#d1").hide();
    parameters[0][1] = 16;
    parameters[0][2] = "c_relu";
    $("#c1_2").show();
    $("#d1_2").hide();
  } else if (this.value == "none1") {
    $("#c1").hide();
    $("#d1").hide();
    $("#c1_2").hide();
    $("#d1_2").hide();
  } else {
    $("#d1").show();
    $("#c1").hide();
    $("#d1_2").show();
    $("#c1_2").hide();
  }
});

$("#c1_in").change(function() {
  parameters[0][1] = this.value;
});
$("#c1_act").change(function() {
  parameters[0][2] = this.value;
});
$("#d1_in").change(function() {
  parameters[0][1] = this.value;
});
$("#d1_act").change(function() {
  parameters[0][2] = this.value;
});

$("#d10_in").change(function() {
  parameters[9][1] = this.value;
});
// $("#d10_act").change(function() {
//   parameters[9][2] = this.value;
// });
$("#opt").change(function() {
  parameters[9][3] = this.value;
});
$("#loss").change(function() {
  parameters[9][4] = this.value;
});

$("#add1").click(function() {
  $("#lay-1").show();
  $("#add1").hide();

  parameters[1][0] = 1;
  no_l = no_l + 1;
});

$("#lay_1").change(function() {
  parameters[1] = new Array();
  parameters[1].push(1);

  if (this.value == "c2") {
    $("#c2").show();
    $("#d2").hide();
    $("#c2_2").show();
    $("#d2_2").hide();
    $("#m2").hide();
    $("#b2").hide();
  } else if (this.value == "none1") {
    $("#c2").hide();
    $("#d2").hide();
    $("#c2_2").hide();
    $("#d2_2").hide();
    $("#m2").hide();
    $("#b2").hide();
  } else if (this.value == "d2") {
    $("#d2").show();
    $("#c2").hide();
    $("#d2_2").show();
    $("#c2_2").hide();
    $("#m2").hide();
    $("#b2").hide();
  } else if (this.value == "m2") {
    $("#d2").hide();
    $("#c2").hide();
    $("#d2_2").hide();
    $("#c2_2").hide();
    $("#m2").show();
    $("#b2").hide();
  } else {
    $("#c2").hide();
    $("#d2").hide();
    $("#c2_2").hide();
    $("#d2_2").hide();
    $("#m2").hide();
    $("#b2").show();
  }
});

$("#c2_in").change(function() {
  parameters[1][1] = this.value;
});
$("#c2_act").change(function() {
  parameters[1][2] = this.value;
});
$("#d2_in").change(function() {
  parameters[1][1] = this.value;
});
$("#d2_act").change(function() {
  parameters[1][2] = this.value;
});
$("#m2_in").change(function() {
  parameters[1][1] = this.value;
  parameters[1][2] = "m";
});
$("#b2_in").change(function() {
  parameters[1][1] = this.value;
  parameters[1][2] = "b";
});
$("#add2").click(function() {
  $("#lay-2").show();
  $("#add2").hide();

  parameters[2][0] = 1;
  no_l = no_l + 1;
});
$("#del2").click(function() {
  no_l = no_l - 1;
  $("#add1").show();
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-1").hide();
  parameters[1][0] = 0;
});

//////////////////////////////////////////////////////

$("#lay_2").change(function() {
  parameters[2] = new Array();
  parameters[2].push(1);

  if (this.value == "c3") {
    $("#c3").show();
    $("#d3").hide();
    $("#c3_2").show();
    $("#d3_2").hide();
    $("#m3").hide();
    $("#b3").hide();
  } else if (this.value == "none1") {
    $("#c3").hide();
    $("#d3").hide();
    $("#c3_2").hide();
    $("#d3_2").hide();
    $("#m3").hide();
    $("#b3").hide();
  } else if (this.value == "d3") {
    $("#d3").show();
    $("#c3").hide();
    $("#d3_2").show();
    $("#c3_2").hide();
    $("#m3").hide();
    $("#b3").hide();
  } else if (this.value == "m3") {
    $("#d3").hide();
    $("#c3").hide();
    $("#d3_2").hide();
    $("#c3_2").hide();
    $("#m3").show();
    $("#b3").hide();
  } else {
    $("#c3").hide();
    $("#d3").hide();
    $("#c3_2").hide();
    $("#d3_2").hide();
    $("#m3").hide();
    $("#b3").show();
  }
});

$("#c3_in").change(function() {
  parameters[2][1] = this.value;
});
$("#c3_act").change(function() {
  parameters[2][2] = this.value;
});
$("#d3_in").change(function() {
  parameters[2][1] = this.value;
});
$("#d3_act").change(function() {
  parameters[2][2] = this.value;
});
$("#m3_in").change(function() {
  parameters[2][1] = this.value;
  parameters[2][2] = "m";
});
$("#b3_in").change(function() {
  parameters[2][1] = this.value;
  parameters[2][2] = "b";
});
$("#add3").click(function() {
  $("#lay-3").show();
  $("#add3").hide();
  parameters[3][0] = 1;
});
$("#del3").click(function() {
  $("#add2").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-2").hide();
  parameters[2][0] = 0;
});

/////////////////////////////////////////////////

$("#lay_3").change(function() {
  parameters[3] = new Array();
  parameters[3].push(1);

  if (this.value == "c4") {
    $("#c4").show();
    $("#d4").hide();
    $("#c4_2").show();
    $("#d4_2").hide();
    $("#m4").hide();
    $("#b4").hide();
  } else if (this.value == "none1") {
    $("#c4").hide();
    $("#d4").hide();
    $("#c4_2").hide();
    $("#d4_2").hide();
    $("#m4").hide();
    $("#b4").hide();
  } else if (this.value == "d4") {
    $("#d4").show();
    $("#c4").hide();
    $("#d4_2").show();
    $("#c4_2").hide();
    $("#m4").hide();
    $("#b4").hide();
  } else if (this.value == "m4") {
    $("#d4").hide();
    $("#c4").hide();
    $("#d4_2").hide();
    $("#c4_2").hide();
    $("#m4").show();
    $("#b4").hide();
  } else {
    $("#c4").hide();
    $("#d4").hide();
    $("#c4_2").hide();
    $("#d4_2").hide();
    $("#m4").hide();
    $("#b4").show();
  }
});

$("#c4_in").change(function() {
  parameters[3][1] = this.value;
});
$("#c4_act").change(function() {
  parameters[3][2] = this.value;
});
$("#d4_in").change(function() {
  parameters[3][1] = this.value;
});
$("#d4_act").change(function() {
  parameters[3][2] = this.value;
});
$("#m4_in").change(function() {
  parameters[3][1] = this.value;
  parameters[3][2] = "m";
});
$("#b4_in").change(function() {
  parameters[3][1] = this.value;
  parameters[3][2] = "b";
});
$("#add4").click(function() {
  $("#lay-4").show();
  $("#add4").hide();
  parameters[4][0] = 1;
});
$("#del4").click(function() {
  $("#add3").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add2").show();
  }
  $("#lay-3").hide();
  parameters[3][0] = 0;
});

//////////////////////////////////////
$("#lay_4").change(function() {
  parameters[4] = new Array();
  parameters[4].push(1);

  if (this.value == "c5") {
    $("#c5").show();
    $("#d5").hide();
    $("#c5_2").show();
    $("#d5_2").hide();
    $("#m5").hide();
    $("#b5").hide();
  } else if (this.value == "none1") {
    $("#c5").hide();
    $("#d5").hide();
    $("#c5_2").hide();
    $("#d5_2").hide();
    $("#m5").hide();
    $("#b5").hide();
  } else if (this.value == "d5") {
    $("#d5").show();
    $("#c5").hide();
    $("#d5_2").show();
    $("#c5_2").hide();
    $("#m5").hide();
    $("#b5").hide();
  } else if (this.value == "m5") {
    $("#d5").hide();
    $("#c5").hide();
    $("#d5_2").hide();
    $("#c5_2").hide();
    $("#m5").show();
    $("#b5").hide();
  } else {
    $("#c5").hide();
    $("#d5").hide();
    $("#c5_2").hide();
    $("#d5_2").hide();
    $("#m5").hide();
    $("#b5").show();
  }
});

$("#c5_in").change(function() {
  parameters[4][1] = this.value;
});
$("#c5_act").change(function() {
  parameters[4][2] = this.value;
});
$("#d5_in").change(function() {
  parameters[4][1] = this.value;
});
$("#d5_act").change(function() {
  parameters[4][2] = this.value;
});
$("#m5_in").change(function() {
  parameters[4][1] = this.value;
  parameters[4][2] = "m";
});
$("#b5_in").change(function() {
  parameters[4][1] = this.value;
  parameters[4][2] = "b";
});
$("#add5").click(function() {
  $("#lay-5").show();
  $("#add5").hide();
  parameters[5][0] = 1;
});
$("#del5").click(function() {
  $("#add4").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-4").hide();
  parameters[4][0] = 0;
});

////////////////////////////////////
$("#lay_5").change(function() {
  parameters[5] = new Array();
  parameters[5].push(1);

  if (this.value == "c6") {
    $("#c6").show();
    $("#d6").hide();
    $("#c6_2").show();
    $("#d6_2").hide();
    $("#m6").hide();
    $("#b6").hide();
  } else if (this.value == "none1") {
    $("#c6").hide();
    $("#d6").hide();
    $("#c6_2").hide();
    $("#d6_2").hide();
    $("#m6").hide();
    $("#b6").hide();
  } else if (this.value == "d6") {
    $("#d6").show();
    $("#c6").hide();
    $("#d6_2").show();
    $("#c6_2").hide();
    $("#m6").hide();
    $("#b6").hide();
  } else if (this.value == "m6") {
    $("#d6").hide();
    $("#c6").hide();
    $("#d6_2").hide();
    $("#c6_2").hide();
    $("#m6").show();
    $("#b6").hide();
  } else {
    $("#c6").hide();
    $("#d6").hide();
    $("#c6_2").hide();
    $("#d6_2").hide();
    $("#m6").hide();
    $("#b6").show();
  }
});

$("#c6_in").change(function() {
  parameters[5][1] = this.value;
});
$("#c6_act").change(function() {
  parameters[5][2] = this.value;
});
$("#d6_in").change(function() {
  parameters[5][1] = this.value;
});
$("#d6_act").change(function() {
  parameters[5][2] = this.value;
});
$("#m6_in").change(function() {
  parameters[5][1] = this.value;
  parameters[5][2] = "m";
});
$("#b6_in").change(function() {
  parameters[5][1] = this.value;
  parameters[5][2] = "b";
});
$("#add6").click(function() {
  $("#lay-6").show();
  $("#add6").hide();
  parameters[6][0] = 1;
});
$("#del6").click(function() {
  $("#add5").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-5").hide();
  parameters[5][0] = 0;
});

/////////////////
$("#lay_6").change(function() {
  parameters[6] = new Array();
  parameters[6].push(1);

  if (this.value == "c7") {
    $("#c7").show();
    $("#d7").hide();
    $("#c7_2").show();
    $("#d7_2").hide();
    $("#m7").hide();
    $("#b7").hide();
  } else if (this.value == "none1") {
    $("#c7").hide();
    $("#d7").hide();
    $("#c7_2").hide();
    $("#d7_2").hide();
    $("#m7").hide();
    $("#b7").hide();
  } else if (this.value == "d7") {
    $("#d7").show();
    $("#c7").hide();
    $("#d7_2").show();
    $("#c7_2").hide();
    $("#m7").hide();
    $("#b7").hide();
  } else if (this.value == "m7") {
    $("#d7").hide();
    $("#c7").hide();
    $("#d7_2").hide();
    $("#c7_2").hide();
    $("#m7").show();
    $("#b7").hide();
  } else {
    $("#c7").hide();
    $("#d7").hide();
    $("#c7_2").hide();
    $("#d7_2").hide();
    $("#m7").hide();
    $("#b7").show();
  }
});

$("#c7_in").change(function() {
  parameters[6][1] = this.value;
});
$("#c7_act").change(function() {
  parameters[6][2] = this.value;
});
$("#d7_in").change(function() {
  parameters[6][1] = this.value;
});
$("#d7_act").change(function() {
  parameters[6][2] = this.value;
});
$("#m7_in").change(function() {
  parameters[6][1] = this.value;
  parameters[6][2] = "m";
});
$("#b7_in").change(function() {
  parameters[6][1] = this.value;
  parameters[6][2] = "b";
});
$("#add7").click(function() {
  $("#lay-7").show();
  $("#add7").hide();
  parameters[7][0] = 1;
});
$("#del7").click(function() {
  $("#add6").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-6").hide();
  parameters[6][0] = 0;
});

/////////////////
$("#lay_7").change(function() {
  parameters[7] = new Array();
  parameters[7].push(1);

  if (this.value == "c8") {
    $("#c8").show();
    $("#d8").hide();
    $("#c8_2").show();
    $("#d8_2").hide();
    $("#m8").hide();
    $("#b8").hide();
  } else if (this.value == "none1") {
    $("#c8").hide();
    $("#d8").hide();
    $("#c8_2").hide();
    $("#d8_2").hide();
    $("#m8").hide();
    $("#b8").hide();
  } else if (this.value == "d8") {
    $("#d8").show();
    $("#c8").hide();
    $("#d8_2").show();
    $("#c8_2").hide();
    $("#m8").hide();
    $("#b8").hide();
  } else if (this.value == "m3") {
    $("#d8").hide();
    $("#c8").hide();
    $("#d8_2").hide();
    $("#c8_2").hide();
    $("#m8").show();
    $("#b8").hide();
  } else {
    $("#c8").hide();
    $("#d8").hide();
    $("#c8_2").hide();
    $("#d8_2").hide();
    $("#m8").hide();
    $("#b8").show();
  }
});

$("#c8_in").change(function() {
  parameters[7][1] = this.value;
});
$("#c8_act").change(function() {
  parameters[7][2] = this.value;
});
$("#d8_in").change(function() {
  parameters[7][1] = this.value;
});
$("#d8_act").change(function() {
  parameters[7][2] = this.value;
});
$("#m8_in").change(function() {
  parameters[7][1] = this.value;
  parameters[7][2] = "m";
});
$("#b8_in").change(function() {
  parameters[7][1] = this.value;
  parameters[7][2] = "b";
});
$("#add8").click(function() {
  $("#lay-8").show();
  $("#add8").hide();
  parameters[8][0] = 1;
});
$("#del8").click(function() {
  $("#add7").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-7").hide();
  parameters[7][0] = 0;
});
////////////////////////////////
$("#lay_8").change(function() {
  parameters[8] = new Array();
  parameters[8].push(1);

  if (this.value == "c9") {
    $("#c9").show();
    $("#d9").hide();
    $("#c9_2").show();
    $("#d9_2").hide();
    $("#m9").hide();
    $("#b9").hide();
  } else if (this.value == "none1") {
    $("#c9").hide();
    $("#d9").hide();
    $("#c9_2").hide();
    $("#d9_2").hide();
    $("#m9").hide();
    $("#b9").hide();
  } else if (this.value == "d9") {
    $("#d9").show();
    $("#c9").hide();
    $("#d9_2").show();
    $("#c9_2").hide();
    $("#m9").hide();
    $("#b9").hide();
  } else if (this.value == "m9") {
    $("#d9").hide();
    $("#c9").hide();
    $("#d9_2").hide();
    $("#c9_2").hide();
    $("#m9").show();
    $("#b9").hide();
  } else {
    $("#c9").hide();
    $("#d9").hide();
    $("#c9_2").hide();
    $("#d9_2").hide();
    $("#m9").hide();
    $("#b9").show();
  }
});

$("#c9_in").change(function() {
  parameters[8][1] = this.value;
});
$("#c9_act").change(function() {
  parameters[8][2] = this.value;
});
$("#d9_in").change(function() {
  parameters[8][1] = this.value;
});
$("#d9_act").change(function() {
  parameters[8][2] = this.value;
});
$("#m9_in").change(function() {
  parameters[8][1] = this.value;
  parameters[8][2] = "m";
});
$("#b9_in").change(function() {
  parameters[8][1] = this.value;
  parameters[8][2] = "b";
});
// $("#add9").click(function() {
//   $("#lay-9").show();
//   $("#add9").hide();
// });
$("#del9").click(function() {
  $("#add8").show();
  no_l = no_l - 1;
  if (no_l == 0) {
    $("#add1").show();
  }
  $("#lay-8").hide();
  parameters[8][0] = 0;
});
