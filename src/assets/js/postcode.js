// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
// script.onload = () => console.log('daum postcode loaded');

// /**
//  * 스크립트 삽입
//  */
// var before = document.getElementsByTagName('script')[0];
// before.parentNode.insertBefore(script, before);

// /**
//  *
//  * @param {@angular/core/Renderer2} renderer
//  * @param {@angular/core/ElementRef.nativeElement} elem
//  * @param {주소선택완료시 콜백} callback
//  */
// var postcode = function postcode(renderer, elem, callback) {
//     new daum.Postcode({
//         oncomplete: data => {
//             callback(data);
//             elem.style.display = 'none';
//         },
//         submitMode: false,
//         width: '100%',
//         height: '100%',
//         maxSuggestItems: 5
//     }).embed(elem);

//     /**
//      * 창크기 조정, 팝업창 센터로
//      */
//     var width = 320;
//     var height = 480;
//     var borderWidth = 1;

//     renderer.setElementStyle(elem, 'display', 'block');
//     renderer.setElementStyle(elem, 'z-index', '10000');
//     renderer.setElementStyle(elem, 'width', width + 'px');
//     renderer.setElementStyle(elem, 'height', height + 'px');
//     renderer.setElementStyle(elem, 'border', borderWidth + 'px solid');
//     renderer.setElementStyle(elem, 'left', ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth + 'px');
//     renderer.setElementStyle(elem, 'top', ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth + 'px');
// }