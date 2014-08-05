(function (){
function toggleAppearOrDisappear(targetElement) {
    if (targetElement.style.display == 'none') {
        targetElement.style.display = null;
    }
    else {
        targetElement.style.display = 'none';
    }
}

function disappearClasses(class_names) {
    for (var i = 0; i < class_names.length; i++) {
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


document.body.style.backgroundColor='red';

var id_names = [
    'siteHeader',
    'playlist',
    'videoExplorerExpand',
    'playerTabWrapper',
    'bottomContentTabContainer',
    'footer'
];
disappearIds(id_names);

var class_names = [
    'videoHeaderOuter'
];
disappearClasses(class_names);

document.getElementById('content').style.padding = '0px';

document.body.style.backgroundColor='green';

})();
