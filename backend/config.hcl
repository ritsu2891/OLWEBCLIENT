rawdata {
    exec = "SELECT data FROM rawdata"
    transformer = <<JS
        (function(){
            $new = [];
            for ( i in $result ) {
                $new.push($result[i].data)
            }
            return $new
        })()
    JS
}