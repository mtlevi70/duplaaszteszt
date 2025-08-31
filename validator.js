const lastname = document.getElementById('lastname');
const lastname_error = document.getElementById('lastname_error');
const firstname = document.getElementById('firstname');
const firstname_error = document.getElementById('firstname_error');
const fullname_error = document.getElementById('name_error');
const phone = document.getElementById('phone');
const phone_error = document.getElementById('phone_error');
const email = document.getElementById('email');
const email_error = document.getElementById('email_error');
const desc = document.getElementById('desc');
const desc_error = document.getElementById('desc_error');
const images = document.getElementById('images');
const images_error = document.getElementById('images_error');
const form = document.getElementById('form');
const email_regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const phone_regex = /\p{L}/u;

function showPreviews(files) {
    const output = document.querySelector("#file_list");
    output.innerHTML = "";

    [...files].forEach(file => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                // célméret (pl. max 300px széles legyen)
                const MAX_WIDTH = 80;
                const scale = MAX_WIDTH / img.width;
                const canvas = document.createElement("canvas");
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // tömörített kép (minőség 0.7 → 70%)
                const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.9);

                const div = document.createElement("div");
                div.innerHTML = `<img class="thumbnail" src="${compressedDataUrl}" title="${file.name}"/>`;
                output.appendChild(div);
            };
        };
        reader.readAsDataURL(file);


    });
}

form.addEventListener('submit', (e) => {
    /*VALIDATION*/

    /*név*/
    if (lastname.value == '' || lastname.value == null) {
        lastname_error.innerHTML = 'Nem lehet üres.';
        lastname_error.classList.add('active');
        e.preventDefault();
    }
    else {
        fullname_error.innerHTML = '';
    }
    
    if (firstname.value == '' || firstname.value == null) {
        firstname_error.innerHTML = 'Nem lehet üres.';
        firstname_error.classList.add('active');
        e.preventDefault();
    }
    else {
        fullname_error.innerHTML = '';
    }
    /*telefonszám*/
    if (phone.value == '' || phone.value == null) {
        phone_error.innerHTML = 'Nem lehet üres.';
        phone_error.classList.add('active');
        e.preventDefault();
    }
    else if (phone_regex.test(phone.value)) {
        phone_error.innerHTML = 'Nem lehet benne betű.';
        e.preventDefault();
    }
    else if (phone.value.length < 9) {
        phone_error.innerHTML = 'Minimum 9 karakter.';
        e.preventDefault();
    }
    else {
        phone_error.innerHTML = '';
    }

    /*email*/
    if (email.value == '' || email.value == null) {
        email_error.innerHTML = 'Nem lehet üres.';
        email_error.classList.add('active');
        e.preventDefault();
    }
    else if (!email_regex.test(email.value)) {
        email_error.innerHTML = 'Érvénytelen formátum.';
        e.preventDefault();
    }
    else {
        email_error.innerHTML = '';
    }

    /*leírás*/
    if (desc.value == '' || desc.value == null) {
        desc_error.innerHTML = 'Nem lehet üres.';
        desc_error.classList.add('active');
        e.preventDefault();
    }
    else {
        desc_error.innerHTML = '';
    }
    /*képek*/
    if (images.files.length === 0) {
        images_error.innerHTML = 'Minimum 1 kép feltöltése kötelező.'
        images_error.classList.add('active');
        e.preventDefault();
    }
    else {
        images_error.innerHTML = '';
    }
});

/*írásnál validation reset*/

firstname.addEventListener('input', () => {
    firstname_error.innerHTML = '';
});

lastname.addEventListener('input', () => {
    lastname_error.innerHTML = '';
});

phone.addEventListener('input', () => {
    phone_error.innerHTML = '';
});

email.addEventListener('input', () => {
    email_error.innerHTML = '';
});

desc.addEventListener('input', () => {
    desc_error.innerHTML = '';
});

images.addEventListener('focus', () => {
    images_error.innerHTML = '';
});

/*drag-and-drop*/
const dropzone = document.getElementById('dropzone');


dropzone.addEventListener("click", (e) => {
    images.click();

});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", (e) => {
    dropzone.classList.remove("dragover");
    e.preventDefault();
    images.files = e.dataTransfer.files;  // hozzárendeljük az inputhoz
    showPreviews(images.files);
});



const clear_images = document.getElementById("clear_images");
clear_images.addEventListener("click", (e) => {
    images.value = "";
    e.stopPropagation();
    document.querySelector("#file_list").innerHTML = "";
})

document.querySelector("#images").addEventListener("change", (e) => {
    showPreviews(e.target.files);
});

/* document.querySelector("#images").addEventListener("change", (e) => {
    const files = e.target.files;
    const output = document.querySelector("#file_list")

    for(let i =0;i< files.length;i++){
        if(!files[i].type.match("image")) continue;
        const picReader = new FileReader();
        picReader.addEventListener("load", function(event){
            const picFile = event.target;
            const div = document.createElement("div");
            div.innerHTML = `<img class="thumbnail" src="${picFile.result}" title="${picFile.name}"/>`;
            output.appendChild(div);
        })
        picReader.readAsDataURL(files[i]);
    }
}) */