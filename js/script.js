document.addEventListener('DOMContentLoaded', function() {
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var balloonSizesColors = [
    { size: 'S', color: 'red' },
    { size: 'M', color: 'red' },
    { size: 'L', color: 'red' },
    { size: 'XL', color: 'red' },
    { size: 'S', color: 'blue' },
    { size: 'M', color: 'blue' },
    { size: 'L', color: 'blue' },
    { size: 'XL', color: 'blue' },
    { size: 'S', color: 'green' },
    { size: 'M', color: 'green' },
    { size: 'L', color: 'green' },
    { size: 'XL', color: 'green' },
    { size: 'S', color: 'black' },
    { size: 'M', color: 'black' },
    { size: 'L', color: 'black' },
    { size: 'XL', color: 'black' },
  ];
  var balloonRadius = 20;
var balloonSpeed = 2;
var balloons = [];

var carImage = new Image();
carImage.src = 'car.png';
var carWidth = 80;
var carHeight = 160;
var carX = (canvas.width - carWidth) / 2;
var carY = canvas.height - carHeight;
var carSpeed = 5;
var carMovingLeft = false;
var carMovingRight = false;

// var shirtImageUrls = {
//     'red': {
//         'S': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'M': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'L': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'XL': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg'
//     },
//     'blue': {
//         'S': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'M': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'L': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'XL': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg'
//     },
//     'green': {
//         'S': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'M': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'L': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'XL': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg'
//     },
//     'black': {
//         'S': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'M': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'L': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg',
//         'XL': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg'
//     }
// };

var shirtImageUrls = {
    'red': {
        'S': 'https://thumbs.dreamstime.com/b/happy-family-cute-asian-newborn-baby-wear-red-shirt-lying-crawling-play-white-bed-laughing-smile-happy-face-little-245358655.jpg',
        'M': 'https://media.istockphoto.com/id/166374703/photo/black-little-boy-bright-red-shirt-arms-up.jpg?s=612x612&w=0&k=20&c=gk_nhF9O1wVf8H5Fu4f2wFtMOm7mlanYvaQOQa_FhGY=',
        'L': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23v35WZHmkf1VUuJhjQTtQvDwmppfadUNBQ&usqp=CAU',
        'XL': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsN_2phFXW_1AKMlKljH9Z-YMGx2vWUKBS-w&usqp=CAU'
    },
    'blue': {
        'S': 'https://thumbs.dreamstime.com/b/baby-wearing-blue-crew-neck-shirt-97145451.jpg',
        'M': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnAGadnVkuGPsTEFgmwWZ_HPKknOG8nNYb0A&usqp=CAU',
        'L': 'https://media.gq.com/photos/5d7bae909f076b0008f2c824/master/w_2000,h_1333,c_limit/man.jpg',
        'XL': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROP4DMm7qSywt6pZVb7S3ATHv3umAOMm3BQg&usqp=CAU'
    },
    'green': {
        'S': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEBLSGObHXyo7rKLagNWiTufaNf6_kAGcjg&usqp=CAU',
        'M': 'https://thumbs.dreamstime.com/b/little-boy-green-shirt-portrait-smiling-white-background-39219903.jpg',
        'L': 'https://www.printsome.com/c/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/r/1/r155m-mens-slim-shirts.jpg',
        'XL': 'https://previews.123rf.com/images/oocoskun/oocoskun1504/oocoskun150400290/39343594-portrait-of-overweight-man-wearing-green-shirt-standing-with-hands-in-pockets-and-looking-up.jpg'
    },
    'black': {
        'S': 'https://pivotalprints.co.uk/images/pictures/shop/products/lw20t-larkwood-baby-toddler-t-shirt/lw20t-larkwood-baby-toddler-t-shirt.jpg',
        'M': 'https://www.alton1er.com/wp-content/uploads/2021/03/image00030.jpeg',
        'L': 'https://img.freepik.com/free-photo/portrait-young-handsome-man-grey_144627-64073.jpg',
        'XL': 'https://www.shutterstock.com/image-photo/man-making-gesture-open-hands-260nw-614981966.jpg'
    }
};

function createBalloonCanvas(balloon) {
    const balloonCanvas = document.createElement('canvas');
    balloonCanvas.width = 2 * balloonRadius;
    balloonCanvas.height = 2 * balloonRadius;
    const balloonCtx = balloonCanvas.getContext('2d');

    const shirtImage = shirtImageUrls[balloon.color][balloon.size];
    if (shirtImage instanceof HTMLImageElement) {
        balloonCtx.drawImage(
            shirtImage,
            0,
            0,
            2 * balloonRadius,
            2 * balloonRadius
        );
    }
    

    balloonCtx.fillStyle = 'white';
    balloonCtx.font = 'bold 16px Arial';
    balloonCtx.fillText(balloon.size, balloonRadius - 6, balloonRadius + 6);

    return balloonCanvas;
}

var selectedColor = 'red';


async function preloadShirtImages() {
    for (const color in shirtImageUrls) {
        for (const size in shirtImageUrls[color]) {
            try {
                const img = await loadImage(shirtImageUrls[color][size]);
                shirtImageUrls[color][size] = img;
                console.log(`Image loaded: ${shirtImageUrls[color][size]}`);
            } catch (err) {
                console.error(`Failed to load image: ${shirtImageUrls[color][size]}`);
            }
        }
    }
}


  
function updateShirtImage() {
    var color = selectedColor;
    var size = document.getElementById('size').value;
    var imageUrl = shirtImageUrls[color][size];

    if (imageUrl instanceof HTMLImageElement) {
        document.getElementById('shirtImage').src = imageUrl.src;
    } else {
        document.getElementById('shirtImage').src = imageUrl;
    }

    document.getElementById('shirtImageUrl').value = imageUrl;
}



function drawBalloons() {
    for (var i = 0; i < balloons.length; i++) {
        var balloon = balloons[i];
        ctx.drawImage(
            balloon.canvas,
            balloon.x - balloonRadius,
            balloon.y - balloonRadius
        );
    }
}




  
  
function createBalloon() {
    var x = Math.random() * canvas.width;
    var y = -balloonRadius;
    var sizeColor = balloonSizesColors[Math.floor(Math.random() * balloonSizesColors.length)];
    var balloon = { x: x, y: y, color: sizeColor.color, size: sizeColor.size };
    balloon.canvas = createBalloonCanvas(balloon);
    balloons.push(balloon);
}

  

function moveBalloons() {
    for (var i = 0; i < balloons.length; i++) {
        balloons[i].y += balloonSpeed;
        if (balloons[i].y - balloonRadius > canvas.height) {
            balloons.splice(i, 1);
            i--;
        }
    }
}

function detectCollisions() {
    for (var i = 0; i < balloons.length; i++) {
      var balloon = balloons[i];
      var dx = balloon.x - carX - carWidth / 2;
      var dy = balloon.y - carY - carHeight / 2;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < balloonRadius + carWidth / 2) {
        selectedColor = balloon.color;
        document.getElementById('color').value = selectedColor;
        document.getElementById('size').value = balloon.size;
        updateShirtImage();
        balloons.splice(i, 1);
        i--;
      }
    }
  }
  

function drawCar() {
    ctx.drawImage(carImage, carX, carY, carWidth, carHeight);
}

function moveCar() {
    if (carMovingLeft) {
        carX -= carSpeed;
        if (carX < 0) {
            carX = 0;
        }
    }
    if (carMovingRight) {
        carX += carSpeed;
        if (carX + carWidth > canvas.width) {
            carX = canvas.width - carWidth;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBalloons();
    drawCar();
    moveBalloons();
    detectCollisions();
    moveCar();
    requestAnimationFrame(draw);
}

document.getElementById('startGameBtn').addEventListener('click', function() {
    draw();
    setInterval(createBalloon, 1000);
    this.disabled = true;
});
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log(`Loaded image: ${src}`);
            resolve(img);
        };
        img.onerror = (err) => {
            console.error(`Failed to load image: ${src}`, err);
            reject(err);
        };
    });
}



document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft') {
        carMovingLeft = true;
    }
    if (event.code === 'ArrowRight') {
        carMovingRight = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft') {
        carMovingLeft = false;
    }
    if (event.code === 'ArrowRight') {
        carMovingRight = false;
    }
});



window.addEventListener('load', async function() {
    var initialColor = document.getElementById('color').value;
    selectedColor = initialColor;
    carImage = await loadImage('images/car.png');
    await preloadShirtImages();
    console.log('Shirt images loaded:', shirtImageUrls);
    updateShirtImage(); // Add this line to update the shirt image after preloading
});




document.getElementById('color').addEventListener('change', function() {
    selectedColor = this.value;
    updateShirtImage();
});
document.getElementById('size').addEventListener('change', function() {
    updateShirtImage();
});


});
document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft') {
        carMovingLeft = false;
    }
    if (event.code === 'ArrowRight') {
        carMovingRight = false;
    }
});




