#!/usr/bin/env tclsh
# Usage: ./remove-jsonld.tcl calculators

if {$argc < 1} {
    puts "Usage: $argv0 <directory>"
    exit 1
}
set dir [lindex $argv 0]

proc processFile {path} {
    set f [open $path r]
    fconfigure $f -encoding utf-8
    set content [read $f]
    close $f

    # Inline flags: (?i) case-insensitive, (?s) dot matches newline
    set pattern {(?is)<script[^>]*type=["']application/ld\+json["'][^>]*>.*?</script>\s*}
    set new $content
    regsub -all $pattern $content {} new

    if { $new ne $content } {
        # backup
        set bak "${path}.bak"
        set b [open $bak w]; fconfigure $b -encoding utf-8; puts -nonewline $b $content; close $b
        # write stripped
        set w [open $path w]; fconfigure $w -encoding utf-8; puts -nonewline $w $new; close $w
        puts "Stripped: $path"
    }
}

proc walk {root} {
    set dirs [list $root]
    while {[llength $dirs] > 0} {
        set d [lindex $dirs 0]
        set dirs [lrange $dirs 1 end]
        foreach f [glob -nocomplain -types f -directory $d *.mdx] {
            processFile $f
        }
        foreach sub [glob -nocomplain -types d -directory $d *] {
            walk $sub
        }
    }
}

walk $dir
puts "Done. Backups saved as .bak files."

