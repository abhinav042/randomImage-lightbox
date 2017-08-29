const ul = document.getElementById("images");
const url = "https://randomuser.me/api/?results=5";
const images = [];
const slides = Array.from(document.querySelectorAll(".mySlides"));
const modal = document.getElementById("customModal");
let modalImg = document.getElementById("imgAdd");
const closeButton = document.querySelector(".close");
let imageList = {};
let imgIdx;
let counter = 0;
function openDialog() {
	// console.log(modal);
	// console.log(img);
	//opening the modal
	modal.style.display = "block";
	// modalImg.src = img.src;
}

closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

function openCarouselSlider(imgNum, prevNext = 0) {
	console.log(parseInt(imgNum) + prevNext);
	imgNum = parseInt(imgNum);
	// console.log(slides);
	if (imgNum + prevNext > slides.length) imgIdx = 1;
	else if (imgNum + prevNext < 1) imgIdx = slides.length;
	else if (imgNum + prevNext <= slides.length && imgNum + prevNext >= 1) imgIdx = imgNum + prevNext;
	slides[imgIdx - 1].style.display = "block";
	console.log(imgIdx);
	console.log(slides[imgIdx - 1]);
	slides.forEach((slide, i) => {
		if (i != imgIdx - 1) slide.style.display = "none";
	});
}

function plusSlides(prevNext) {
	openCarouselSlider(imgIdx, prevNext);
}

function addNewImage(author) {
	counter++;
	const img = document.createElement("img");
	const li = document.createElement("li");
	img.src = author.picture.medium;
	images.push(author.picture.medium);
	img.id = `${counter}`;
	img.className = `addImgSrc`;
	img.addEventListener("click", () => {
		console.log(img.id);
		openDialog();
		openCarouselSlider(img.id);
	});
	li.appendChild(img);
	ul.appendChild(li);
}

function getImages() {
	return fetch(url).then(res => res.json()).then(data => {
		const imageData = data.results;
		return imageData.map(author => {
			//
			addNewImage(author);
		});
	});
}

function getAllTheImages() {
	return Promise.all([getImages()]);
}

getAllTheImages().then(() => {
	imageList = [...document.querySelectorAll(".addImgSrc")];
	// console.log(imageList);
	for (let i = 0; i < imageList.length; i++) {
		console.log(document.getElementById(`image0${i+1}`).src);
		document.getElementById(`image0${i+1}`).src = imageList[i].src;
	}
	// imageList.forEach((image, i) => {
	// 	document.getElementById(`image0${i}`).src = image.src;
	// });
});