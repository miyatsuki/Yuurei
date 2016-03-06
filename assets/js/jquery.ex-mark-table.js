//
// jquery.ex-mark-table.js
//
// $Id: mark-table.js 143 2015-05-08 09:31:06Z askn $
//
(function ($) {
    $.fn.markTable = function (config) {
        var defaults = {
            className: 'mark-table'
        }
        var options = $.extend(defaults, config);
        return this.each( function (i) {
            var title = $(this).attr("title");
            var $exported = $("<table/>");
            var $body = $("<tbody/>");
            var table = [], align = [], header = [];
            var imported = $(this).html().split(/([^\n]*\n)/);
            while (imported.length) {
                var line = imported.shift();
                if (line) {
                    if (line.length == 0) continue;
                    var column = line.match(/([^\|]*\|)/g);
                    if (column && column.length > 0) {
                        column.shift();
                        table.push($.map(column, function (val, index) {
                            return val.replace(/\|$/, "");
                        }));
                    }
                }
            }
            if (title != undefined) {
                $("<caption/>").text(title).appendTo($exported);
            }
            if (table.length && table[0].length && !table[0][0].match(/(^\:-|-\:$)/)) {
                header = table.shift();
            }
            if (table.length && table[0].length && table[0][0].match(/(^\:-|-\:$)/)) {
                align = $.map(table.shift(), function (val, index) {
                    if (val.match(/^\:\-*\:$/)) {
                        return "center";
                    }
                    else if (val.match(/^\-*\:$/)) {
                        return "right";
                    }
                    else {
                        return "left";
                    }
                });
            }
            if (header.length) {
                var $head = $("<tr/>");
                $.each(header, function (key, val) {
                    var $column = $("<th/>").html(val);
                    if (align[key]) {
                        $column.addClass(align[key]);
                    }
                    $head.append($column);
                });
                $("<thead/>").append($head).appendTo($exported);
            }
            if (table.length) {
                while (table.length) {
                    var $line = $("<tr/>");
                    $.each(table.shift(), function (key, val) {
                        var $column = $("<td/>").html(val);
                        if (align[key]) {
                            $column.addClass(align[key]);
                        }
                        $line.append($column);
                    });
                    $line.appendTo($body);
                }
                $body.appendTo($exported);
            }
            $(this).replaceWith($("<div/>").addClass(options.className).append($exported));
        });
    };
})(jQuery);
 
// End of Script
