function each(arr, fn) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
        fn(arr[i], i);
    }
}

function indexOf(arr, item) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
        if (arr[i] === item) {
            return i;
        }
    }
    return -1;
}

function addClass(element, newClassName) {
    var list = element.className.split(/\s+/);
    if (indexOf(list, newClassName) === -1) {
        list.push(newClassName);
    }
    element.className = list.join(' ');
}

function removeClass(element, oldClassName) {
    var list = element.className.split(/\s+/);
    var i = indexOf(list, oldClassName);
    if (i !== -1) {
        list.splice(i, 1);
    }
    element.className = list.join(' ');
}

function addEvent(elem, eventType, listener) {
    if(elem.addEventListener) {
        elem.addEventListener(eventType, listener, false);
    } else if(elem.attachEvent) {
        elem.attachEvent('on' + eventType, function(event) {
            event.target = event.srcElement;
            event.preventDefault = function() {
                event.returnValue = false;
            }
            listener.call(elem, event);
        })
    }
}

function delegate(elem, tag, eventType, listener) {
    addEvent(elem, eventType, function (event) {
        if(tag.slice(0, 1) === '.') {
            var className = tag.slice(1);
            var list = event.target.className.split(/\s+/);
            for (var i = 0; i < list.length; i++) {
                if(list[i] === className) {
                    listener(event);
                }
            };
        } else if(tag.slice(0, 1) === '#') {
            if(event.target.getAttribute('id') === tag) {
                listener(event);
            }
        } else if(event.target.nodeName.toLowerCase() === tag) {
            listener(event);
        }
    })
}
function getElementsByClassName(className) {
    var result = [];
    var allElem = document.getElementsByTagName('*');
    each(allElem, function (elem, index) {
        var list = elem.className.split(/\s+/);
        if (indexOf(list, className) !== -1) {
            result.push(elem);
        }
    })
    return result;
}


function show (elem) {
    elem.style.display = 'block';
}

function hide (elem) {
    elem.style.display = 'none';
}


var ul = getElementsByClassName('search-list')[0];
var content0 = getElementsByClassName('search-content0')[0];
var content1 = getElementsByClassName('search-content1')[0];
var content2 = getElementsByClassName('search-content2')[0];

delegate(ul, 'a', 'click', function(event) {
    event.preventDefault();
    var target = event.target;
    removeClass(getElementsByClassName('current-search-nav-link')[0], 'current-search-nav-link');
    addClass(target, 'current-search-nav-link');
    var index = +target.getAttribute('data-index');
    if(index === 0) {
        show(content0);
        hide(content1);
        hide(content2);
    } else if(index === 1) {
        show(content1);
        hide(content0);
        hide(content2);
    } else if(index === 2) {
        show(content2);
        hide(content0);
        hide(content1);
    }
})
