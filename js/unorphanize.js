/*! jquery-unorphanize - v1.0.1 - 2014-04-18
 * Copyright (c) 2014 Simon Goellner <simey.me@gmail.com>; Licensed  */
! function (a) {
    a.fn.unorphanize = function (b) {
        return "number" != typeof b && (b = 1), a(this).each(function () {
            var c, d, e, f, g, h, i = a(this),
                j = [];
            for (c = i.html(), d = c.match(/<([A-Z][A-Z0-9]*)\b[^>]*>/gi), g = null !== d ? d.length : 0, e = 0; g > e; e++) j.push(d[e]), c = c.replace(d[e], "__" + e + "__");
            for (e = 0; b > e; e++) f = c.lastIndexOf(" "), f > 0 && (c = c.substring(0, f) + "&nbsp;" + c.substring(f + 1));
            for (e = 0; g > e; e++) h = new RegExp("__" + e + "__"), c = c.replace(h, j[e]);
            i.html(c)
        })
    }
}(jQuery);