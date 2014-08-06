(function (){
function toggleAppearOrDisappear(targetElement) {
    if (targetElement.style.display == 'none') {
        targetElement.style.display = null;
    }
    else {
        targetElement.style.display = 'none';
    }
}


function toggleSetBlankOrNot(target_name) {
    var padding = '0px';
    var margin  = '0px';

    if ( localStorage.getItem(target_name) ) {
        var blank_values = JSON.parse(localStorage.getItem(target_name));

        padding = blank_values['padding'];
        margin  = blank_values['margin'];

        localStorage.removeItem(target_name);
    }
    else {
        var original_padding = document.getElementById(target_name).style.padding;
        var original_margin  = document.getElementById(target_name).style.margin;
        var blank_values = {
            padding: original_padding,
            margin: original_margin
        };
        localStorage.setItem(target_name,  JSON.stringify(blank_values));
    }

    document.getElementById(target_name).style.padding = padding;
    document.getElementById(target_name).style.margin  = margin;
}

function deleteBlank(id_names) {
    for (var i = 0; i < id_names.length; i++) {
        var targetElement = document.getElementById(id_names[i]);
        if(targetElement) {
            toggleSetBlankOrNot(id_names[i]);
        }
    }
}

function disappearClasses(class_names) {
    for (var i = 0; i < id_names.length; i++) {
        var targetElement = document.getElementsByClassName(class_names[i])[0];
        if (targetElement) {
            toggleAppearOrDisappear(targetElement);
        }
    }
}

function disappearIds(id_names) {
    for (var i = 0; i < id_names.length; i++) {
        var targetElement = document.getElementById(id_names[i]);
        if (targetElement) {
            toggleAppearOrDisappear(targetElement);
        }
    }
}

var id_names = [
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
disappearIds(id_names);

var class_names = [
    'videoHeaderOuter'
];
disappearClasses(class_names);

var blank_names = [
    'content',
    'playerAlignmentArea',
    'playerContainerWrapper'
];
deleteBlank(blank_names);

})();
