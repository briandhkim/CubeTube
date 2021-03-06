<?php
//runs on page load
session_start();
require_once('./script/api_calls_to_db/access_database/mysql_connect.php');
$LOCAL_ACCESS = true;
if(isset($_GET['user'])){//checks if the link is valid
    if(!(preg_match('/^[a-zA-Z0-9]{12}$/', $_GET['user']))){
        header('Location: /');
        exit();
    }
    //prepared statement to search if user is in database
    $sqli = 
        "SELECT
            user_id
        FROM
            users
        WHERE
            user_link = ?";
    $stmt = $conn->prepare($sqli);
    $stmt->bind_param('s',$_GET['user']);
    $stmt->execute();
    $results = $stmt->get_result();
    if($results->num_rows>0){//if link is valid set it to session global
        $_SESSION['user_link'] = $_GET['user'];
        header('Location: /');
    }else{//else return to main page
        header('Location: /');
        exit();
    }
}
?>