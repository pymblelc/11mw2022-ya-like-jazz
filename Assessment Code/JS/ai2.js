//declaring variables like buttons and stuff to make it easier later.
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let submitBtn = document.getElementById("submit");
let webcam = new Webcam(myWebcam, "user", myCanvas); 
let txt = document.getElementById("tableText");
let indexPage = document.getElementById("indexPage");
let tablePage = document.getElementById("tablePage");
let randomPage1 = document.getElementById("randomPage");
let randomPage2 = document.getElementById("randomPage2");
let menuBtn = document.getElementById("randomMenuBtn");


//creating functions for starting and stopping the webcam
function webcamStart() {
  webcam
  .start()
  .then((result) => {
    console.log("webcam started!");
  })
  .catch((error) => {
    console.log("error");
  });
}

function webcamStop () {
  webcam
  .stop()
  .then((result) => {
    console.log("webcam stopped :(.")
    myWebcam.style.display = "none";
  })
  .catch((error) => {
    console.log("error")
  });
}

// getting the webcam to snap a cute shot. Smile for the camera :)
takePhotoBtn.addEventListener("click", function () {
  var picture = webcam.snap(); 
  webcam.stop();
  myWebcam.style.display = "none";
});

//<--------------------------------------------------------------------------------------------------------------------> 


//using object recognition to recognise how many people are in the group. using variable peopleNo to randomly select a table from the array based on the amount of people present in the group.
submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      for (let i = 0; i < data.length; i++) {
        const peopleNo = data.length;
        console.log("Number of people present is:  " + peopleNo); 
        const tableNumbers1 = ["4","5","10","13","15","17","21","30"];
        const tableNumbers2 = ["1","2","8","9","22","23","25","26","29"];
        const tableNumbers3 = ["3","6","7","11","12","18"];
        const tableNumbers4 = ["14","16","19","24","27","28"];
        if (peopleNo == false) {
          document.getElementById("errormsg").style.display= "block";
          webcamStart;
          indexPage.style.display = "block";
          tablePage.style.display = "none";
          console.log("retake photo")
        }
        if (peopleNo > 0) { //if no. of people in photo <3 (1,2), than one of table numbers 4,5,10,13,15,17,21,30 will be randomly selected.
          const random = Math.floor(Math.random() * tableNumbers1.length);
          console.log("table no. is " + tableNumbers1[random]);
          txt.innerHTML = tableNumbers1[random];
        };
        if (peopleNo > 2) { //if no of people in photo is >2 (3,4,5,6) than one of table numbers 1,2,8,9,22,23,25,26,29 will be randomly selected.
          const random = Math.floor(Math.random() * tableNumbers2.length);
          console.log("table no. is " + tableNumbers2[random]);
          txt.innerHTML +=  tableNumbers2[random];
        }; 
        if (peopleNo > 6) { //if no. of people in photo is >6 (7,8,9,10) than one of table numbers 3,6,7,11,12,18 will be randomly selected.
          const random = Math.floor(Math.random() * tableNumbers3.length);
          console.log("table no. is " + tableNumbers3[random]);
          txt.innerHTML += tableNumbers3[random];
        };
        if (peopleNo > 10) { //if no. of people in photo is >10 (11,12,13 etc.) than one of table numbers 14,16,19,24,27,28 will be randomly selected.
          const random = Math.floor(Math.random() * tableNumbers4.length);
          console.log("table no. is " + tableNumbers4[random]);
          txt.innerHTML += tableNumbers4[random];
        };


//---------------------------------------------------------------------------------


//using face analysis to create a random menu order for each of them using faceAttributes such as hair, glasses and lipstick for drinks, dinner and dessert respectively.
        //gets the facial attributes and stores them in variables for later use.
        let haircolor = data[i].faceAttributes.hair.hairColor[0].color;
        let glasses = data[i].faceAttributes.glasses;
        let lipstick = data[i].faceAttributes.makeup.lipMakeup;

        function drinksText (number) {
          //calls the array text based on the number given.
          let drinksText = drinks[number].text; 
          //puts all the responses on different lines for formatting purposes.
          let span1 = document.createElement("span");
          let txt1 = document.getElementById("textBox1").appendChild(span1);
          let br1 = document.createElement('br')
          let breaktxt1 = document.getElementById("textBox1").appendChild(br1).style.display="";
          txt1.style.display = "inline";
          txt1.innerHTML += drinksText + breaktxt1;
        } 
        function dinnerText (number) {
          let dinnerText = dinner[number].text; 
          let span2 = document.createElement("span");
          let txt2 = document.getElementById("textBox2").appendChild(span2);
          let br2 = document.createElement('br')
          let breaktxt2 = document.getElementById("textBox2").appendChild(br2).style.display="";
          txt2.style.display = "inline";
          txt2.innerHTML += dinnerText + breaktxt2;
        }
        function dessertText (number) {
          let dessertText = dessert[number].text; 
          let span3 = document.createElement("span");
          let txt3 = document.getElementById("textBox3").appendChild(span3);
          let br3 = document.createElement('br')
          let breaktxt3 = document.getElementById("textBox3").appendChild(br3).style.display="";
          txt3.style.display = "inline";
          txt3.innerHTML += dessertText + breaktxt3;
        }

        if (haircolor == "black") {
          dinnerText(0);
        }
        if (haircolor == "blond") {
          dinnerText(1);
        }
        if (haircolor == "brown") {
          dinnerText(2);
        }
        if (haircolor == "red") {
          dinnerText(3);
        }
        if (haircolor == "unknown") {
          dinnerText(4);
        }
        if (haircolor == "other") {
          dinnerText(4);
        }
        if (haircolor == "white") {
          dinnerText(5);
        }
        if (glasses == "NoGlasses") {
          drinksText(0);
        }
        if (glasses == "ReadingGlasses") {
          drinksText(1);
        }
        if (lipstick == true) {
          dessertText(0);
        }
        if (lipstick == false) {
          dessertText(1);
        }

      }
    })
  })
});


//---------------------------------------------------------------------------------------------------------------------->

//where code gets the assigned menu items from and stuff.
//drink items.
drinks = [
  {
    glasses: "NoGlasses",
    text: "Clear Sky: A Sprite and Blueberry Concoction infused with Vanilla. ",
  },
  {
    glasses: "ReadingGlasses",
    text: "Four Eyed Spider: Vanilla Ice Cream topped with Sprite, Raspberry Flavouring and a splash of Lemon. ",
  },
];

//dinner items.
dinner = [
  {
    hair: "black",
    text: "Black Bun Burger: Wagyu Beef, Tomato, Lettuce, Cheese and our secret Barbeque Sauce topped with a Black Seed Bun. ",
  },
  {
    hair: "blond",
    text: "Yellow Curry: Thai Yellow Chicken Curry served on a bed of Steamed White Rice. ",
  },
  {
    hair: "brown",
    text: "Brown Sugar Garlic Chicken: Chicken Thigh cooked in a garlic soy broth, served with Potato Salad. ",
  },
  {
    hair: "red",
    text: "Crimson Carp: Cripsy Fried Carp cooked with Schichuan Pepper and Tomato. ",
  },
  {
    hair: "unknown&other",
    text:  "Mystery Meal: A Secret and Spectacular Special prepared by our chefs that changes daily. ",
  },
  {
    hair: "white&gray",
    text: "White Angel Soba: White miso soup served with Rice, Tofu, Edamame and Ginger. ",
  },
];

//dessert items.
dessert = [
  {
    lipstick: "true",
    text: "Red Desire: Red Velvet Lava Cake filled with Raspberry Ganache and Chocolate. ",
  },
  {
    lipstick: "false",
    text: "Secret Kiss: Vanilla Meringues served with Chocolate Coated Strawberries. ",
  },
];