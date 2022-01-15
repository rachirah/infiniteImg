//helper method for assigning the attributes(object) to the elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// apiurl
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

const YOUR_ACCESS_KEY = "zr0gSKKmFZQ0G406HDw7yKpmHZEBkzFdHKuwBQWNJ_M";
let count = 3;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${YOUR_ACCESS_KEY}&count=${count}`

let total_imgs;
let loaded_imgs=0;
let ready = false;

function imageLoaded(){
    console.log("image loaded");
    loaded_imgs++;
    if(loaded_imgs===total_imgs){
        ready=true;
        loader.hidden = true;
        count = 10;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${YOUR_ACCESS_KEY}&count=${count}`
        console.log('ready');
    }
}

// create elements for links & photos, add to DOM
function displayPhoto(){

    total_imgs = photoArray.length;
    loaded_imgs = 0;
    // run function for each object in photoArray
 photoArray.forEach((photo)=>{
     
     const item = document.createElement('a');
     //item.setAttribute('href',photo.links.html);
     //item.setAttribute('target','_blank');
     setAttributes(item,{href:photo.links.html, target:'_blank'});
     const image = document.createElement('img');
     //image.setAttribute('src',photo.urls.regular);
     //image.setAttribute('alt',photo.current_user_collections.description);
     //image.setAttribute('title',photo.current_user_collections.description);
     setAttributes(image,
        {
            src: photo.urls.regular,
            alt: photo.alt_description
        });
    image.addEventListener('load',imageLoaded);
     
     item.appendChild(image);
     imageContainer.appendChild(item);
 });
}




//GEt photos
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray  = await response.json();
       
        //console.log(photoArray);
        displayPhoto();
    }catch(error){

    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        /*window.console.log(window.innerHeight);
    window.console.log(window.scrollY);
    window.console.log(window.innerHeight + window.scrollY);
    window.console.log(document.body.offsetHeight);
    window.console.log(document.body.offsetHeight - 1000);
    window.console.log("scrolled");*/
        getPhotos();
        ready = false;
        console.log('loaded');
    }
    
});




getPhotos();
