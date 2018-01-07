if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
    document.getElementsByTagName('html')[0].classList.add('no-touch');
}