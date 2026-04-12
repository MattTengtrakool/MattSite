document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('shared-header');
    if (header) {
        header.innerHTML =
            '<header>' +
                '<div class="header-inner">' +
                    '<a href="/">Matt Tengtrakool</a>' +
                '</div>' +
            '</header>';
    }

    var footer = document.getElementById('shared-footer');
    if (footer) {
        footer.innerHTML = '';
    }
});
