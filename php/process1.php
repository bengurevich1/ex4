<?php
$color = $_POST['color'];
$fullname = $_POST['fullname'];
$size = $_POST['size'];

$available_colors = array("red", "black");

if (in_array($color, $available_colors)) {
    $message = "Hello $fullname<br> your shirt with color $color and size $size is available!";
} else {
    $message = "Sorry, the color $color is currently not in stock.";
}

echo "<!DOCTYPE html>
<html>
<head>
    <title>Product Edit Result</title>
</head>
<body>
    <h1>Edit Product Result</h1>
    <p>$message</p>
    <a href='edit.html'>Edit Another Product</a>
</body>
</html>";
?>
