var NicovideoGazer = function () {
    this.original_body_style = '';
    this.original_padding = {};
    this.original_margin  = {};
    this.original_height  = {};
    this.original_scroll  = {
        x: 0,
        y: 0
    };

    this.id_names = [
        'siteHeader',
        'playlist',
        'videoExplorerExpand',
        'playerTabWrapper',
        'textMarquee',
        'chipWallList',
        'wallImageContainer',
        'bottomContentTabContainer',
        'footer'
    ];
    this.class_names = [
        'videoHeaderOuter'
    ];
    this.blank_names = [
        'content',
        'playerAlignmentArea',
        'playerContainerWrapper'
    ];
    this.adjust_height_ids = [
        'playerContainer'
    ];
};

NicovideoGazer.prototype.removeBlank = function () {
    for (var i = 0; i < this.blank_names.length; i++) {
        var target_name = this.blank_names[i];
        var target_element = document.getElementById(target_name);

        if (target_element) {
            var original_padding = document.defaultView.getComputedStyle(target_element).padding;
            var original_margin  = document.defaultView.getComputedStyle(target_element).margin;

            this.original_padding[target_name] = original_padding;
            this.original_margin[target_name] = original_margin;

            target_element.style.padding = target_element.style.margin = '0px';
        }
    }
};

NicovideoGazer.prototype.padBlank = function () {
    for (var i = 0; i < this.blank_names.length; i++) {
        var target_name = this.blank_names[i];
        var target_element = document.getElementById(target_name);

        if (target_element) {
            var padding;
            var margin;

            if ( this.original_padding[target_name] ) {
                padding = this.original_padding[target_name];
                target_element.style.padding = padding;
                this.original_padding[target_name] = null;
            }

            if ( this.original_margin[target_name] ) {
                margin  = this.original_margin[target_name];
                if (target_name === 'playerAlignmentArea') {
                    margin = '0 auto';
                }

                target_element.style.margin = margin;
                this.original_margin[target_name] = null;
            }
        }
    }
};

NicovideoGazer.prototype.disappearClasses = function () {
    for (var i = 0; i < this.class_names.length; i++) {
        var target_element = document.getElementsByClassName(this.class_names[i])[0];

        if (target_element) {
            target_element.style.display = 'none';
        }
    }
};

NicovideoGazer.prototype.appearClasses = function () {
    for (var i = 0; i < this.class_names.length; i++) {
        var target_element = document.getElementsByClassName(this.class_names[i])[0];

        if (target_element) {
            target_element.style.display = null;
        }
    }
};

NicovideoGazer.prototype.disappearIds = function () {
    for (var i = 0; i < this.id_names.length; i++) {
        var target_element = document.getElementById(this.id_names[i]);

        if (target_element) {
            target_element.style.display = 'none';
        }
    }
};

NicovideoGazer.prototype.appearIds = function () {
    for (var i = 0; i < this.id_names.length; i++) {
        var target_element = document.getElementById(this.id_names[i]);

        if (target_element) {
            target_element.style.display = null;
        }
    }
};

NicovideoGazer.prototype.adjustHeight = function () {
    for (var i = 0; i < this.adjust_height_ids.length; i++) {
        var target_element = document.getElementById(this.adjust_height_ids[i]);

        if (target_element) {
            this.original_height[this.adjust_height_ids[i]] = target_element.style.height;
            target_element.style.height = 'auto';
        }
    }
};

NicovideoGazer.prototype.restoreHeight = function () {
    for (var i = 0; i < this.adjust_height_ids.length; i++) {
        var target_element = document.getElementById(this.adjust_height_ids[i]);

        if (target_element && this.original_height[this.adjust_height_ids[i]]) {
            target_element.style.height = this.original_height[this.adjust_height_ids[i]];
        }
    }
};

NicovideoGazer.prototype.adjustScroll = function () {
    var scroll_x = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var scroll_y = document.documentElement.scrollTop  || document.body.scrollTop || 0;
    this.original_scroll.x = scroll_x;
    this.original_scroll.y = scroll_y;

    window.scrollTo(0, 0);

    this.original_body_style = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
};

NicovideoGazer.prototype.restoreScroll = function () {
    var scroll_x = this.original_scroll.x;
    var scroll_y = this.original_scroll.y;

    window.scrollTo(scroll_x, scroll_y);

    document.body.style.overflow = this.original_body_style || '';
};


NicovideoGazer.prototype.disappear = function () {
    this.removeBlank();
    this.disappearIds();
    this.disappearClasses();
    this.adjustHeight();
    this.adjustScroll();
};

NicovideoGazer.prototype.appear = function () {
    this.restoreScroll();
    this.restoreHeight();
    this.appearClasses();
    this.appearIds();
    this.padBlank();
};

var nicovideoGazer = new NicovideoGazer();
