document.getElementById('contactForm').addEventListener('submit', function (event) {
    // Perform form validation here
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var hobi = document.getElementById('hobi').value;

    if (nama === '' || email === '' || hobi === '') {
        alert('Semua field harus diisi');
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
