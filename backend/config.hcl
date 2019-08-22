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

updatedatetime {
    exec = "SELECT name, datetime FROM updatedatetime"
    transformer = <<JS
        (function(){
            $new = {};
            for ( i in $result ) {
                $new[$result[i].name] = $result[i].datetime;
            }
            return $new;
        })()
    JS
}

ars {
    exec = "SELECT data FROM ars"
    transformer = <<JS
        (function() {
            return $result[$result.length-1];
        })()
    JS
}