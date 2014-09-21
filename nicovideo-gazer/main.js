var NicovideoGazer = function () {
    this.original_pagging = {};
    this.original_margin  = {};
    this.original_height  = {};

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
            var original_padding = target_element.style.padding;
            var original_margin  = target_element.style.margin;

            this.original_pagging[target_name] = original_padding;
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
            var padding = '0px';
            var margin  = '0px';

            if ( this.original_pagging[target_name] && this.original_margin[target_name] ) {
                padding = this.original_pagging[target_name];
                margin  = this.original_margin[target_name];
                this.original_pagging[target_name] = this.original_margin[target_name] = null;

                target_element.style.padding = padding;
                target_element.style.margin  = margin;
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

NicovideoGazer.prototype.repositHeight = function () {
    for (var i = 0; i < this.adjust_height_ids.length; i++) {
        var target_element = document.getElementById(this.adjust_height_ids[i]);

        if (target_element && this.original_height[this.adjust_height_ids[i]]) {
            target_element.style.height = this.original_height[this.adjust_height_ids[i]];
        }
    }
};

NicovideoGazer.prototype.disappear = function () {
    this.disappearIds();
    this.disappearClasses();
    this.adjustHeight();
    this.removeBlank();
};

NicovideoGazer.prototype.appear = function () {
    this.appearIds();
    this.appearClasses();
    this.repositHeight();
    this.padBlank();
};

var nicovideoGazer = new NicovideoGazer();
nicovideoGazer.disappear();
