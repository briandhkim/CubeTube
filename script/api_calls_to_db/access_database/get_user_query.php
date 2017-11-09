<?php
session_start();
$LOCAL_ACCESS = true;
if(isset($_GET['user'])){
    require_once('mysql_connect.php');
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
    $stmt->bind_param('s',$_GET['user']);
    $stmt->execute();
    $results = mysqli_stmt_get_result($stmt);
    if($results>0){
        $_SESSION['user_link'][] = $_GET['user'];
        header('Location: thecubetube.collindev.com');
    }else{
        header('Location: thecubetube.collindev.com');
        exit();
    }
}
?>