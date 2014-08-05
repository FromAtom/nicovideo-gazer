(function (){
function disapperClasses(class_names) {
    for (var i = 0; i < class_names.length; i++) {
        var targetElem = document.getElementsByClassName(class_names[i]);
        if (targetElem) {
            targetElem[0].style.display = 'none';
        }
    }
}

function disapperIds(id_names) {
    for (var i = 0; i < id_names.length; i++) {
        var targetElem = document.getElementById(id_names[i]);
        if (targetElem) {
            targetElem.style.display = 'none';
        }
    }
}

document.body.style.backgroundColor='red';

var id_names = [
    'siteHeader',
    'playlist',
    'videoExplorerExpand',
    'bottomContentTabContainer',
    'footer'
];
disapperIds(id_names);

var class_names = [
    'videoHeaderOuter'
];
disapperClasses(class_names);

document.getElementById('content').style.padding = '0px';


document.body.style.backgroundColor='green';

})();
