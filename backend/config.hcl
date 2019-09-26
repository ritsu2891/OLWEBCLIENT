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

ars2 {
    exec = "SELECT data FROM ars2"
    transformer = <<JS
        (function() {
            return $result[$result.length-1];
        })()
    JS
}

// S.YAMASHITA Train Wheel Monitoring Demo (YTW)
//Status and Obstacle Item Detection
ytw_status {
    exec = "SELECT * FROM ytw_status"
}

ytw_obrange_reg {
    methods = ["POST"]
    bind {
        status_id = "$input.status_id"
        startdt = "$input.startdt"
        enddt = "$input.enddt"
        startpt = "$input.startpt"
        endpt = "$input.endpt"
    }
    exec = "INSERT INTO ytw_obrange(status_id, startdt, enddt, startpt, endpt) VALUES(:status_id, :startdt, :enddt, :startpt, :endpt)"
}

ytw_obrange {
    exec = "SELECT * FROM ytw_obrange"
}

//K.TSUJI Footsteps sound Security Demo (TFS)
tfs {
    exec = "SELECT * FROM tfs"
}

tfs_new {
    methods = ["POST"]
    bind {
        id = "$input.id"
    }
    exec = "SELECT * FROM tfs WHERE id > :id"
}