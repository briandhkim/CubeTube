<?php
//called by access, insert to categories table then insert into categories to channels link
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['category_name'])){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
    output_and_exit($output);
}
$category_name = $_POST['category_name']; 
//check for duplicate entry in categories table
$query =  
    "SELECT
        category_id
    FROM
        categories
    WHERE
        user_id = ? AND category_name = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
}
$stmt->bind_param('is',$user_id,$category_name);
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    $output['errors'][] ='duplicate found';
    output_and_exit($output);
}
//insert category if no duplicate is found
$sqli = 
    "INSERT INTO
        categories
    SET
        category_name = ?,
        user_id = ?";
$stmt = $conn->prepare($sqli);
if(!($stmt->bind_param('si',$category_name,$user_id))){
    $output['errors'][] = 'bind param failed at insert category';
    output_and_exit($output);
};
$stmt->execute();
//if category is inserted, insert the categories to channels link
if($conn->affected_rows>0){
    $output['messages'][] = 'insert category success';
    $category_id = $conn->insert_id;
    include('./categories_to_channels/insert_ctc.php');
}else{
    $output['errors'][] = 'failed to add category';
}
?>