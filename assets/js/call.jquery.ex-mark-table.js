(function pageInit () {
    $('code[class^="language-"]').each(function () {
        var $this = $(this);
        var attr = $this.attr('class').replace(/^language-?/, '');
        var match = attr.match(/title:(.*)/);
        if (match) {
            $this.parent().attr('title', match[1]);
            attr = attr.replace(/title:.*/, '');
        }
        if (attr != null && attr.match(/^table/)) {
            // マークダウンテーブル
            $this.parent().html($this.html()).markTable();
        }
    });
})();
