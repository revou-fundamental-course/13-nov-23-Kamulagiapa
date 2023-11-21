    // Simple form validation
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.querySelector('form');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = form.querySelector('input[type="text"]').value.trim();
            var email = form.querySelector('input[type="email"]').value.trim();
            var message = form.querySelector('textarea').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('field tidak boleh kosong ');
                return;
            }

            // You can add an AJAX request here to send the form data to the server

            // For now, show a simple confirmation message
            alert('data di kirim suksess!');
            form.reset();
        });
        var hubungiKamiLink = document.querySelector('header nav a[href="#hubungi-kami-section"]');
        hubungiKamiLink.addEventListener('click', function (event) {
            event.preventDefault();

            // Scroll smoothly to the "Hubungi Kami" section
            document.getElementById('hubungi-kami-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
