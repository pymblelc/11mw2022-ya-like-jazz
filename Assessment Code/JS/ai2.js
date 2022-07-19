//declaring variables like buttons and stuff to make it easier later.
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let submitBtn = document.getElementById("submit");
let webcam = new Webcam(myWebcam, "user", myCanvas); 

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
  })
  .catch((error) => {
    console.log("error")
  });
}

// getting the webcam to snap a cute shot. Smile for the camera :)
takePhotoBtn.addEventListener("click", function () {
  var picture = webcam.snap(); 
  webcam.stop();
});


//<--------------------------------------------------------------------------------------------------------------------> 


//using object recognition to recognise how many people are in the group and select a table that can fit them all.




//using face analysis to create a random menu order for each of them using faceAttributes such as hair, glasses and lipstick for drinks, dinner and dessert respectively.
submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      for (let i = 0; i < data.length; i++) {
        let peopleNo = data.length
        console.log("haha " + peopleNo);
        let haircolor = data[i].faceAttributes.hair.hairColor[0].color;
        let glasses = data[i].faceAttributes.glasses;
        let lipstick = data[i].faceAttributes.makeup.lipMakeup;

        function drinksText (number) {
          let drinksText = drinks[number].text; 
          let drinksImg = drinks[number].image;
          textBox1.innerHTML += drinksText;
        } 
        function dinnerText (number) {
          let dinnerText = dinner[number].text; 
          let dinnerImg = dinner[number].image;
          textBox2.innerHTML += dinnerText;
        }
        function dessertText (number) {
          let dessertText = dessert[number].text; 
          let dessertImg = dessert[number].image;
          textBox3.innerHTML += dessertText;
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
        if (haircolor == "gray") {
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
    });
  });
});

//if no. of people in photo <=2, then table numbers 4,5,10,13,15,17,21,30 will show up as available. 
//if no of people in photo is 4<=>6 then thable numbers 1,2,8,9,22,23,25,26,29 will show up as available.
//if no. of people in photo is 6<=>10 then table numbers 3,6,7,11,12,18 will show up as available.
//if no. of people in photo is >10 then table numbers 14,16,19,24,27,28 will show up as available.


//where code gets the assigned menu items from.

drinks = [
  {
    glasses: "NoGlasses",
    text: "The Drink is Ricqlès, a French Mint Flavoured Soft Drink. ",
  },
  {
    glasses: "ReadingGlasses",
    text: "The Drink is Vadelma Limonadi, a Finnish Raspberry Soft Drink. ",
  },
];

dinner = [
  {
    hair: "black",
    text: "The dinner course is 1/2 a Cooked Sea Bass, served with Sizzled Ginger, Chilli and Spring Onions.",
  },
  {
    hair: "blond",
    text: "The dinner course is Mediterranean Pasta with a delicious addition of Basil and Potato Salad.",
  },
  {
    hair: "brown",
    text: "The dinner course is Creamy Chicken and Mango Curry, served with fresh steamed rice and vegetables. ",
  },
  {
    hair: "red",
    text: "The dinner course is Miso Chilli Steak, served with Crispy Sweet Potatoes and Broccolini. ",
  },
  {
    hair: "unknown&other",
    text:  "The dinner course is Thai Mackerel and Sweet Potato served on top of a Bed of Rice. ",
  },
  {
    hair: "white&gray",
    text: "The dinner course is Pancetta Wrapped Fish, with Lemony Potato Salad on the side.",
  },
];

dessert = [
  {
    lipstick: "true",
    text: "Dessert is Italian Tiramisu With Ice-Cream and Strawberries. ",
  },
  {
    lipstick: "false",
    text: "Bombe Alaska - Ice Cream inside Meringue. ",
  },
];