<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$channel_id = $_POST['channel_id'];
$last_channel_pulled = date("Y-m-d H:i:s");
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = "MISSING CHANNEL DESCRIPTION";
}
if(empty($thumbnail)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
if(empty($channel_id)){
    $output['errors'][] = "MISSING ID";
}
$stmt=$conn->prepare("UPDATE channels SET 
channel_title = ?,  
description = ?, 
thumbnail_file_name = ?, 
last_channel_pulled = ?
WHERE channel_id = ?");
$stmt->bind_param("ssssi",$channel_title,$description,$thumbnail,$last_channel_pulled,$channel_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
?>