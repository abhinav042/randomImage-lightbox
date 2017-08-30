const ul = document.getElementById("images"); //getting the unordered list
const url = "https://randomuser.me/api/?results=5"; //the API url
const images = [];
const slides = Array.from(document.querySelectorAll(".mySlides")); //images for the carousel 
const modal = document.getElementById("customModal"); //the modal
const closeButton = document.querySelector(".close"); //close button
let imageList = {}; //a nodelist with all the images
let imgIdx;
let counter = 0; //to keep track of the image displayed in the lightbox

//opening the modal
function openDialog() {

	// --- DEBUGGING --- console.log(modal); --- DEBUGGING //

	// --- DEBUGGING --- console.log(img); --- DEBUGGING //
	modal.style.display = "block";
}

//closing the modal
closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

//displaying the required image in the lightbox
function openCarouselSlider(imgNum, prevNext = 0) {

	// --- DEBUGGING --- console.log(parseInt(imgNum) + prevNext); --- DEBUGGING //
	imgNum = parseInt(imgNum);

	// --- DEBUGGING --- console.log(slides); --- DEBUGGING //
	if (imgNum + prevNext > slides.length) imgIdx = 1; //go to the first image from the last one
	else if (imgNum + prevNext < 1) imgIdx = slides.length; //go back to the last img from the first one
	else if (imgNum + prevNext <= slides.length && imgNum + prevNext >= 1) imgIdx = imgNum + prevNext; //go to the next img
	slides[imgIdx - 1].style.display = "block"; //show the image

	// --- DEBUGGING --- console.log(imgIdx); --- DEBUGGING //

	// --- DEBUGGING --- console.log(slides[imgIdx - 1]); --- DEBUGGING //
	//hiding rest of the images
	slides.forEach((slide, i) => {
		if (i != imgIdx - 1) slide.style.display = "none";
	});
}

//to move to the next slide - pass 1
//to move to the prev slide - pass -1
function changeSlides(prevNext) {
	openCarouselSlider(imgIdx, prevNext);
}

//
function addNewImage(author) {
	counter++;
	const img = document.createElement("img");
	const li = document.createElement("li");
	img.src = author.picture.large;
	images.push(author.picture.large);
	img.id = `${counter}`;
	img.className = `addImgSrc`;
	img.addEventListener("click", () => {

		// --- DEBUGGING --- console.log(img.id); --- DEBUGGING //
		openDialog();
		openCarouselSlider(img.id);
	});
	li.appendChild(img);
	ul.appendChild(li);
}

//fetching the images from the API and displaying them on the homepage
function getImages() {
	return fetch(url).then(res => res.json()).then(data => {
		const imageData = data.results;
		return imageData.map(author => {
			//adding properties to the images and appending them on the page
			addNewImage(author);
		});
	});
}

function getAllTheImages() {
	return Promise.all([getImages()]);
}

//doing tasks after all promises have been resolved/rejected
getAllTheImages().then(() => {
	imageList = [...document.querySelectorAll(".addImgSrc")];

	// --- DEBUGGING --- console.log(imageList); --- DEBUGGING //
	for (let i = 0; i < imageList.length; i++) {
		// --- DEBUGGING --- console.log(document.getElementById(`image0${i+1}`).src); --- DEBUGGING //
		document.getElementById(`image0${i+1}`).src = imageList[i].src;
	}
	// imageList.forEach((image, i) => {
	// 	document.getElementById(`image0${i}`).src = image.src;
	// });
});