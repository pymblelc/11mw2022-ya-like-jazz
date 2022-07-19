submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      for (let i = 0; i < data.length; i++) {
        let peopleNo = data.length;
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
    })
  })
});
